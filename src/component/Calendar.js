import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as calendarActions } from "../redux/modules/calendar";
import styled from "styled-components";

// Full calendar + Material UI
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddTaskIcon from "@mui/icons-material/AddTask";
import TodayIcon from "@mui/icons-material/Today";

const Calendar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const calendar_list = useSelector((state) => state.calendar.list);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState();
  const [title_info, setTitle] = React.useState({});
  const [completedItems, setCompletedItems] = React.useState();
  const [isShow, setIsShow] = React.useState(false);

  const allEvents = calendar_list.map((c, idx) => {
    return {
      title: c.title,
      date: c.date,
      backgroundColor: c.backgroundColor,
      id: c.id,
      completed: c.completed,
    };
  });
  const completedEvents = allEvents.filter((c, idx) => {
    return c.completed === true;
  });

	// 처음에 firebase에 있는 데이터를 컴포넌트에 뿌려준다.
  React.useEffect(() => {
    dispatch(calendarActions.setCalendarFB());
  }, []);

	// 달력 위에서 각 이벤트를 눌렀을때. 해당 이벤트의 id와 title 값을 불러온다. + 창 열림
  const openModal = (id, title) => {
    setId(id);
    setTitle(title);
    setOpen(true);
  };

	// 각 이벤트에서 삭제를 눌렀을때. 삭제 액션이 일어남 + 창 닫김
  const removeItem = () => {
    dispatch(calendarActions.removeCalendarFB(id));
    setOpen(false);
  };

	// 모달창 닫는 함수
  const handleClose = () => {
    setOpen(false);
  };

	// 모달창에서 완료 클릭. 완료되는 액션 일어남 + 창 닫김
  const completeSchedule = () => {
    dispatch(calendarActions.completeScheduleFB(id));
    setOpen(false);
  };

	// 토글 버튼을 누르면, 버튼의 글자가 바뀜 + 완성된 이벤트/전체 이벤트 보여줌
  const toggleShow = () => {
    setIsShow(!isShow);
    setCompletedItems(!completedItems);
  };

  return (
    <>
      <FullCalendar
        themeSystem="bootstrap"
        plugins={[dayGridPlugin]}
        height="100vh"
        events={completedItems ? completedEvents : allEvents}
        style={{ color: "#ea9086" }}
        headerToolbar={{
          start: "title",
          center: "",
          end: "prev,today,next",
        }}
        // 일정을 클릭하면 클린된 해당 일정의 정보들이 넘어온다.
        eventClick={(e) => openModal(e.event.id, e.event.title)}
      />

      <Wrap>
        <Fab
          variant="outlined"
          color="secondary"
          style={{
            backgroundColor: "#ea9086",
            width: "100px",
            height: "10px",
            borderRadius: "30px",
            margin: "5px 10px 5px 0",
          }}
          onClick={() => {
            history.push("/addpage");
          }}
        >
          <AddTaskIcon />
          일정추가
        </Fab>

        {/* 토글 버튼 */}
        <Fab
          variant="outlined"
          color="secondary"
          onClick={toggleShow}
          style={{
            backgroundColor: "#ea9086",
            width: "100px",
            height: "10px",
            borderRadius: "30px",
            margin: "5px 10px 10px 0",
          }}
        >
          <TodayIcon />
          {/* 값이 true일때는 버튼이 전체일정이 되고 false일때는 완료일정으로 바뀐다. */}
          {isShow ? "전체 일정" : "완료 일정"}
        </Fab>
      </Wrap>

      {/* 모달창 */}
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{ textAlign: "center", marginTop: "40px", color: "#138086" }}
          >
            {title_info}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"></DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={removeItem}
              style={{
                backgroundColor: "#ea9086",
                width: "80px",
                height: "30px",
                borderRadius: "30px",
                margin: "5px 10px 5px 0",
                color: "white",
              }}
            >
              삭제
            </Button>
            <Button
              onClick={completeSchedule}
              style={{
                backgroundColor: "#ea9086",
                width: "80px",
                height: "30px",
                borderRadius: "30px",
                margin: "5px 10px 5px 0",
                color: "white",
              }}
            >
              완료
            </Button>
            <Button
              onClick={handleClose}
              style={{
                backgroundColor: "#ea9086",
                width: "80px",
                height: "30px",
                borderRadius: "30px",
                margin: "5px 10px 5px 0",
                color: "white",
              }}
            >
              취소
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 10;
  position: fixed;
  bottom: 0;
  right: 0;
`;

export default Calendar;
