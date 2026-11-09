"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type BookingLead = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
};

type AssessmentAnswers = Record<string, number>;

type Slot = {
  time: string;
  available: boolean;
  reason?: "booked" | "past" | "weekend";
};

type GapReviewBookingProps = {
  open: boolean;
  onClose: () => void;
  lead: BookingLead;
  assessmentScore: number;
  riskStatus: string;
  answers: AssessmentAnswers;
};

const getUkToday = () => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
};

const getNextWeekday = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  const nextDate = new Date(Date.UTC(year, month - 1, day));
  while (nextDate.getUTCDay() === 0 || nextDate.getUTCDay() === 6) {
    nextDate.setUTCDate(nextDate.getUTCDate() + 1);
  }
  return `${nextDate.getUTCFullYear()}-${String(nextDate.getUTCMonth() + 1).padStart(2, "0")}-${String(nextDate.getUTCDate()).padStart(2, "0")}`;
};

const formatCalendarMonth = (month: string) =>
  new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${month}-01T12:00:00Z`));

const formatBookingDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeZone: "Europe/London",
  }).format(new Date(`${date}T12:00:00Z`));

export default function GapReviewBooking({
  open,
  onClose,
  lead,
  assessmentScore,
  riskStatus,
  answers,
}: GapReviewBookingProps) {
  const [date, setDate] = useState("");
  const [visibleMonth, setVisibleMonth] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState("");
  const [conflictMessage, setConflictMessage] = useState("");
  const [confirmation, setConfirmation] = useState<{ date: string; time: string; emailSent: boolean } | null>(null);
  const dialogRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const firstAvailableWeekday = getNextWeekday(getUkToday());
    setDate(firstAvailableWeekday);
    setVisibleMonth(firstAvailableWeekday.slice(0, 7));
    setStep(1);
    setSelectedTime("");
    setSlots([]);
    setError("");
    setConflictMessage("");
    setConfirmation(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    const previousOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previousDocumentOverflow;
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !date || step !== 2) return;

    const controller = new AbortController();
    const loadSlots = async () => {
      setLoadingSlots(true);
      setSelectedTime("");
      setError("");
      try {
        const response = await fetch(`/api/compliance-gap-review?date=${encodeURIComponent(date)}`, {
          signal: controller.signal,
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "We couldn't check availability.");
        setSlots(data.slots);
      } catch (availabilityError) {
        if (controller.signal.aborted) return;
        setSlots([]);
        setError(availabilityError instanceof Error ? availabilityError.message : "We couldn't check availability.");
      } finally {
        if (!controller.signal.aborted) setLoadingSlots(false);
      }
    };

    void loadSlots();
    return () => controller.abort();
  }, [open, date, refreshKey, step]);

  useEffect(() => {
    if (!open) return;
    const dateInput = dialogRef.current?.querySelector<HTMLElement>('input[type="date"]');
    (dateInput ?? dialogRef.current?.querySelector<HTMLElement>("button"))?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !submitting) {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>("button:not(:disabled), input:not(:disabled)"),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, submitting]);

  const submitBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedTime) return;

    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/compliance-gap-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          time: selectedTime,
          lead,
          assessmentScore,
          riskStatus,
          answers,
        }),
      });
      const data = await response.json();

      if (response.status === 409) {
        setSelectedTime("");
        setRefreshKey((current) => current + 1);
        setConflictMessage(data.message || "That time was just booked. Please choose another available slot.");
        return;
      }
      if (!response.ok || !data.success) {
        throw new Error(data.message || "We couldn't book your review. Please try again.");
      }

      setConfirmation({ date, time: selectedTime, emailSent: data.emailSent });
    } catch (bookingError) {
      setError(bookingError instanceof Error ? bookingError.message : "We couldn't book your review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const [calendarYear, calendarMonthNumber] = visibleMonth.split("-").map(Number);
  const firstDayOffset = visibleMonth
    ? (new Date(Date.UTC(calendarYear, calendarMonthNumber - 1, 1)).getUTCDay() + 6) % 7
    : 0;
  const daysInMonth = visibleMonth
    ? new Date(Date.UTC(calendarYear, calendarMonthNumber, 0)).getUTCDate()
    : 0;
  const calendarCells = Array.from({ length: firstDayOffset + daysInMonth }, (_, index) => {
    if (index < firstDayOffset) return null;
    const day = index - firstDayOffset + 1;
    return `${visibleMonth}-${String(day).padStart(2, "0")}`;
  });
  const currentMonth = getUkToday().slice(0, 7);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-slate-950/65 p-3 backdrop-blur-sm sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !submitting) onClose();
      }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gap-review-title"
        className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl sm:max-h-[calc(100dvh-2rem)]"
      >
        <div className="shrink-0 bg-[#12066a] px-6 py-5 text-white sm:px-8 sm:py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d8bd72]">Complimentary consultation</p>
              <h2 id="gap-review-title" className="mt-2 text-2xl font-bold sm:text-3xl">
                Book your free gap review
              </h2>
              <p className="mt-2 text-sm text-slate-300">Choose a convenient date and time for a 30-minute call.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              aria-label="Close booking"
              className="rounded-full px-3 py-1 text-2xl leading-none text-white/80 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
            >
              ×
            </button>
          </div>
        </div>

        <div className="overflow-hidden p-4 sm:p-6">
          {confirmation ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center" role="status">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-700" aria-hidden="true">✓</div>
              <h3 className="mt-4 text-xl font-bold text-slate-950">Your review is booked</h3>
              <p className="mt-2 text-slate-700">
                {formatBookingDate(confirmation.date)} at {confirmation.time} UK time
              </p>
              <p className="mt-2 text-sm text-slate-600">
                {confirmation.emailSent
                  ? `A confirmation has been sent to ${lead.email}.`
                  : "Your booking is confirmed, but an email could not be delivered. Please contact sales@bizgrow-holdings.net if you need assistance."}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-xl bg-[#12066a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#25168a]"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={submitBooking}>
              <div className="mb-3 flex items-center gap-3" aria-label={`Step ${step} of 2`}>
                {[1, 2].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center gap-2">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                      step === stepNumber ? "bg-[#997818] text-white" : step > stepNumber ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                    }`}>
                      {step > stepNumber ? "✓" : stepNumber}
                    </span>
                    <span className={`text-xs font-semibold ${step === stepNumber ? "text-slate-900" : "text-slate-500"}`}>
                      {stepNumber === 1 ? "Choose date" : "Choose time"}
                    </span>
                    {stepNumber === 1 && <span className="mx-1 h-px w-8 bg-slate-200 sm:w-12" />}
                  </div>
                ))}
              </div>

              {step === 1 && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">Select a date</h3>
                    <p className="mt-1 text-xs font-medium text-slate-500">Choose a weekday to see available times.</p>
                  </div>
                  <p className="text-sm font-semibold text-[#12066a]" aria-live="polite">
                    {date ? formatBookingDate(date) : ""}
                  </p>
                </div>
                <div className="mt-3 rounded-2xl border border-slate-200 p-3 sm:p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <button
                      type="button"
                      aria-label="Previous month"
                      disabled={visibleMonth <= currentMonth}
                      onClick={() => {
                        const previousMonth = new Date(Date.UTC(calendarYear, calendarMonthNumber - 2, 1));
                        setVisibleMonth(`${previousMonth.getUTCFullYear()}-${String(previousMonth.getUTCMonth() + 1).padStart(2, "0")}`);
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent"
                    >
                      <span aria-hidden="true">‹</span>
                    </button>
                    <h4 className="font-bold text-slate-900">{visibleMonth && formatCalendarMonth(visibleMonth)}</h4>
                    <button
                      type="button"
                      aria-label="Next month"
                      onClick={() => {
                        const nextMonth = new Date(Date.UTC(calendarYear, calendarMonthNumber, 1));
                        setVisibleMonth(`${nextMonth.getUTCFullYear()}-${String(nextMonth.getUTCMonth() + 1).padStart(2, "0")}`);
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      <span aria-hidden="true">›</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-500" aria-hidden="true">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((weekday) => (
                      <span key={weekday} className="py-1">{weekday}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 text-center">
                    {calendarCells.map((calendarDate, index) => {
                      if (!calendarDate) return <span key={`empty-${index}`} />;
                      const day = Number(calendarDate.slice(-2));
                      const weekday = new Date(`${calendarDate}T12:00:00Z`).getUTCDay();
                      const isWeekend = weekday === 0 || weekday === 6;
                      const isPast = calendarDate < getUkToday();
                      const isUnavailable = isWeekend || isPast;
                      const isSelected = calendarDate === date;
                      const dateLabel = formatBookingDate(calendarDate);

                      return (
                        <button
                          key={calendarDate}
                          type="button"
                          disabled={isUnavailable || submitting}
                          aria-label={`${dateLabel}${isWeekend ? ", closed on weekends" : isPast ? ", date has passed" : ""}`}
                          aria-pressed={isSelected}
                          onClick={() => {
                            setDate(calendarDate);
                            setSelectedTime("");
                            setConflictMessage("");
                            setError("");
                            setStep(2);
                          }}
                          className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-[#997818]/20 sm:h-9 sm:w-9 ${
                            isUnavailable
                              ? "cursor-not-allowed text-slate-300"
                              : isSelected
                                ? "bg-[#997818] text-white shadow-sm"
                                : "text-slate-700 hover:bg-[#997818]/10 hover:text-[#12066a]"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-xs text-slate-500">Weekends and past dates are unavailable.</p>
                </div>
              </div>
              )}

              {step === 2 && (
              <>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div>
                  <p className="text-xs font-medium text-slate-500">Selected date</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{date ? formatBookingDate(date) : ""}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setSelectedTime("");
                    setError("");
                    setConflictMessage("");
                  }}
                  disabled={submitting}
                  className="text-sm font-semibold text-[#12066a] underline decoration-[#997818]/50 underline-offset-4 hover:text-[#997818]"
                >
                  Back to calendar
                </button>
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-semibold text-slate-800">Choose an available time</h3>
                <p className="mt-1 text-xs text-slate-500">All times shown in UK time (GMT/BST)</p>
                {conflictMessage && (
                  <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800" role="alert">
                    {conflictMessage}
                  </p>
                )}
                {loadingSlots ? (
                  <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-600" role="status">Checking available times…</p>
                ) : error && slots.length === 0 ? (
                  <p className="mt-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">{error}</p>
                ) : (
                  <>
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {slots.map((slot) => (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.available || loadingSlots || submitting}
                          onClick={() => {
                            setSelectedTime(slot.time);
                            setError("");
                            setConflictMessage("");
                          }}
                          aria-pressed={selectedTime === slot.time}
                          className={`rounded-xl border px-3 py-3 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-[#997818]/20 ${
                            !slot.available
                              ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
                              : selectedTime === slot.time
                                ? "border-[#997818] bg-[#997818] text-white"
                                : "border-slate-200 bg-white text-slate-800 hover:border-[#997818] hover:bg-[#997818]/5"
                          }`}
                        >
                          {slot.time}
                          {!slot.available && (
                            <span className="mt-1 block text-[10px] font-medium">
                              {slot.reason === "booked"
                                ? "Already booked"
                                : slot.reason === "weekend"
                                  ? "Weekend closure"
                                  : "Unavailable"}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                    {!slots.some((slot) => slot.available) && (
                      <p className="mt-3 text-sm text-slate-600">
                        {slots[0]?.reason === "weekend"
                          ? "We are closed on Saturdays and Sundays. Please select a weekday."
                          : "No times are available on this date. Please choose another date."}
                      </p>
                    )}
                    {error && <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800" role="alert">{error}</p>}
                  </>
                )}
              </div>
              </>
              )}

              {step === 2 && <div className="mt-4 flex flex-col-reverse gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-500">Booking for {lead.fullName} · {lead.companyName}</p>
                <button
                  type="submit"
                  disabled={!selectedTime || loadingSlots || submitting}
                  className="rounded-xl bg-[#12066a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#25168a] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? "Confirming…" : "Confirm free review"}
                </button>
              </div>}
            </form>
          )}
        </div>
      </section>
    </div>,
    document.body,
  );
}
