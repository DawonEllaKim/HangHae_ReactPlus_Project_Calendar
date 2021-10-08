import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import moment from "moment";

// Action Type
const SET_CALENDAR = "SET_CALENDAR";
const ADD_CALENDAR = "ADD_CALENDAR";
const MODAL_SET_CALENDAR = "MODAL_SET_CALENDAR";
const REMOVE_CALENDAR = "REMOVE_CALENDAR";
const COMPLETE_CALENDAR = "COMPLETE_CALENDAR";
const COMPLETED_MODE = "COMPLETED_MODE";

// Action Creators
const setCalendar = createAction(SET_CALENDAR, (calendar_list) => ({
  calendar_list,
}));

const addCalendar = createAction(ADD_CALENDAR, (calendar) => ({
  calendar,
}));

const modalSetCalendar = createAction(MODAL_SET_CALENDAR, (calendar_list) => ({
  calendar_list,
}));

const removeCalendar = createAction(REMOVE_CALENDAR, (id) => ({
  id,
}));

const completeSchedule = createAction(COMPLETE_CALENDAR, (id, completed) => ({
  id,
  completed,
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
        let calendar = {
          title: doc.title,
          date: doc.date,
          backgroundColor: doc.backgroundColor,
          id: doc.id,
          ...doc.data(),
        };
        calendar_list.push(calendar);
      });
      dispatch(setCalendar(calendar_list));
    });
  };
};

const addCalendarFB = (title, backgroundColor, date, completed = false) => {
  return function (dispatch, getState, { history }) {
    const calendarDB = firestore.collection("calendar");
    const _calendar = {
      ...initialItem,
      title: title,
      backgroundColor: backgroundColor,
      date: moment(date).format("YYYY-MM-DD hh:mm:ss"),
      completed: completed,
    };
    calendarDB
      .add({ ..._calendar })
      .then((doc) => {
        let calendar = { ..._calendar, id: doc.id };
        dispatch(addCalendar(calendar));
        history.replace("/");
      })
      .catch((err) => {});
  };
};

const modalSetCalendarFB = () => {
  return function (dispatch, getState, { history }) {
    const calendarDB = firestore.collection("calendar");
    calendarDB.get().then((docs) => {
      let calendar_list = [];
      docs.forEach((doc) => {
        let calendar = {
          title: doc.title,
          date: doc.date,
          backgroundColor: doc.backgroundColor,
          id: doc.id,
          ...doc.data(),
        };
        calendar_list.push(calendar);
      });
      dispatch(modalSetCalendar(calendar_list));
    });
  };
};

const removeCalendarFB = (id) => {
  return function (dispatch, getState, { history }) {
    const calendarDB = firestore.collection("calendar");
    calendarDB
      .doc(id)
      .delete()
      .then(() => {
        dispatch(setCalendarFB());
      });
  };
};

const completeScheduleFB = (id, completed) => {
  return function (dispatch, getState, { history }) {
    const calendarDB = firestore.collection("calendar");
    calendarDB
      .doc(id)
      .update({ completed: true, backgroundColor: "black" })
      .then(() => {
        dispatch(setCalendarFB());
      })
      .catch((err) => console.log(err));
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

    [MODAL_SET_CALENDAR]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.calendar_list;
      }),

    [REMOVE_CALENDAR]: (state, action) =>
      produce(state, (draft) => {
        draft.list.filter((c) => c.id !== action.payload.id);
      }),

    [COMPLETE_CALENDAR]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((c) => c.id === action.payload.id);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.calendar };
      }),

    [COMPLETED_MODE]: (state, action) =>
      produce(state, (draft) => {
        draft.mode = draft.mode === "all" ? "completed" : "all";
      }),
  },
  initialState
);

// action creator export
const actionCreators = {
  setCalendar,
  setCalendarFB,
  addCalendar,
  addCalendarFB,
  modalSetCalendar,
  modalSetCalendarFB,
  removeCalendarFB,
  removeCalendar,
  completeSchedule,
  completeScheduleFB,
};
export { actionCreators };
