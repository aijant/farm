import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

const CalendarDate = () => {
  const [date, setDate] = useState(null);
  return (
    <div>
      <Calendar
        value={date}
        onChange={(e) => setDate(e.value)}
        inline
        showWeek
      />
    </div>
  );
};

export default CalendarDate;
