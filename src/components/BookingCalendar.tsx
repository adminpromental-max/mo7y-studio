"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import {
  AR_MONTHS,
  AR_WEEKDAYS,
  getDayStatus,
  toDateString,
  type DayStatus,
} from "@/data/booking";

interface BookingCalendarProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const statusStyles: Record<
  DayStatus,
  { bg: string; text: string; ring: string; cursor: string }
> = {
  available: {
    bg: "bg-emerald-50 hover:bg-emerald-100",
    text: "text-emerald-700",
    ring: "ring-emerald-400",
    cursor: "cursor-pointer",
  },
  limited: {
    bg: "bg-amber-50 hover:bg-amber-100",
    text: "text-amber-700",
    ring: "ring-amber-400",
    cursor: "cursor-pointer",
  },
  booked: {
    bg: "bg-red-50",
    text: "text-red-400 line-through",
    ring: "ring-red-300",
    cursor: "cursor-not-allowed",
  },
  past: {
    bg: "bg-gray-50",
    text: "text-gray-300",
    ring: "ring-transparent",
    cursor: "cursor-not-allowed",
  },
};

export default function BookingCalendar({
  selectedDate,
  onSelectDate,
}: BookingCalendarProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [direction, setDirection] = useState(0);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const startOffset = firstDay.getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (number | null)[] = [];

    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return cells;
  }, [viewYear, viewMonth]);

  const goMonth = (delta: number) => {
    setDirection(delta);
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) {
      m = 11;
      y--;
    } else if (m > 11) {
      m = 0;
      y++;
    }
    setViewMonth(m);
    setViewYear(y);
  };

  const handleDayClick = (day: number) => {
    const dateStr = toDateString(viewYear, viewMonth, day);
    const status = getDayStatus(dateStr);
    if (status === "booked" || status === "past") return;
    onSelectDate(dateStr);
  };

  const selectedLabel = selectedDate
    ? new Date(selectedDate + "T12:00:00").toLocaleDateString("ar-SA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-100/80 h-full">
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => goMonth(-1)}
          className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center hover:bg-purple-100 transition-colors"
          aria-label="الشهر السابق"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.h3
            key={`${viewYear}-${viewMonth}`}
            custom={direction}
            initial={{ opacity: 0, x: direction * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -20 }}
            transition={{ duration: 0.2 }}
            className="text-xl font-bold text-gray-900"
          >
            {AR_MONTHS[viewMonth]} {viewYear}
          </motion.h3>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => goMonth(1)}
          className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center hover:bg-purple-100 transition-colors"
          aria-label="الشهر التالي"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {AR_WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-purple-500 py-2"
          >
            {day.slice(0, 3)}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {calendarDays.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} className="aspect-square" />;
          }

          const dateStr = toDateString(viewYear, viewMonth, day);
          const status = getDayStatus(dateStr);
          const styles = statusStyles[status];
          const isSelected = selectedDate === dateStr;
          const isToday =
            day === today.getDate() &&
            viewMonth === today.getMonth() &&
            viewYear === today.getFullYear();

          return (
            <button
              key={dateStr}
              type="button"
              disabled={status === "booked" || status === "past"}
              onClick={() => handleDayClick(day)}
              className={`
                aspect-square rounded-xl text-sm font-semibold transition-all
                ${styles.bg} ${styles.text} ${styles.cursor}
                ${isSelected ? `ring-2 ${styles.ring} scale-105 shadow-md` : ""}
                ${isToday && !isSelected ? "ring-1 ring-purple-300" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-100">
        {[
          { color: "bg-emerald-400", label: "متاح" },
          { color: "bg-amber-400", label: "محدود" },
          { color: "bg-red-400", label: "محجوز" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-sm text-gray-600">
            <span className={`w-3 h-3 rounded-full ${item.color}`} />
            {item.label}
          </div>
        ))}
      </div>

      {selectedLabel && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center text-sm font-medium text-purple-700 bg-purple-50 rounded-xl py-3 px-4"
        >
          التاريخ المختار: {selectedLabel}
        </motion.p>
      )}
    </div>
  );
}
