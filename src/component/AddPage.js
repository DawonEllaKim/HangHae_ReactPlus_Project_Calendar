import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as calendarActions } from "../redux/modules/calendar";

// Material UI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const AddPage = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const [dates, setDates] = React.useState("");
  const [titles, setTitles] = React.useState("");
  const [backgroundcolors, setBackgroundcolors] = React.useState("");

  // 일정추가 페이지에서 일정 제목 받아오는 것
  const changeTitles = (e) => {
    setTitles(e.target.value);
    console.log("e.target.value", e.target.value);
  };

  // 일정추가 페이지에서 일정 날짜/시간 받아오는 것
  const changeDates = (e) => {
    setDates(e.target.value);
    console.log("e.target.value", e.target.value);
  };

  // 일정추가 페이지에서 일정 그룹/색 선택 받아오는 것
  const changeBackgroundcolors = (e) => {
    setBackgroundcolors(e.target.value);
    console.log("e.target.value", e.target.value);
  };

  // 일정 추가 버튼을 누르면 일어나는 것
  const addCalendar = () => {
    if (titles === "" || dates === "" || backgroundcolors === "") {
      window.alert("빈칸을 채워주세요.");
      return;
    } else {
      dispatch(calendarActions.addCalendarFB(titles, backgroundcolors, dates));
    }
  };

  return (
    <>
      <AddBox>
        <h1 style={{ color: "#EA9086" }}>New Schedule</h1>
				<Wrap
        >
					{/* 일정 날짜/시간 */}
          <TextField
            id="datetime-local"
            label="Next appointment"
            type="datetime-local"
            defaultValue="YYYY-MM-DDT10:30"
            sx={{ width: 250 }}
            style={{ margin: "10px" }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={changeDates}
          />

					{/* 일정 타이틀 */}
          <TextField
            id="standard-basic"
            label="일정"
            variant="standard"
            onChange={changeTitles}
            sx={{ width: 200 }}
            style={{ margin: "10px" }}
          />

					{/* 일정 그룹/색 선택 */}
          <FormControl
            variant="standard"
            sx={{ width: 200 }}
            style={{ margin: "10px" }}
          >
            <InputLabel id="demo-simple-select-standard-label">그룹</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={backgroundcolors}
              onChange={changeBackgroundcolors}
              label="그룹"
            >
              <MenuItem value={"green"}>공부 관련</MenuItem>
              <MenuItem value={"orange"}>미팅</MenuItem>
              <MenuItem value={"red"}>중요한 일정</MenuItem>
              <MenuItem value={"pink"}>생일</MenuItem>
              <MenuItem value={"blue"}>그 외</MenuItem>
            </Select>
          </FormControl>
        </Wrap>

        <div style={{ margin: "20px 0 0 0" }}>
					{/* 일정 추가 페이지 - 취소 버튼 */}
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              history.push("/");
            }}
            style={{
              margin: "0 10px 0 0",
              width: "90px",
              backgroundColor: "#EFAF97",
              color: "white",
              border: "1px solid #65B7AB",
            }}
          >
            취소
          </Button>

					{/* 일정 추가 페이지 - 추가 버튼 */}
          <Button
            variant="outlined"
            color="primary"
            onClick={addCalendar}
            style={{
              width: "90px",
              backgroundColor: "#EFAF97",
              color: "white",
              border: "1px solid #65B7AB",
            }}
          >
            일정 추가
          </Button>
        </div>
      </AddBox>
    </>
  );
};

const AddBox = styled.div`
  width: 50%;
  margin: 200px auto;
  padding: 50px;
  border-radius: 10px;
  border: 4px solid #ea9086;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

export default AddPage;