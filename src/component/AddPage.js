import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as calendarActions } from "../redux/modules/calendar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const AddPage = (props) => {
  const dispatch = useDispatch();
  const { history } = props;

  const [dates, setDates] = React.useState("");
  const [titles, setTitles] = React.useState("");
  const [backgroundcolors, setBackgroundcolors] = React.useState("");

  const changeTitles = (e) => {
    setTitles(e.target.value);
    console.log("e.target.value", e.target.value);
  };

  const changeDates = (e) => {
    setDates(e.target.value);
    console.log("e.target.value", e.target.value);
  };

  const changeBackgroundcolors = (e) => {
    setBackgroundcolors(e.target.value);
    console.log("e.target.value", e.target.value);
  };

  const addCalendar = () => {
    dispatch(calendarActions.addCalendarFB(titles, backgroundcolors, dates));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            id="datetime-local"
            label="Next appointment"
            type="datetime-local"
            defaultValue="YYYY-MM-DDT10:30"
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={changeDates}
          />

          <TextField
            id="standard-basic"
            label="title"
            variant="standard"
            onChange={changeTitles}
          />

          <TextField
            id="standard-basic"
            label="background color"
            variant="standard"
            onChange={changeBackgroundcolors}
          />
        </div>
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              history.push("/");
            }}
          >
            취소
          </Button>
          <Button variant="outlined" color="primary" onClick={addCalendar}>
            일정 추가
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddPage;
