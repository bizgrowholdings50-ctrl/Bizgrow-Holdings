"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { assessmentCategories, getRiskStatus } from "./complianceAssessment";

type Lead = { fullName: string; companyName: string; email: string; phone: string };
type Answers = Record<string, number>;
type CategoryResult = { id: string; name: string; score: number; earned: number; maximum: number };

function ComplianceDonut({ score, colour, size = 208, dark = true }: { score: number; colour: string; size?: number; dark?: boolean }) {
  const data = [{ name: "Score", value: score }, { name: "Remaining", value: 100 - score }];
  const centreTextColour = dark ? "#f2f3f7" : "#0f172a";

  return (
    <div className="relative mx-auto" style={{ height: size, width: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            innerRadius="78%"
            outerRadius="96%"
            paddingAngle={0}
            cornerRadius={8}
            stroke="none"
            isAnimationActive
            animationBegin={150}
            animationDuration={1400}
            animationEasing="ease-out"
          >
            <Cell fill={colour} />
            <Cell fill={dark ? "#334155" : "#e2e8f0"} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div
        className="pointer-events-none absolute inset-[16%] flex flex-col items-center justify-center rounded-full text-center"
        style={{ backgroundColor: dark ? "#12066A" : "#ffffff", color: centreTextColour }}
      >
        <strong className={size > 160 ? "text-5xl" : "text-2xl"}>{score}%</strong>
        {size > 160 && <span className="mt-1 text-sm" style={{ color: centreTextColour }}>Overall score</span>}
      </div>
    </div>
  );
}

const initialLead: Lead = { fullName: "", companyName: "", email: "", phone: "" };

const categoryRecommendations: Record<string, Record<"critical" | "developing" | "ready", string>> = {
  "legal-governance": {
    critical: "Tenders ask, you need answers. List what your clients require, pick one certificate and set your target date.",
    developing: "Nearly there. Finish the roadmap and name an owner and a review date for every policy.",
    ready: "Certified and confident. Keep your roadmap fresh as client and tender requirements change."
  },
  "licensing-vetting": {
    critical: "Vet before the first shift. Use one checklist for every new starter: ID, references and background checks.",
    developing: "Vet before the first shift. Use one checklist for every new starter: ID, references and background checks.",
    ready: "Your people checks are tight. Keep every screening file complete and audit-ready."
  },
  "site-operations": {
    critical: "Assess before you start. Use one risk assessment for every site and keep one log for accidents, incidents and complaints.",
    developing: "Good habits are forming. Standardise your new-site checks and give every fix an owner.",
    ready: "Every site covered. Keep risk assessments, self-checks and incident records current as work changes."
  },
  "quality-cyber": {
    critical: "Could you send it tomorrow? Gather your policies, insurance and compliance records into one folder.",
    developing: "Close the document gaps and build one reliable evidence pack for incidents, insurance and tenders.",
    ready: "Proof on demand. Keep your evidence pack current so policies, insurance and records go out fast."
  }
};

const categoryResultInsight = (category: CategoryResult) => {
  if (category.score < 60) return { level: "critical" as const, label: "Needs attention", classes: "bg-red-50 text-red-700" };
  if (category.score < 85) return { level: "developing" as const, label: "In progress", classes: "bg-yellow-50 text-yellow-700" };
  return { level: "ready" as const, label: "Well covered", classes: "bg-emerald-50 text-emerald-700" };
};

export default function ComplianceScanner() {
  const [step, setStep] = useState(0);
  const [lead, setLead] = useState<Lead>(initialLead);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [resultsSubmitted, setResultsSubmitted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    const heading = document.getElementById("compliance-scanner-heading");
    const page = document.getElementById("compliance-scanner-page");
    const hidePageHeading = step > 0;

    if (heading) heading.classList.toggle("hidden", hidePageHeading);
    if (page) {
      page.classList.toggle("!py-6", hidePageHeading);
      page.classList.toggle("sm:!py-8", hidePageHeading);
    }

    return () => {
      if (heading) heading.classList.remove("hidden");
      if (page) {
        page.classList.remove("!py-6", "sm:!py-8");
      }
    };
  }, [step]);

  useEffect(() => {
    const scrollAssessmentTop = () => {
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    const firstFrame = window.requestAnimationFrame(scrollAssessmentTop);
    const secondFrame = window.requestAnimationFrame(() => window.requestAnimationFrame(scrollAssessmentTop));

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [step]);

  const categoryResults = useMemo<CategoryResult[]>(() => assessmentCategories.map((category) => {
    const earned = category.questions.reduce((sum, question) => sum + (answers[question.id] ?? 0), 0);
    const maximum = category.questions.reduce((sum, question) => sum + Math.max(...question.options.map((option) => option.points)), 0);
    return { id: category.id, name: category.name, earned, maximum, score: maximum ? Math.round((earned / maximum) * 100) : 0 };
  }), [answers]);

  const overall = useMemo(() => {
    const earned = categoryResults.reduce((sum, category) => sum + category.earned, 0);
    const maximum = categoryResults.reduce((sum, category) => sum + category.maximum, 0);
    return maximum ? Math.round((earned / maximum) * 100) : 0;
  }, [categoryResults]);

  const currentCategory = assessmentCategories[step - 1];
  const risk = getRiskStatus(overall);

  const submitLead = (event: FormEvent) => {
    event.preventDefault();
    if (!lead.fullName.trim() || !lead.companyName.trim() || !lead.email.trim()) return;
    setStep(1);
  };

  const selectAnswer = (questionId: string, points: number) => setAnswers((current) => ({ ...current, [questionId]: points }));

  const finishAssessment = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/compliance-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead, answers, totalScore: overall, categoryResults, riskStatus: risk.label })
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "We could not save your assessment.");
      setResultsSubmitted(true);
      setStep(assessmentCategories.length + 1);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not save your assessment.");
    } finally {
      setSubmitting(false);
    }
  };

  const nextQuestion = () => {
    const currentQuestion = currentCategory.questions[questionIndex];
    if (answers[currentQuestion.id] === undefined) return;

    if (questionIndex < currentCategory.questions.length - 1) {
      const scrollPosition = window.scrollY;
      setQuestionIndex((current) => current + 1);
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => window.scrollTo({ top: scrollPosition, behavior: "auto" })));
      return;
    }

    if (step === assessmentCategories.length) {
      finishAssessment();
      return;
    }

    setStep((current) => current + 1);
    setQuestionIndex(0);
  };

  const previousQuestion = () => {
    if (questionIndex > 0) {
      const scrollPosition = window.scrollY;
      setQuestionIndex((current) => current - 1);
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => window.scrollTo({ top: scrollPosition, behavior: "auto" })));
      return;
    }
    if (step > 1) {
      setStep((current) => current - 1);
      setQuestionIndex(assessmentCategories[step - 2].questions.length - 1);
    } else {
      setStep(0);
    }
  };

  const gaugeColour = risk.colour === "green" ? "#16a34a" : risk.colour === "yellow" ? "#eab308" : "#dc2626";
  const emailSubject = encodeURIComponent(`Compliance assessment query — ${lead.companyName || "My organisation"} (${overall || 0}%)`);
  const emailBody = encodeURIComponent(
    `Hello BizGrow Holdings team,\n\nI have completed the compliance assessment.\n\nName: ${lead.fullName}\nCompany: ${lead.companyName}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nOverall score: ${overall}%\nRisk status: ${risk.label}\n\nPlease contact me about improving our compliance position.\n`
  );

  if (step === 0) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#997818]">Compliance Readiness Check</p>
        <h2 className="text-3xl font-bold text-slate-950 sm:text-4xl">Discover the certification route that suits your organisation</h2>
        <p className="mt-3 text-slate-600">Your personalised report takes approximately five minutes.</p>
        <form onSubmit={submitLead} className="mt-8 grid gap-5 sm:grid-cols-2">
          {([
            ["fullName", "Full Name", "text", "e.g. Sarah Ahmed"],
            ["companyName", "Organisation Name", "text", "e.g. ABC Ltd"],
            ["email", "Email", "email", "name@company.co.uk"],
            ["phone", "Phone number", "tel", "+44 ..."]
          ] as const).map(([name, label, type, placeholder]) => (
            <label key={name} className={name === "fullName" || name === "companyName" ? "sm:col-span-1" : "sm:col-span-1"}>
              <span className="mb-2 block text-sm font-semibold text-slate-800">
                {label}
                {name === "phone" ? (
                  <span className="ml-1 font-normal text-slate-500">(Optional)</span>
                ) : (
                  <span className="ml-1 text-red-600" aria-hidden="true">*</span>
                )}
              </span>
              <input required={name !== "phone"} type={type} value={lead[name]} placeholder={placeholder} onChange={(event) => setLead({ ...lead, [name]: event.target.value })} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-950 outline-none transition focus:border-[#997818] focus:ring-4 focus:ring-[#997818]/20" />
            </label>
          ))}
          <button type="submit" className="sm:col-span-2 mt-2 rounded-xl bg-[#12066A] px-6 py-4 font-bold text-white transition hover:bg-[#997818]">Start compliance assessment </button>
        </form>
      </div>
    );
  }

  if (step > assessmentCategories.length) {
    const resultSummary = overall < 60
      ? "We found important gaps in your evidence. The good news? They're fixable, and a clear plan can get you moving today."
      : overall < 85
        ? "You've built a solid base, but some priority gaps remain. Let's close them before an auditor finds them."
        : "Your compliance foundations are strong. A quick evidence check will keep it that way, so there are no surprises on audit day.";
    const resultTitle = overall < 60
      ? "Your documentation needs urgent attention."
      : overall < 85
        ? "A solid base, with priority gaps to close."
        : "Excellent compliance readiness.";
    const resultCta = overall < 60
      ? "Get my action plan"
      : overall < 85
        ? "Improve the gaps"
        : "Keep it that way";
    const supportHeading = overall < 60
      ? "We can help you take control of compliance"
      : overall < 85
        ? "Strengthen your compliance position with expert support"
        : "Maintain your strong compliance position";
    const supportCopy = overall < 60
      ? "BizGrow Holdings can help your team identify priority evidence gaps, put practical controls in place and prepare for the next stage of accreditation."
      : overall < 85
        ? "Our specialists can help close remaining gaps, organise your evidence and build a confident, sustainable approach to audits and tenders."
        : "BizGrow Holdings can help protect your audit readiness through ongoing reviews, document control and planned accreditation support.";

    return (
      <div className="mx-auto max-w-6xl mt-10">
        <section className="relative overflow-hidden rounded-[28px] bg-[#12066a] text-white shadow-[0_24px_70px_rgba(18,6,106,0.22)]">
          <div className="absolute -right-24 -top-32 h-72 w-72 rounded-full border-[48px] border-white/[0.025]" />
          <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[#997818]/10 blur-3xl" />
          <div className="relative border-b border-white/10 px-6 py-5 sm:px-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#d8bd72]">BizGrow Holdings · Compliance report</p>
              <p className="text-xs font-medium text-slate-300">{lead.companyName}</p>
            </div>
          </div>
          <div className="relative grid items-center gap-8 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[240px_1fr] lg:gap-12">
            <div className="rounded-3xl px-5 py-6 ">
              <ComplianceDonut score={overall} colour={gaugeColour} />
            </div>
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] ${
                risk.colour === "green"
                  ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-300"
                  : risk.colour === "yellow"
                    ? "border-yellow-300/30 bg-yellow-400/10 text-yellow-300"
                    : "border-red-300/30 bg-red-400/10 text-red-300"
              }`}>
                <span className={`h-2 w-2 rounded-full ${risk.colour === "green" ? "bg-emerald-300" : risk.colour === "yellow" ? "bg-yellow-300" : "bg-red-300"}`} />
                {risk.label}
              </div>
              <h2 className="mt-5 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">{resultTitle}</h2>
              <p className="mt-3 text-base leading-7 text-slate-300">{resultSummary}</p>
              <p className="mt-4 text-sm text-slate-300">
                Prepared for <strong className="font-semibold text-white">{lead.fullName}</strong> · {lead.companyName}
              </p>
              {resultsSubmitted && <p className="mt-3 text-sm font-medium text-emerald-300">Your detailed report has been sent by email.</p>}
              <a
                href={`mailto:sales@bizgrow-holdings.net?subject=${emailSubject}&body=${emailBody}`}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#997818] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-black/10 transition hover:bg-[#b08a25] focus:outline-none focus:ring-4 focus:ring-[#997818]/30"
              >
                {resultCta}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>
        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categoryResults.map((category) => {
            const insight = categoryResultInsight(category);
            const colour = insight.level === "critical" ? "#dc2626" : insight.level === "developing" ? "#eab308" : "#16a34a";
            return (
              <div key={category.id} className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
                <div className="rounded-xl bg-slate-50 px-2 py-3 [&_svg]:overflow-visible [&_.recharts-wrapper]:!bg-transparent">
                  <ComplianceDonut score={category.score} colour={colour} size={112} dark={false} />
                </div>
                <h3 className="mt-4 min-h-12 font-bold leading-5 text-slate-900">{category.name}</h3>
                <p className="mt-2 text-xs font-medium text-slate-400">{category.earned} of {category.maximum} available points</p>
                <div className={`mt-4 inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${insight.classes}`}>{insight.label}</div>
                <p className="mt-4 text-left text-sm leading-6 text-slate-600">
                  {categoryRecommendations[category.id]?.[insight.level]}
                </p>
              </div>
            );
          })}
        </section>
        <section className="mt-8 overflow-hidden rounded-3xl border border-[#997818]/25 bg-gradient-to-br from-[#12066a] via-[#1b0d7a] to-[#12066a] text-white shadow-[0_20px_50px_rgba(18,6,106,0.14)]">
          <div className="grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d8bd72]">How BizGrow Holdings can help</p>
              <h3 className="mt-3 max-w-3xl text-3xl font-bold leading-tight">{supportHeading}</h3>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{supportCopy}</p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-white">
                {["Accreditation guidance", "Evidence review", "Audit readiness", "Ongoing compliance support"].map((item) => (
                  <span key={item} className="rounded-full border border-white/15 bg-white/[0.07] px-4 py-2">{item}</span>
                ))}
              </div>
            </div>
            <a
              href={`mailto:sales@bizgrow-holdings.net?subject=${emailSubject}&body=${emailBody}`}
              className="inline-flex items-center justify-center rounded-xl bg-[#997818] px-6 py-4 text-center text-sm font-bold text-white shadow-lg transition hover:bg-[#b08a25] focus:outline-none focus:ring-4 focus:ring-[#997818]/30"
            >
             Book Your Free Gap Review Call
            </a>
          </div>
        </section>
        <button
          type="button"
          onClick={() => {
            setStep(0);
            setQuestionIndex(0);
            setAnswers({});
            setLead(initialLead);
            setResultsSubmitted(false);
            window.requestAnimationFrame(() => {
              window.scrollTo({ top: 0, behavior: "auto" });
              document.getElementById("compliance-scanner-page")?.scrollIntoView({ block: "start", behavior: "auto" });
            });
            window.setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 350);
          }}
          className="mx-auto mt-8 block rounded-xl border border-slate-300 bg-white px-6 py-3 font-bold text-slate-900 hover:border-[#997818]"
        >
          Retake Assessment
        </button>
      </div>
    );
  }

  const totalQuestions = assessmentCategories.reduce((total, category) => total + category.questions.length, 0);
  const previousQuestionsCompleted = assessmentCategories
    .slice(0, Math.max(0, step - 1))
    .reduce((total, category) => total + category.questions.length, 0);
  const isLastQuestion = step === assessmentCategories.length && questionIndex === currentCategory.questions.length - 1;
  const isCurrentAnswerSelected = answers[currentCategory.questions[questionIndex]?.id] !== undefined;
  const completedQuestions = previousQuestionsCompleted + questionIndex + (isLastQuestion && isCurrentAnswerSelected ? 1 : 0);
  const assessmentProgress = Math.min(100, Math.round((completedQuestions / totalQuestions) * 100));
  const currentQuestionNumber = previousQuestionsCompleted + questionIndex + 1;

  return (
    <div className="mx-auto max-w-4xl" style={{ overflowAnchor: "none" }}>
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-7">
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#997818]">{currentCategory.name}</p>
        <p className="mt-2 text-slate-600">{currentCategory.description}</p>
        <div className="mt-5 min-h-[340px]">
          {(() => {
            const question = currentCategory.questions[questionIndex];
            return (
              <fieldset>
                <div className="mb-5 flex flex-col-reverse items-start gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <legend className="min-w-0 pr-0 text-lg font-bold leading-7 text-slate-950 sm:pr-4 sm:text-xl"><span className="mr-2 text-[#997818]">{previousQuestionsCompleted + questionIndex + 1}.</span>{question.question}</legend>
                  <div
                    className="relative flex h-14 w-14 shrink-0 items-center justify-center self-end sm:h-16 sm:w-16 sm:self-auto"
                    aria-label={`${completedQuestions} of ${totalQuestions} questions completed`}
                  >
                    <svg className="absolute inset-0 h-full w-full -rotate-90 overflow-visible" viewBox="0 0 64 64" aria-hidden="true">
                      <circle cx="32" cy="32" r="29" fill="none" stroke="#e2e8f0" strokeWidth="6" />
                      <circle
                        cx="32"
                        cy="32"
                        r="29"
                        fill="none"
                        stroke="#997818"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={182.212}
                        strokeDashoffset={182.212 * (1 - assessmentProgress / 100)}
                        style={{ transition: "stroke-dashoffset 700ms cubic-bezier(0.22, 1, 0.36, 1)" }}
                      />
                    </svg>
                    <div className="flex h-[46px] w-[46px] flex-col items-center justify-center rounded-full bg-white sm:h-[52px] sm:w-[52px]">
                      <span className="text-xs font-black text-slate-950">{completedQuestions}/{totalQuestions}</span>
                      <span className="text-[7px] font-bold uppercase tracking-wide text-slate-400">Answered</span>
                    </div>
                  </div>
                </div>
                {question.help && <p className="mt-2 text-sm text-slate-500">{question.help}</p>}
                <div className="mt-5 space-y-3">
                  {question.options.map((option) => (
                    <label
                      key={option.label}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${answers[question.id] === option.points ? "border-[#997818] bg-[#997818]/10 ring-2 ring-[#997818]/20" : "border-slate-200 hover:border-slate-400"}`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        checked={answers[question.id] === option.points}
                        onChange={() => selectAnswer(question.id, option.points)}
                        className="mt-1 h-4 w-4 accent-[#997818]"
                      />
                      <span className="text-sm font-medium leading-6 text-slate-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            );
          })()}
        </div>
        {submitError && <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{submitError}</p>}
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
          <button type="button" onClick={previousQuestion} className="rounded-xl px-5 py-3 font-bold text-slate-600 hover:bg-slate-100">Back</button>
          <button type="button" disabled={answers[currentCategory.questions[questionIndex].id] === undefined || submitting} onClick={nextQuestion} className="rounded-xl bg-slate-950 px-6 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">{submitting ? "Preparing report…" : step === assessmentCategories.length && questionIndex === currentCategory.questions.length - 1 ? "View my results" : "Continue"}</button>
        </div>
      </section>
    </div>
  );
}
