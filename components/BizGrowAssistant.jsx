"use client";
import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

export default function BizGrowAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechProgress, setSpeechProgress] = useState(null);
  const messagesContainerRef = useRef(null);
  const speechVoicesRef = useRef([]);
  const speechProgressTimersRef = useRef({
    timeout: null,
    interval: null,
    raf: null,
  });
  const nativeBoundaryReceivedRef = useRef(false);
  const audioRef = useRef(null);
  const audioUrlRef = useRef(null);
  const speechRequestIdRef = useRef(0);
  const ttsAbortControllerRef = useRef(null);
  const latestSpeechRef = useRef(null);
  const welcomeText =
    "Hello and a warm welcome to BizGrow Holdings. I am your dedicated AI compliance consultant. How may I assist you with our Health & Safety accreditations, ISO standards, or digital solutions today?";

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    const updateVoices = () => {
      speechVoicesRef.current = window.speechSynthesis.getVoices();
    };

    updateVoices();
    window.speechSynthesis.addEventListener("voiceschanged", updateVoices);
    return () =>
      window.speechSynthesis.removeEventListener("voiceschanged", updateVoices);
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
  }, [messages, loading, speechProgress?.visibleLength]);
  // Acronym cleaner for proper pronunciation
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

  const clearSpeechProgressTimers = () => {
    const timers = speechProgressTimersRef.current;
    if (timers.timeout != null) window.clearTimeout(timers.timeout);
    if (timers.interval != null) window.clearInterval(timers.interval);
    if (timers.raf != null) window.cancelAnimationFrame(timers.raf);
    timers.timeout = null;
    timers.interval = null;
    timers.raf = null;
  };

  const speakWithBrowser = (text, requestId, messageIndex) => {
    if (!("speechSynthesis" in window)) {
      if (requestId === speechRequestIdRef.current) {
        setIsSpeaking(false);
        setSpeechProgress(null);
      }
      return;
    }

    const pronunciations = {
      ISO: "I. S. O.",
      CHAS: "Chas",
      SSIP: "S. S. I. P.",
      CDM: "C. D. M.",
    };
    const acronymPattern = /\b(?:ISO|CHAS|SSIP|CDM)\b/gi;
    const sourceEndBySpeechIndex = [];
    let formattedText = "";
    let sourceCursor = 0;

    const appendSourceText = (segment, sourceStart) => {
      for (let index = 0; index < segment.length; index += 1) {
        formattedText += segment[index];
        sourceEndBySpeechIndex.push(sourceStart + index + 1);
      }
    };

    for (const match of text.matchAll(acronymPattern)) {
      appendSourceText(text.slice(sourceCursor, match.index), sourceCursor);
      const spokenAcronym = pronunciations[match[0].toUpperCase()];
      let sourceCharactersSpoken = 0;
      for (const character of spokenAcronym) {
        formattedText += character;
        if (/\p{L}/u.test(character)) sourceCharactersSpoken += 1;
        sourceEndBySpeechIndex.push(
          match.index + Math.min(sourceCharactersSpoken, match[0].length),
        );
      }
      sourceCursor = match.index + match[0].length;
    }
    appendSourceText(text.slice(sourceCursor), sourceCursor);

    const utterance = new SpeechSynthesisUtterance(formattedText);
    utterance.lang = "en-GB";
    utterance.pitch = 1.0;
    utterance.rate = 1.0;

    const voices = speechVoicesRef.current.length
      ? speechVoicesRef.current
      : window.speechSynthesis.getVoices();
    // Local voices ko prefer karein, ye word boundary events deti hain
    const ukVoices = voices.filter((voice) => /^en[-_]gb$/i.test(voice.lang));
    const ukVoice =
      ukVoices.find((voice) => voice.localService) ||
      ukVoices[0] ||
      voices.find((voice) => /british|united kingdom/i.test(voice.name));
    if (ukVoice) utterance.voice = ukVoice;

    const speechTotal = formattedText.length;
    const speechToSource = (i) =>
      i <= 0 ? 0 : sourceEndBySpeechIndex[Math.min(i, speechTotal) - 1] || 0;

    let cps = 14 * utterance.rate; // characters per second (adaptive)
    let anchorChar = 0;
    let anchorTime = 0;
    let wordEnd = null; // boundary aane par current word ka end
    let lastShown = 0;
    let lastBoundary = null;

    const tick = () => {
      const timers = speechProgressTimersRef.current;
      if (requestId !== speechRequestIdRef.current) {
        timers.raf = null;
        return;
      }
      let pos = anchorChar + ((performance.now() - anchorTime) / 1000) * cps;
      if (wordEnd != null) pos = Math.min(pos, wordEnd); // speech se aage na nikle
      const shown = Math.min(speechTotal, Math.floor(pos));
      if (shown > lastShown) {
        lastShown = shown;
        updateSpeechProgress(requestId, messageIndex, speechToSource(shown));
      }
      timers.raf = window.requestAnimationFrame(tick);
    };

    utterance.onstart = () => {
      if (requestId !== speechRequestIdRef.current) return;
      setIsSpeaking(true);
      updateSpeechProgress(requestId, messageIndex, 0);
      clearSpeechProgressTimers();
      anchorChar = 0;
      anchorTime = performance.now();
      speechProgressTimersRef.current.raf = window.requestAnimationFrame(tick);
    };

    utterance.onboundary = (event) => {
      if (requestId !== speechRequestIdRef.current) return;
      if (event.charIndex == null || (event.name && event.name !== "word"))
        return;

      const now = performance.now();

      // Speed ko real speech ke mutabiq adjust karein
      if (lastBoundary && event.charIndex > lastBoundary.char) {
        const measured =
          (event.charIndex - lastBoundary.char) /
          ((now - lastBoundary.time) / 1000);
        if (measured > 5 && measured < 40) cps = cps * 0.6 + measured * 0.4;
      }
      lastBoundary = { char: event.charIndex, time: now };

      // Re-anchor: typing isi word se shuru, aur isi word ke end par ruk jaye
      let end = event.charIndex;
      while (end < speechTotal && !/\s/.test(formattedText[end])) end += 1;
      anchorChar = event.charIndex;
      anchorTime = now;
      wordEnd = Math.min(speechTotal, end + 1);
    };

    const finishSpeech = () => {
      if (requestId === speechRequestIdRef.current) {
        clearSpeechProgressTimers();
        setIsSpeaking(false);
        setSpeechProgress(null); // poora text dikh jayega
      }
    };
    utterance.onend = finishSpeech;
    utterance.onerror = finishSpeech;
    window.speechSynthesis.speak(utterance);
  };

  const playElevenLabsResponse = async (
    response,
    signal,
    requestId,
    messageIndex,
    text,
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
              visibleLength: Math.min(text.length, characterOffset + index + 1),
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
    clearSpeechProgressTimers();
    ttsAbortControllerRef.current?.abort();
    ttsAbortControllerRef.current = null;
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    stopCurrentAudio();
    setIsSpeaking(false);
    setSpeechProgress(null);
  };

  // Unmount par speech aur timers band karein
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      clearSpeechProgressTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const speakText = async (text, messageIndex, forcePlay = false) => {
    if (!text?.trim()) return;

    latestSpeechRef.current = { text, messageIndex };
    if (isMuted && !forcePlay) {
      setSpeechProgress(null);
      return;
    }

    const requestId = ++speechRequestIdRef.current;
    clearSpeechProgressTimers();
    ttsAbortControllerRef.current?.abort();
    const controller = new AbortController();
    ttsAbortControllerRef.current = controller;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    stopCurrentAudio();

    const plainText = cleanText(text);
    if (messageIndex != null) {
      setSpeechProgress({ requestId, messageIndex, visibleLength: 0 });
    }
    let fallbackStarted = false;
    const fallbackToBrowser = (error) => {
      if (
        fallbackStarted ||
        requestId !== speechRequestIdRef.current ||
        controller.signal.aborted
      )
        return;
      fallbackStarted = true;
      if (error)
        console.warn(
          "ElevenLabs playback failed; using browser speech:",
          error,
        );
      stopCurrentAudio();
      speakWithBrowser(plainText, requestId, messageIndex);
    };

    try {
      setIsSpeaking(true);

      const res = await fetch("/api/tts/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: plainText }),
        signal: controller.signal,
      });

      if (requestId !== speechRequestIdRef.current || controller.signal.aborted)
        return;
      if (!res.ok) {
        throw new Error(`TTS request failed with status ${res.status}`);
      }

      await playElevenLabsResponse(
        res,
        controller.signal,
        requestId,
        messageIndex,
        plainText,
      );
    } catch (err) {
      fallbackToBrowser(err);
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
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      const botReply = data.reply || "I am processing your request.";
      const assistantMessageIndex = newMessages.length;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: botReply },
      ]);
      speakText(botReply, assistantMessageIndex);
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

  const startListening = async () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    // Mic permission pehle maang lein (popup yahin se khulega)
    try {
      if (navigator.permissions?.query) {
        const status = await navigator.permissions
          .query({ name: "microphone" })
          .catch(() => null);
        if (status?.state === "denied") {
          alert(
            "Microphone is blocked for this site. Please click the lock icon in the address bar, allow the microphone, then reload the page.",
          );
          return;
        }
      }

      if (navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        stream.getTracks().forEach((track) => track.stop()); // sirf permission chahiye thi
      }
    } catch (err) {
      console.error("Mic permission error:", err);
      alert(
        "Microphone access was not allowed. Please allow it from the address bar and try again.",
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-GB";
    recognition.interimResults = false;

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
    };
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans">
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            if (messages.length === 0) {
              setMessages([{ role: "assistant", content: welcomeText }]);
              speakText(welcomeText, 0);
            }
          }}
          className="fixed bottom-13 left-9 z-50 bg-slate-950/90 hover:bg-slate-900 text-white p-2.5 pr-5 rounded-full shadow-[0_10px_30px_rgba(6,182,212,0.3)] flex items-center gap-3.5 transition-all duration-300 transform hover:scale-105 font-medium cursor-pointer border border-cyan-500/40 hover:border-cyan-400 backdrop-blur-2xl group"
        >
          {/* Avatar Container with Sound Wave / Pulse Effect */}
          <div className="relative w-10 h-10 rounded-full flex items-center justify-center shrink-0">
            {/* Outer Sound Wave Rings */}
            <span className="absolute inset-0 rounded-full bg-cyan-400/30 animate-ping"></span>
            <span className="absolute -inset-1 rounded-full border border-cyan-400/50 animate-pulse"></span>

            {/* Robot Image Frame */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-cyan-400/80 bg-slate-900 shadow-inner">
              <img
                src="/BizGrow-Ai - Copy.png" // Yahan apni robot image ka public path dein
                alt="BizGrow AI Robot"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Button Label */}
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold tracking-wide text-white flex items-center gap-1.5">
              BizGrow AI{" "}
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </span>
            <span className="text-[10px] text-cyan-400/90 font-medium">
              Compliance Assistant
            </span>
          </div>
        </button>
      )}

      {isOpen && (
        <div
          style={{ height: "min(490px, calc(100dvh - 2rem))" }}
          className="w-[370px] sm:w-[420px] min-h-0 bg-slate-950/95 text-slate-100 border border-slate-800 rounded-[32px] shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header with Glowing Orb */}
          <div className="relative pt-4 pb-3 px-5 flex flex-col items-center bg-gradient-to-b from-slate-900/80 to-transparent border-b border-slate-800/60 shrink-0">
            {/* Top Action Controls Row */}
            <div className="w-full flex items-center justify-between mb-2">
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
                      speakText(lastSpeech.text, lastSpeech.messageIndex, true);
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

              {/* ================= ORGANIC WAVE ANIMATION ================= */}
              <style jsx>{`
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
              `}</style>
            </div>

            <h3 className="font-semibold text-xs tracking-wide text-white mt-1">
              BizGrow AI
            </h3>
            <p className="text-[11px] text-cyan-400/90 font-medium tracking-wide">
              {isSpeaking
                ? "Speaking response..."
                : isListening
                  ? "Listening to your voice..."
                  : "How can I help you today?"}
            </p>
          </div>

          {/* Messages Area */}
          <div
            ref={messagesContainerRef}
            data-lenis-prevent
            className="min-h-0 flex-1 p-4 overflow-y-auto overscroll-y-contain touch-pan-y space-y-3 bg-transparent text-sm"
          >
            {messages.map((msg, index) => {
              const messageText = cleanText(msg.content);
              const isProgressive = speechProgress?.messageIndex === index;

              return (
                <div
                  key={index}
                  className={`p-3.5 rounded-2xl leading-relaxed max-w-[88%] text-[13px] tracking-wide whitespace-pre-line break-words shadow-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-cyan-600 to-indigo-600 text-white ml-auto rounded-br-xs font-normal shadow-cyan-900/20"
                      : "bg-slate-900/90 border border-slate-800 text-slate-200 mr-auto rounded-bl-xs backdrop-blur-md"
                  }`}
                >
                  {isProgressive
                    ? messageText.slice(0, speechProgress.visibleLength)
                    : messageText}
                  {isProgressive &&
                    speechProgress.visibleLength < messageText.length && (
                      <span
                        className="ml-0.5 text-cyan-300 animate-pulse"
                        aria-hidden="true"
                      >
                        |
                      </span>
                    )}
                </div>
              );
            })}

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

            {isListening && (
              <div className="flex items-center justify-center gap-2 text-xs text-cyan-300 font-medium py-2 bg-cyan-950/40 border border-cyan-800/50 rounded-xl animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                Voice input active... Speak now 🎙️
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-900/60 border-t border-slate-800/80 flex items-center gap-2.5 backdrop-blur-xl shrink-0">
            <button
              type="button"
              onClick={startListening}
              className={`p-3 rounded-2xl transition cursor-pointer border backdrop-blur-md ${
                isListening
                  ? "bg-red-500 text-white border-red-600 animate-pulse shadow-lg shadow-red-500/20"
                  : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-cyan-400"
              }`}
              title="Voice Input"
            >
              🎙️
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
      )}
    </div>
  );
}
