import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import moment from "moment";

// Action Type
const SET_CALENDAR = "SET_CALENDAR";
const ADD_CALENDAR = "ADD_CALENDAR";

// Action Creators
const setCalendar = createAction(SET_CALENDAR, (calendar_list) => ({
  calendar_list,
}));

const addCalendar = createAction(ADD_CALENDAR, (calendar) => ({
  calendar,
}));

// Initial State
const initialState = {
  list: [],
};

const initialItem = {
  title: "title",
  date: "2021-10-01 10:00:00",
  backgroundColor: "blue",
};

// Middleware
const setCalendarFB = () => {
  return function (dispatch, getState, { history }) {
    const calendarDB = firestore.collection("calendar");

    calendarDB.get().then((docs) => {
      let calendar_list = [];

      docs.forEach((doc) => {
        console.log("doc.id, doc.data()", doc.id, doc.data());

        let calendar = {
          title: doc.title,
          date: doc.date,
          backgroundColor: doc.backgroundColor,
          ...doc.data(),
        };
        calendar_list.push(calendar);
      });
      console.log("calendar_list", calendar_list);
      dispatch(setCalendar(calendar_list));
    });
  };
};

const addCalendarFB = (title, backgroundColor, date) => {
  return function (dispatch, getState, { history }) {
    const calendarDB = firestore.collection("calendar");

    const _calendar = {
      ...initialItem,
      title: title,
      backgroundColor: backgroundColor,
      date: moment(date).format("YYYY-MM-DD HH:mm:ss"),
    };

    console.log({ _calendar });
    calendarDB
      .add({ ..._calendar })
      .then((doc) => {
        let calendar = { ..._calendar, id: doc.id };
        dispatch(addCalendar(calendar));
        history.replace("/");
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

// Reducer
export default handleActions(
  {
    [SET_CALENDAR]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.calendar_list;
      }),
    [ADD_CALENDAR]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.calendar);
      }),
  },
  initialState
);

// action creator export
const actionCreators = {
  setCalendar,
  addCalendar,
  setCalendarFB,
  addCalendarFB,
};

export { actionCreators };
