"use client";
import { useState, useEffect, useRef } from "react";
import { Play, Mic, MicOff } from "lucide-react";

export default function BizGrowAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  // ElevenLabs ke saath synced typing
  const [speechProgress, setSpeechProgress] = useState(null);
  // Browser TTS / muted: poora text animated reveal ke saath
  const [revealState, setRevealState] = useState(null);
  // Mic state: idle | blocked | unavailable  (Zoom jaisa muted feel)
  const [micStatus, setMicStatus] = useState("idle");
  const [micNotice, setMicNotice] = useState(null);
  const recognitionRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const audioRef = useRef(null);
  const audioUrlRef = useRef(null);
  const speechRequestIdRef = useRef(0);
  const ttsAbortControllerRef = useRef(null);
  const latestSpeechRef = useRef(null);
  const welcomeText =
    "Hello and a warm welcome to BizGrow Holdings. I am your dedicated AI compliance assistant. How may I assist you with your compliance queries?";

  // Browser ki mic permission ko live track karo
  useEffect(() => {
    let permissionStatus = null;
    let cancelled = false;

    const sync = () => {
      if (!permissionStatus) return;
      if (permissionStatus.state === "denied") {
        setMicStatus("blocked");
      } else {
        setMicStatus((current) => (current === "blocked" ? "idle" : current));
        setMicNotice((current) =>
          current?.type === "blocked" ? null : current,
        );
      }
    };

    if (navigator.permissions?.query) {
      navigator.permissions
        .query({ name: "microphone" })
        .then((status) => {
          if (cancelled) return;
          permissionStatus = status;
          sync();
          status.onchange = sync;
        })
        .catch(() => {});
    }

    return () => {
      cancelled = true;
      if (permissionStatus) permissionStatus.onchange = null;
    };
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    if (speechProgress?.requestId || distanceFromBottom < 96) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: speechProgress?.requestId ? "auto" : "smooth",
      });
    }
  }, [messages, loading, speechProgress?.visibleLength, micNotice]);
  // Automatically scroll to bottom ONLY when a new user message is added
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === "user") {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [messages]);

  // Markdown symbols hatane ke liye
  const cleanText = (text) => {
    return text
      .replace(/\*\*/g, "") // remove bold markers
      .replace(/\*/g, "")
      .replace(/#/g, "")
      .trim();
  };

  const stopCurrentAudio = () => {
    const audio = audioRef.current;
    audioRef.current = null;
    if (audio) {
      audio.onended = null;
      audio.onerror = null;
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }

    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
  };

  const updateSpeechProgress = (
    requestId,
    messageIndex,
    visibleLength,
    authoritative = false,
  ) => {
    if (messageIndex == null || requestId !== speechRequestIdRef.current)
      return;
    setSpeechProgress((current) => ({
      requestId,
      messageIndex,
      visibleLength: authoritative
        ? Math.max(0, visibleLength)
        : Math.max(
            current?.requestId === requestId ? current.visibleLength : 0,
            visibleLength,
          ),
    }));
  };

  // Browser TTS: sirf awaz chalti hai. Text sync nahi hota,
  // poora text animated reveal ke saath dikhaya jata hai.
  const speakWithGeneratedVoice = async (
    spokenText,
    requestId,
    messageIndex,
    signal,
  ) => {
    if (!spokenText?.trim()) return;

    let audio;
    let audioUrl;
    let reader;
    const releaseAudio = () => {
      if (audioRef.current === audio) {
        audioRef.current = null;
      }

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        if (audioUrlRef.current === audioUrl) {
          audioUrlRef.current = null;
        }
        audioUrl = null;
      }
    };
    const createAudio = (source) => {
      audioUrl = URL.createObjectURL(source);
      audioUrlRef.current = audioUrl;
      audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onplay = () => {
        if (requestId === speechRequestIdRef.current) {
          setIsSpeaking(true);
        }
      };

      audio.onended = () => {
        if (requestId === speechRequestIdRef.current) {
          setIsSpeaking(false);
          setRevealState(null);
        }
        releaseAudio();
      };

      audio.onerror = () => {
        if (requestId === speechRequestIdRef.current) {
          setIsSpeaking(false);
        }
        releaseAudio();
        console.error("Generated voice playback failed");
      };

      return audio;
    };

    if (messageIndex != null) {
      setSpeechProgress(null);
      setRevealState({ messageIndex, id: requestId });
    }

    try {
      const res = await fetch("/api/generate-voice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: spokenText,
        }),
        signal,
      });

      if (!res.ok) {
        let errorMessage = `Voice generation failed with status ${res.status}`;

        try {
          const errorData = await res.json();
          if (errorData?.error) {
            errorMessage = errorData.error;
          }
        } catch {}

        throw new Error(errorMessage);
      }

      if (requestId !== speechRequestIdRef.current || signal.aborted) {
        await res.body?.cancel();
        return;
      }

      if (
        res.body &&
        typeof MediaSource !== "undefined" &&
        MediaSource.isTypeSupported("audio/mpeg")
      ) {
        const mediaSource = new MediaSource();
        const sourceOpen = new Promise((resolve, reject) => {
          mediaSource.addEventListener("sourceopen", resolve, { once: true });
          mediaSource.addEventListener(
            "error",
            () => reject(new Error("Unable to open MP3 stream")),
            { once: true },
          );
        });
        const streamedAudio = createAudio(mediaSource);

        await sourceOpen;
        const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
        reader = res.body.getReader();
        let playbackPromise;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          await new Promise((resolve, reject) => {
            const onError = () => reject(new Error("Unable to decode MP3 stream"));
            sourceBuffer.addEventListener(
              "updateend",
              () => {
                sourceBuffer.removeEventListener("error", onError);
                resolve();
              },
              { once: true },
            );
            sourceBuffer.addEventListener("error", onError, { once: true });
            sourceBuffer.appendBuffer(value);
          });

          if (!playbackPromise) {
            playbackPromise = streamedAudio.play();
            playbackPromise.catch(() => {});
          }
        }

        reader = null;
        if (!playbackPromise) {
          throw new Error("Voice generation returned empty audio");
        }
        if (mediaSource.readyState === "open") {
          mediaSource.endOfStream();
        }
        await playbackPromise;
        return;
      }

      const audioBlob = await res.blob();
      if (!audioBlob.size) {
        throw new Error("Voice generation returned empty audio");
      }

      await createAudio(audioBlob).play();
    } catch (error) {
      await reader?.cancel().catch(() => {});
      if (audio) {
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      }
      releaseAudio();

      if (error?.name === "AbortError") return;

      console.error("Generated voice error:", error);

      if (requestId === speechRequestIdRef.current) {
        setIsSpeaking(false);
      }
    }
  };

  const playElevenLabsResponse = async (
    response,
    signal,
    requestId,
    messageIndex,
    text, // screen par dikhne wala text
    spokenText, // jo ElevenLabs ko bheja gaya (alignment isi ki hai)
  ) => {
    if (
      !response.body ||
      typeof MediaSource === "undefined" ||
      !MediaSource.isTypeSupported("audio/mpeg")
    ) {
      throw new Error(
        "Timestamped MP3 streaming is not supported in this browser",
      );
    }

    const mediaSource = new MediaSource();
    const audioUrl = URL.createObjectURL(mediaSource);
    const audio = new Audio(audioUrl);
    const alignmentEntries = [];
    let characterOffset = 0;
    let previousAlignmentEnd = 0;
    let alignmentChunkCount = 0;
    let playbackEnded = false;
    let reader;

    // spokenText ke character count ko screen text ke count par map karo,
    // aur lafz ke end tak dikhao (beech mein lafz na katay)
    const spokenLength = Math.max(1, spokenText.length);
    const toVisibleLength = (spokenCount) => {
      if (spokenCount >= spokenLength) return text.length;
      let index = Math.round((spokenCount / spokenLength) * text.length);
      const nextBreak = text.slice(index).search(/\s/);
      index = nextBreak === -1 ? text.length : index + nextBreak;
      return Math.min(text.length, index);
    };

    audioRef.current = audio;
    audioUrlRef.current = audioUrl;
    audio.ontimeupdate = () => {
      if (requestId !== speechRequestIdRef.current) return;
      let visibleLength = 0;
      for (const entry of alignmentEntries) {
        if (entry.endTime > audio.currentTime) break;
        visibleLength = entry.visibleLength;
      }
      updateSpeechProgress(
        requestId,
        messageIndex,
        Math.min(text.length, visibleLength),
        true,
      );
    };

    let resolvePlayback;
    let rejectPlayback;
    const playbackFinished = new Promise((resolve, reject) => {
      resolvePlayback = resolve;
      rejectPlayback = reject;
    });
    const sourceOpen = new Promise((resolve, reject) => {
      mediaSource.addEventListener("sourceopen", resolve, { once: true });
      mediaSource.addEventListener(
        "error",
        () => reject(new Error("Unable to open MP3 stream")),
        { once: true },
      );
    });

    audio.onended = () => {
      playbackEnded = true;
      updateSpeechProgress(requestId, messageIndex, text.length, true);
      resolvePlayback();
    };
    audio.onerror = () =>
      rejectPlayback(new Error("Unable to play ElevenLabs audio"));

    const playbackTask = (async () => {
      await sourceOpen;
      const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
      reader = response.body.getReader();
      let pendingText = "";
      let audioStarted = false;
      const decoder = new TextDecoder();

      const extractRecords = (final = false) => {
        const records = [];
        while (true) {
          pendingText = pendingText.trimStart();
          if (pendingText.startsWith("data:"))
            pendingText = pendingText.slice(5).trimStart();
          if (!pendingText) break;
          if (!pendingText.startsWith("{")) {
            throw new Error("Invalid timestamped speech stream format");
          }

          let depth = 0;
          let inString = false;
          let escaped = false;
          let endIndex = -1;
          for (let index = 0; index < pendingText.length; index += 1) {
            const character = pendingText[index];
            if (inString) {
              if (escaped) escaped = false;
              else if (character === "\\") escaped = true;
              else if (character === '"') inString = false;
              continue;
            }
            if (character === '"') inString = true;
            else if (character === "{") depth += 1;
            else if (character === "}") {
              depth -= 1;
              if (depth === 0) {
                endIndex = index;
                break;
              }
            }
          }

          if (endIndex < 0) break;
          records.push(JSON.parse(pendingText.slice(0, endIndex + 1)));
          pendingText = pendingText.slice(endIndex + 1);
        }
        if (final && pendingText.trim())
          throw new Error("Incomplete timestamped speech response");
        return records;
      };

      const appendAudio = (base64Audio) =>
        new Promise((resolve, reject) => {
          const binaryAudio = window.atob(base64Audio);
          const audioChunk = new Uint8Array(binaryAudio.length);
          for (let index = 0; index < binaryAudio.length; index += 1) {
            audioChunk[index] = binaryAudio.charCodeAt(index);
          }

          sourceBuffer.addEventListener("updateend", resolve, { once: true });
          sourceBuffer.addEventListener(
            "error",
            () => reject(new Error("Unable to decode MP3 stream")),
            { once: true },
          );
          sourceBuffer.appendBuffer(audioChunk);
        });

      const processRecord = async (record) => {
        const alignment = record.alignment || record.normalized_alignment;
        if (alignment?.characters?.length) {
          const starts = alignment.character_start_times_seconds || [];
          const ends = alignment.character_end_times_seconds || [];
          const firstStart = starts[0] || 0;
          const timeOffset =
            alignmentChunkCount > 0 && firstStart < previousAlignmentEnd - 0.05
              ? previousAlignmentEnd
              : 0;

          alignment.characters.forEach((character, index) => {
            if (typeof ends[index] !== "number") return;
            alignmentEntries.push({
              endTime: timeOffset + ends[index],
              visibleLength: toVisibleLength(characterOffset + index + 1),
            });
          });
          characterOffset += alignment.characters.length;
          previousAlignmentEnd = Math.max(
            previousAlignmentEnd,
            timeOffset + (ends.at(-1) || 0),
          );
          alignmentChunkCount += 1;
        }

        if (record.audio_base64) {
          if (!alignmentEntries.length)
            throw new Error("Speech timing data was not returned");
          await appendAudio(record.audio_base64);
          if (!audioStarted) {
            audioStarted = true;
            await audio.play();
          }
        }
      };

      const consumeRecords = async (records) => {
        for (const record of records) await processRecord(record);
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          pendingText += decoder.decode();
          await consumeRecords(extractRecords(true));
          break;
        }
        pendingText += decoder.decode(value, { stream: true });
        await consumeRecords(extractRecords());
      }

      if (!audioStarted)
        throw new Error("ElevenLabs returned an empty audio stream");
      if (mediaSource.readyState === "open") mediaSource.endOfStream();
    })();

    let onAbort;
    const cancelled = new Promise((_, reject) => {
      onAbort = () =>
        reject(new DOMException("Speech request cancelled", "AbortError"));
      if (signal.aborted) onAbort();
      else signal.addEventListener("abort", onAbort, { once: true });
    });

    try {
      await Promise.race([playbackTask, cancelled]);
      await playbackFinished;
    } finally {
      signal.removeEventListener("abort", onAbort);
      await reader?.cancel().catch(() => {});
      audio.onended = null;
      audio.onerror = null;
      audio.ontimeupdate = null;
      if (audioRef.current === audio) audioRef.current = null;
      if (!playbackEnded) {
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      }
      URL.revokeObjectURL(audioUrl);
      if (audioUrlRef.current === audioUrl) audioUrlRef.current = null;
      if (requestId === speechRequestIdRef.current) {
        setIsSpeaking(false);
        if (playbackEnded) setSpeechProgress(null);
      }
    }
  };

  const stopCurrentSpeech = () => {
    speechRequestIdRef.current += 1;
    ttsAbortControllerRef.current?.abort();
    ttsAbortControllerRef.current = null;
    const stopCurrentSpeech = () => {
      speechRequestIdRef.current += 1;
      ttsAbortControllerRef.current?.abort();
      ttsAbortControllerRef.current = null;

      stopCurrentAudio();

      setIsSpeaking(false);
      setSpeechProgress(null);
      setRevealState(null);
    };
    stopCurrentAudio();
    setIsSpeaking(false);
    setSpeechProgress(null);
  };

  useEffect(() => {
  return () => {
    recognitionRef.current?.abort?.();
    stopCurrentAudio();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  // text = screen wala text, spokenText = awaz wala text (pronunciation fix ke saath)
  const speakText = async (
    text,
    messageIndex,
    forcePlay = false,
    spokenText = text,
  ) => {
    if (!text?.trim()) return;

    latestSpeechRef.current = {
      text,
      spokenText,
      messageIndex,
    };

    // Mute: awaz nahi, lekin existing animated reveal same rahe
    if (isMuted && !forcePlay) {
      setSpeechProgress(null);

      if (messageIndex != null) {
        setRevealState({
          messageIndex,
          id: `muted-${Date.now()}`,
        });
      }

      return;
    }

    const requestId = ++speechRequestIdRef.current;

    ttsAbortControllerRef.current?.abort();

    const controller = new AbortController();
    ttsAbortControllerRef.current = controller;

    stopCurrentAudio();

    const plainSpoken = cleanText(spokenText || text);

    if (messageIndex != null) {
      setSpeechProgress(null);
      setRevealState({
        messageIndex,
        id: requestId,
      });
    }

    try {
      setIsSpeaking(true);

      await speakWithGeneratedVoice(
        plainSpoken,
        requestId,
        messageIndex,
        controller.signal,
      );
    } catch (err) {
      if (err?.name !== "AbortError") {
        console.error("Voice playback failed:", err);
        setIsSpeaking(false);
      }
    } finally {
      if (ttsAbortControllerRef.current === controller) {
        ttsAbortControllerRef.current = null;
      }
    }
  };

  const handleSendMessage = async (userText) => {
    if (!userText.trim() || loading) return;

    stopCurrentSpeech();
    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/bizgrow-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Sirf role aur content bhejein
        body: JSON.stringify({
          messages: newMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await response.json();
      const botReply =
        data.reply ||
        "Sorry, I couldn't generate an answer just now. Please try again.";
      // Awaz ke liye pronunciation-fixed text (API se aata hai)
      const botSpeech = data.speechText || botReply;
      const assistantMessageIndex = newMessages.length;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: botReply },
      ]);
      speakText(botReply, assistantMessageIndex, false, botSpeech);
    } catch (err) {
      console.error("Chat Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Network connection error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const showMicNotice = (type, text) => {
    setMicNotice({ type, text });
    if (type === "blocked" || type === "unavailable") setMicStatus(type);
  };

  const startListening = async () => {
    // Sunte waqt dobara click: sunna band karo
    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    setMicNotice(null);

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showMicNotice(
        "unsupported",
        "Voice input is not supported in this browser. Please use Chrome or Edge, or type your question.",
      );
      return;
    }

    // HTTPS ke baghair (localhost ke ilawa) browser mic nahi deta
    if (!window.isSecureContext) {
      showMicNotice(
        "blocked",
        "Microphone only works on a secure (HTTPS) connection. Please open the secure version of the site.",
      );
      return;
    }

    // Site ki Permissions-Policy header mic block to nahi kar rahi?
    const policy = document.permissionsPolicy || document.featurePolicy;
    if (policy?.allowsFeature && !policy.allowsFeature("microphone")) {
      showMicNotice(
        "blocked",
        "Microphone is disabled by this website's security settings (Permissions-Policy), so it cannot be turned on from the browser.",
      );
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      showMicNotice(
        "unavailable",
        "No microphone access is available in this browser. Please type your question instead.",
      );
      return;
    }

    // Mic permission maango (popup yahin se khulega)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setMicStatus("idle");
    } catch (err) {
      console.error("Mic permission error:", err.name, err.message);
      if (
        err.name === "NotAllowedError" ||
        err.name === "PermissionDeniedError" ||
        err.name === "SecurityError"
      ) {
        showMicNotice(
          "blocked",
          "Microphone is blocked. Click the lock icon in the address bar, allow the microphone, then tap the mic again.",
        );
      } else if (
        err.name === "NotFoundError" ||
        err.name === "OverconstrainedError"
      ) {
        showMicNotice(
          "unavailable",
          "No microphone was found. Please connect one and tap the mic again.",
        );
      } else if (err.name === "NotReadableError" || err.name === "AbortError") {
        showMicNotice(
          "unavailable",
          "Your microphone is busy or muted. Close other apps using it (such as Zoom or Teams), check it isn't muted in Windows sound settings, then tap the mic again.",
        );
      } else {
        showMicNotice(
          "unavailable",
          "The microphone could not be started. Please try again or type your question.",
        );
      }
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-GB";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      stopCurrentSpeech();
      setIsListening(true);
    };
    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setIsListening(false);
      handleSendMessage(speechText);
    };
    recognition.onerror = (e) => {
      console.error("Mic error:", e.error);
      setIsListening(false);
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        showMicNotice(
          "blocked",
          "Microphone is blocked. Click the lock icon in the address bar, allow the microphone, then tap the mic again.",
        );
      } else if (e.error === "audio-capture") {
        showMicNotice(
          "unavailable",
          "No working microphone was detected. Please check it is connected and not muted.",
        );
      } else if (e.error === "no-speech") {
        showMicNotice(
          "silent",
          "I couldn't hear anything. Please check your microphone isn't muted, then tap the mic and speak again.",
        );
      } else if (e.error === "network") {
        showMicNotice(
          "network",
          "Voice recognition needs an internet connection. Please check your connection and try again.",
        );
      }
      // "aborted" (user ne khud roka) par kuch nahi dikhana
    };
    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    try {
      recognition.start();
    } catch (err) {
      console.error("Recognition start error:", err);
      setIsListening(false);
    }
  };

  // Assistant message ka content: ElevenLabs typing / animated reveal / plain
  const renderMessageContent = (msg, index) => {
    const messageText = cleanText(msg.content);

    if (msg.role !== "assistant") return messageText;

    // 1) ElevenLabs: awaz ke saath synced typing
    if (speechProgress?.messageIndex === index) {
      return (
        <>
          {messageText.slice(0, speechProgress.visibleLength)}
          {speechProgress.visibleLength < messageText.length && (
            <span
              className="ml-0.5 text-cyan-300 animate-pulse"
              aria-hidden="true"
            >
              |
            </span>
          )}
        </>
      );
    }

    // 2) Browser TTS / muted: poora text, word-by-word fade reveal
    if (revealState?.messageIndex === index) {
      const parts = messageText.split(/(\s+)/);
      const wordCount = parts.filter(
        (part) => part && !/^\s+$/.test(part),
      ).length;
      // Total reveal ~1.4 second se zyada nahi lagna chahiye
      const step = Math.min(40, 1400 / Math.max(1, wordCount));
      let wordIndex = 0;

      return (
        <span key={revealState.id}>
          {parts.map((part, partIndex) => {
            if (!part) return null;
            if (/^\s+$/.test(part)) return part;
            const delay = Math.round(wordIndex * step);
            wordIndex += 1;
            return (
              <span
                key={partIndex}
                className="bizgrow-reveal-word"
                style={{ animationDelay: `${delay}ms` }}
              >
                {part}
              </span>
            );
          })}
        </span>
      );
    }

    // 3) Normal
    return messageText;
  };

  const micIsOff = micStatus === "blocked" || micStatus === "unavailable";

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans  ">
      <style jsx global>{`
        .organic-wave {
          animation: organicWave 2.8s ease-in-out infinite;
          transform-origin: center;
        }

        @keyframes organicWave {
          0% {
            transform: scaleY(0.55) translateY(2px);
            opacity: 0.55;
          }
          12% {
            transform: scaleY(1.05) translateY(-1px);
            opacity: 0.9;
          }
          25% {
            transform: scaleY(0.7) translateY(1px);
            opacity: 0.7;
          }
          39% {
            transform: scaleY(1.25) translateY(-2px);
            opacity: 1;
          }
          52% {
            transform: scaleY(0.45) translateY(2px);
            opacity: 0.5;
          }
          66% {
            transform: scaleY(0.9) translateY(-1px);
            opacity: 0.85;
          }
          78% {
            transform: scaleY(1.35) translateY(-2px);
            opacity: 1;
          }
          90% {
            transform: scaleY(0.65) translateY(1px);
            opacity: 0.65;
          }
          100% {
            transform: scaleY(0.55) translateY(2px);
            opacity: 0.55;
          }
        }

        .bizgrow-reveal-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(5px);
          animation: bizgrowWordReveal 0.45s ease-out forwards;
        }

        @keyframes bizgrowWordReveal {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            if (messages.length === 0) {
              setMessages([{ role: "assistant", content: welcomeText }]);
              speakText(welcomeText, 0);
            }
          }}
          className="group fixed bottom-2 left-6 z-50 h-16 w-16 hover:w-[190px] rounded-full bg-slate-950/95 text-white border border-cyan-500/40 hover:border-cyan-400 shadow-[0_10px_35px_rgba(6,182,212,0.28)] backdrop-blur-2xl flex items-center overflow-hidden transition-[width,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer"
          aria-label="Open BizGrow AI Assistant"
        >
          {/* Robot */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            {/* Soft glow */}
            <span className="absolute inset-1 rounded-full bg-cyan-400/20 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full border border-cyan-400/30 animate-pulse" />

            {/* Robot image */}
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-cyan-400/80 bg-slate-900 shadow-[0_0_18px_rgba(34,211,238,0.35)] transition-transform duration-500 ease-out group-hover:scale-105">
              <img
                src="/BizGrow-Ai - Copy.png"
                alt="BizGrow AI Robot"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Hover Content */}
          <div className="flex flex-col text-left whitespace-nowrap opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 ease-out pr-5">
            <span className="text-xs font-semibold tracking-wide text-white flex items-center gap-1.5">
              BizGrow AI
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>

            <span className="text-[10px] text-cyan-400/90 font-medium mt-0.5">
              Compliance Assistant
            </span>
          </div>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-x-4 bottom-6 z-50 flex justify-center md:justify-start">
          <div
            style={{ height: "min(490px, calc(100dvh - 2rem))" }}
            className="w-full max-w-[400px] min-h-0 bg-slate-950/95 text-slate-100 border border-slate-800 rounded-[32px] shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-5 duration-300"
          >
            {/* Header with Glowing Orb */}
            <div className="relative pt-4 pb-3 px-5 flex flex-col items-center bg-gradient-to-b from-slate-900/80 to-transparent border-b border-slate-800/60 shrink-0">
              {/* Top Action Controls Row */}
              <div className="w-full flex items-center justify-between -mb-3">
                <button
                  onClick={() => {
                    setIsMuted(!isMuted);
                    if (!isMuted) stopCurrentSpeech();
                  }}
                  className={`px-2.5 py-1 rounded-full text-[11px] transition cursor-pointer border backdrop-blur-md ${
                    isMuted
                      ? "bg-red-500/10 border-red-500/30 text-red-300"
                      : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {isMuted ? "🔇 Muted" : "🔊 Sound On"}
                </button>

                <div className="flex items-center gap-2">
                  {latestSpeechRef.current && !isSpeaking && isMuted && (
                    <button
                      type="button"
                      onClick={() => {
                        const lastSpeech = latestSpeechRef.current;
                        if (!lastSpeech) return;
                        setIsMuted(false);
                        speakText(
                          lastSpeech.text,
                          lastSpeech.messageIndex,
                          true,
                          lastSpeech.spokenText,
                        );
                      }}
                      className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition cursor-pointer"
                      title="Listen again"
                    >
                      <Play className="w-3 h-3" aria-hidden="true" />
                      Listen again
                    </button>
                  )}

                  <button
                    onClick={() => {
                      stopCurrentSpeech();
                      setIsOpen(false);
                    }}
                    className="text-slate-400 hover:text-white font-bold text-lg px-1.5 leading-none cursor-pointer transition"
                    aria-label="Close"
                  >
                    &times;
                  </button>
                </div>
              </div>
              {/* ================= AI ROBOT + ORGANIC VOICE WAVE ================= */}
              <div className="relative w-14 h-14 flex items-center justify-center my-1">
                {isSpeaking && (
                  <div className="absolute inset-x-[-32px] top-1/2 -translate-y-1/2 h-14 z-0 pointer-events-none">
                    <svg
                      viewBox="0 0 220 56"
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-14 overflow-visible"
                    >
                      {/* Soft Glow */}
                      <path
                        d="
              M0 28
              C10 28 15 20 25 28
              C35 36 42 14 52 25
              C62 36 70 42 80 27
              C90 12 98 20 108 28
              C118 36 125 39 135 25
              C145 11 153 18 162 29
              C171 40 180 31 190 25
              C200 19 207 28 220 28
            "
                        fill="none"
                        stroke="rgba(34,211,238,0.32)"
                        strokeWidth="7"
                        strokeLinecap="round"
                        className="blur-[5px]"
                      />

                      {/* Main Organic Wave */}
                      <path
                        d="
              M0 28
              C10 28 15 20 25 28
              C35 36 42 14 52 25
              C62 36 70 42 80 27
              C90 12 98 20 108 28
              C118 36 125 39 135 25
              C145 11 153 18 162 29
              C171 40 180 31 190 25
              C200 19 207 28 220 28
            "
                        fill="none"
                        stroke="rgb(103,232,249)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="organic-wave"
                      />
                    </svg>
                  </div>
                )}

                {/* ================= ROBOT ================= */}
                <div
                  className={`
        relative z-10
        w-14 h-14
        rounded-full
        overflow-hidden
        border-2
        bg-slate-900
        flex items-center justify-center
        transition-all duration-300
        ${
          isSpeaking
            ? "border-cyan-300 shadow-[0_0_22px_rgba(34,211,238,0.8)]"
            : "border-cyan-400/80 shadow-lg shadow-cyan-500/40"
        }
      `}
                >
                  <img
                    src="/BizGrow-Ai - Copy.png"
                    alt="BizGrow AI Assistant"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h3 className="font-semibold text-xs tracking-wide text-white mt-1">
                BizGrow AI
              </h3>
              <p className="text-[11px] text-cyan-400/90 font-medium tracking-wide">
                {isSpeaking
                  ? "Speaking response..."
                  : isListening
                    ? "Listening to your voice..."
                    : micIsOff
                      ? "Microphone is off"
                      : "How can I help you today?"}
              </p>
            </div>

            {/* Messages Area with Hidden Scrollbar */}
            <div
              ref={messagesContainerRef}
              data-lenis-prevent
              className="min-h-0 flex-1 p-4 overflow-y-auto overscroll-y-contain touch-pan-y space-y-3 bg-transparent text-sm [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3.5 rounded-2xl leading-relaxed max-w-[88%] text-[13px] tracking-wide whitespace-pre-line break-words shadow-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-cyan-600 to-indigo-600 text-white ml-auto rounded-br-xs font-normal shadow-cyan-900/20"
                      : "bg-slate-900/90 border border-slate-800 text-slate-200 mr-auto rounded-bl-xs backdrop-blur-md"
                  }`}
                >
                  {renderMessageContent(msg, index)}
                </div>
              ))}

              {loading && (
                <div className="bg-slate-900/80 border border-slate-800 text-slate-400 p-3.5 rounded-2xl mr-auto max-w-[85%] rounded-bl-xs flex items-center gap-2 backdrop-blur-md">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]"></div>
                  <span className="text-xs text-slate-300 ml-1 font-medium">
                    Analyzing compliance data...
                  </span>
                </div>
              )}

              {micNotice && (
                <div className="flex items-start gap-2.5 text-xs text-red-200 font-medium p-3 bg-red-950/30 border border-red-500/30 rounded-xl">
                  <MicOff
                    className="w-4 h-4 mt-0.5 shrink-0 text-red-300"
                    aria-hidden="true"
                  />
                  <span className="flex-1 leading-relaxed">
                    {micNotice.text}
                  </span>
                  <button
                    type="button"
                    onClick={() => setMicNotice(null)}
                    className="text-red-300 hover:text-white cursor-pointer leading-none text-base"
                    aria-label="Dismiss"
                  >
                    &times;
                  </button>
                </div>
              )}

              {isListening && (
                <div className="flex items-center justify-center gap-2 text-xs text-cyan-300 font-medium py-2 bg-cyan-950/40 border border-cyan-800/50 rounded-xl animate-pulse">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                  Listening... Speak now
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-slate-900/60 border-t border-slate-800/80 flex items-center gap-2.5 backdrop-blur-xl shrink-0">
              <button
                type="button"
                onClick={startListening}
                className={`relative p-3 rounded-2xl transition cursor-pointer border backdrop-blur-md ${
                  isListening
                    ? "bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/30"
                    : micIsOff
                      ? "bg-red-500/10 text-red-400 border-red-500/40 hover:bg-red-500/20"
                      : "bg-slate-800/80 text-red-400 border-slate-700 hover:bg-slate-800"
                }`}
                title={
                  isListening
                    ? "Mute microphone"
                    : micIsOff
                      ? "Microphone is off - tap to try again"
                      : "Unmute microphone (tap to speak)"
                }
                aria-label={
                  isListening ? "Mute microphone" : "Unmute microphone"
                }
                aria-pressed={isListening}
              >
                {isListening && (
                  <span
                    className="absolute inset-0 rounded-2xl border-2 border-emerald-300/60 animate-ping"
                    aria-hidden="true"
                  />
                )}
                {isListening ? (
                  <Mic className="relative w-4 h-4" aria-hidden="true" />
                ) : (
                  <MicOff className="relative w-4 h-4" aria-hidden="true" />
                )}
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
                placeholder="Ask anything..."
                className="flex-1 bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-cyan-500 text-white placeholder-slate-500 font-medium transition shadow-inner"
              />

              <button
                type="button"
                onClick={() => handleSendMessage(input)}
                className="bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white px-4 py-3 rounded-2xl text-xs font-semibold transition shadow-md shadow-indigo-900/30 cursor-pointer"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
