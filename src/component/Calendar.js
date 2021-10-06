import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as calendarActions } from "../redux/modules/calendar";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import Fab from "@material-ui/core/Fab";

const Calendar = (props) => {
  const dispatch = useDispatch();
  const calendar_list = useSelector((state) => state.calendar.list);

  const events = calendar_list.map((c, idx) => {
    return {
      title: c.title,
      date: c.date,
      backgroundColor: c.backgroundColor,
    };
  });

  const history = useHistory();

  React.useEffect(() => {
    dispatch(calendarActions.setCalendarFB());
  }, []);

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        headerToolbar={{
          start: "title",
          center: "",
          end: "prev,today,next",
        }}
        height="100vh"
        events={events}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          zIndex: "10",
          position: "fixed",
          bottom: "0",
          right: "0",
        }}
      >
        <Fab
          variant="outlined"
          color="secondary"
          onClick={() => {
            history.push("/addpage");
          }}
        >
          일정추가
        </Fab>
        <Fab variant="outlined" color="secondary">
          완료일정
        </Fab>
      </div>
    </>
  );
};

// function renderEventContent(eventInfo) {
//   return (
//     <>
//       <b>{eventInfo.timeText}</b>
//       <i>{eventInfo.event.title}</i>
//     </>
//   );
// }

export default Calendar;
