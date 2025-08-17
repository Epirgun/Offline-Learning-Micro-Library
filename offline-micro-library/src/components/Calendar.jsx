// src/components/Calendar.jsx
import React, { useState, useEffect } from "react";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ date: "", title: "" });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("studyEvents")) || [];
    setEvents(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("studyEvents", JSON.stringify(events));
  }, [events]);

  const addEvent = () => {
    if (!newEvent.date || !newEvent.title) return;
    setEvents([...events, newEvent]);
    setNewEvent({ date: "", title: "" });
  };

  // Get a list of unique dates with events
  const eventDates = events.map((e) => e.date);

  // Build simple month view
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  return (
    <div className="mt-10 p-4 bg-white rounded-2xl shadow-lg max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-3 text-center text-orange-600">
        📅 Study & Exam Calendar
      </h2>

      <div className="flex gap-2 mb-4">
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          className="border rounded p-2 flex-1"
        />
        <input
          type="text"
          placeholder="Exam or Study Session"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          className="border rounded p-2 flex-1"
        />
        <button
          onClick={addEvent}
          className="bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Add
        </button>
      </div>

      {/* Month calendar */}
      <div className="grid grid-cols-7 gap-1 text-center mb-4">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
          <div key={d} className="font-bold">{d}</div>
        ))}
        {calendarDays.map((day, idx) => {
          if (!day) return <div key={idx}></div>;
          const dayStr = `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
          const hasEvent = eventDates.includes(dayStr);
          return (
            <div
              key={idx}
              className={`p-2 rounded ${hasEvent ? "bg-orange-300" : "bg-gray-100"}`}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Event list */}
      <ul className="space-y-2">
        {events.length === 0 && (
          <li className="text-gray-500 text-sm text-center">
            No exams or study sessions yet.
          </li>
        )}
        {events.map((event, index) => (
          <li
            key={index}
            className="p-2 bg-orange-100 rounded-lg flex justify-between items-center"
          >
            <span>
              <strong>{event.date}</strong> – {event.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
