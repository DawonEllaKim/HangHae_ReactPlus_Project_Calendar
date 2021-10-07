import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import calendar, { actionCreators as calendarActions } from "../redux/modules/calendar";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import TextField from "@mui/material/TextField";

const Calendar = ({ id, date, backgroundColor, title }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const calendar_list = useSelector((state) => state.calendar.list);

  const [open, setOpen] = React.useState(false);
	const [id_info, setId] = React.useState();
	const [title_info, setTitle] = React.useState({});
	const [date_info, setDate] = React.useState({});
	const [backgroundColor_info, setBackgroundColor] = React.useState();

  const events = calendar_list.map((c, idx) => {
    return {
      title: c.title,
      date: c.date,
      backgroundColor: c.backgroundColor,
			id: c.id,
    };
  });

	const openModal = ({id, title, date, backgroundColor}) => {
		setDate(date);
		setId(id);
		setTitle(title);
		setBackgroundColor(backgroundColor);
		setOpen(true);
	}
  const handleClose = () => {
    setOpen(false);
  };
	const removeItem = () => {
		dispatch(calendarActions.removeCalendarFB(id));
    setOpen(false);
  };
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
				eventClick={(e) => openModal(e.event.id, e.event.date, e.event.title, e.event.backgroundColor)}
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

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Schedule"}</DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
							id: {id_info}
							date: {date_info}
              title: {title_info}
              backgroundColor: {backgroundColor_info}
              {/* <TextField
                id="datetime-local"
                label="Next appointment"
                type="datetime-local"
                defaultValue="YYYY-MM-DDT10:30"
                sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={newDateValue}
              />
              <TextField
                id="standard-basic"
                label="title"
                variant="standard"
                onChange={newTitleValue}
              />
              <TextField
                id="standard-basic"
                label="background color"
                variant="standard"
                onChange={newBackgroundColorValue}
              /> */}
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={removeItem}>삭제</Button>
            <Button onClick={handleClose} autoFocus>
              완료
            </Button>
						<Button onClick={handleClose} autoFocus>
              취소
            </Button>
          </DialogActions>
        </Dialog>
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
