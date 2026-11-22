"use client";

import { useState, useEffect } from "react";

interface DateSelectorProps {
  selectedDate: string | null;
  onDateChange: (date: string) => void;
  minDaysFromToday?: number;
  maxDaysFromToday?: number;
}

/**
 * Date Selector - Allows user to pick a consultation date.
 * 
 * Features:
 * - Shows calendar with today highlighted
 * - Disables past dates and dates beyond range
 * - Validates date format (ISO)
 */
export default function DateSelector({
  selectedDate,
  onDateChange,
  minDaysFromToday = 0,
  maxDaysFromToday = 30,
}: DateSelectorProps) {
  const [today, setToday] = useState(new Date());

  // Update today every minute to keep calendar fresh
  useEffect(() => {
    const updateToday = () => setToday(new Date());
    updateToday();
    const intervalId = setInterval(updateToday, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // Helper: check if a date is within the allowed range
  const isValidDate = (dateStr: string) => {
    if (!dateStr) return false;
    
    try {
      const date = new Date(dateStr);
      
      if (isNaN(date.getTime())) return false;

      // Check if it's in the future (or today)
      const now = new Date();
      if (date < now) return false;

      // Check min/max range
      const daysDiff = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff < minDaysFromToday || daysDiff > maxDaysFromToday) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  };

  // Helper: format date for display in calendar grid
  const formatDateForDisplay = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("sv-SE", { day: "2-digit", month: "short" });
    } catch {
      return "";
    }
  };

  // Helper: check if a date is in the past
  const isPast = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      return date < now;
    } catch {
      return true;
    }
  };

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const year = today.getFullYear();
    const month = today.getMonth();

    // First day of the month (0-6)
    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay();

    // Number of days in this month
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Generate array of day numbers (padded with negative for previous/next months)
    const days: number[] = [];
    
    // Previous month days
    for (let i = startOffset - 1; i >= 0; i--) {
      const day = new Date(year, month, 1 - i);
      days.push(day.getDate() - daysInMonth);
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    // Next-month padding cells. These must NOT be real day numbers: values in
    // the range 1..daysInMonth would pass the render filter and duplicate
    // current-month dates (duplicate React keys). Values above daysInMonth
    // are skipped as empty grid cells.
    const remainingCells = 42 - days.length; // 6 rows × 7 columns
    for (let i = 1; i <= remainingCells; i++) {
      days.push(daysInMonth + i);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  
  // Calculate days in current month for validation
  const lastDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const daysInMonth = lastDayOfCurrentMonth.getDate();

  // Render the calendar grid
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header - month and year */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">
          {today.toLocaleDateString("sv-SE", { month: "long", year: "numeric" })}
        </h3>
        {/* Navigation arrows would go here */}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {/* Weekday headers */}
        {["Sö", "Må", "Ti", "On", "To", "Fr", "Lör"].map((day, index) => (
          <div key={index} className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {calendarDays.map((dayNum) => {
          if (dayNum < 1 || dayNum > daysInMonth) return null;

          const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
          const isValid = isValidDate(dateStr);
          const isPastDay = isPast(dateStr);
          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={dateStr}
              type="button"
              disabled={!isValid || isPastDay}
              onClick={() => onDateChange(dateStr)}
              className={`
                h-10 w-10 rounded-lg text-sm transition-colors
                ${!isValid ? "opacity-30 cursor-not-allowed" : ""}
                ${isSelected ? "bg-blue-600 text-white shadow-md" : ""}
                ${isPastDay && !isSelected ? "text-slate-400" : ""}
                ${!isPastDay && isValid && !isSelected ? "hover:bg-blue-50 text-slate-700" : ""}
              `}
            >
              {dayNum}
            </button>
          );
        })}
      </div>

      {/* Selected date display */}
      {selectedDate && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3">
          <p className="text-sm font-medium text-green-800">
            Vald datum: <span className="font-semibold">{formatDateForDisplay(selectedDate)}</span>
          </p>
        </div>
      )}
    </div>
  );
}