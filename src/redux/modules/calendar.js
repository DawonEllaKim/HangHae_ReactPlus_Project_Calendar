import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import moment from "moment";

// Action Type
const SET_CALENDAR = "SET_CALENDAR";
const ADD_CALENDAR = "ADD_CALENDAR";
const EDIT_CALENDAR = "EDIT_CALENDAR";
const MODAL_SET_CALENDAR = "MODAL_SET_CALENDAR";
const REMOVE_CALENDAR = "REMOVE_CALENDAR";

// Action Creators
const setCalendar = createAction(SET_CALENDAR, (calendar_list) => ({
  calendar_list,
}));
const addCalendar = createAction(ADD_CALENDAR, (calendar) => ({
  calendar,
}));
const editCalendar = createAction(EDIT_CALENDAR, (calendar_id, calendar) => ({
  calendar_id,
  calendar,
}));
const modalSetCalendar = createAction(MODAL_SET_CALENDAR, (calendar_list) => ({
  calendar_list,
}));
const removeCalendar = createAction(REMOVE_CALENDAR, (id) => ({
  id,
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
        // console.log("", doc.id, doc.data().date);
        // console.log(docs.id);
        // // console.log("calendar", calendar_list[0].doc.id)

        let calendar = {
          title: doc.title,
          date: doc.date,
          backgroundColor: doc.backgroundColor,
          id: doc.id,
          ...doc.data(),
        };

        calendar_list.push(calendar);
      });

      // console.log("calendar_list", calendar_list);
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
const editCalendarFB = (calendar_id = null, calendar = {}) => {
  return function (dispatch, getState, { history }) {
    const _calendar_idx = getState().post.list.findIndex(
      (c) => c.id === calendar_id
    );
    // console.log(_calendar_idx)
    const _calendar = getState().calendar.list[_calendar_idx];
    const calendarDB = firestore.collection("calendar");
    calendarDB
      .doc(calendar_id)
      .update({ ...calendar })
      .then((doc) => {
        dispatch(editCalendar(calendar_id, { ...calendar }));
      });
    // console.log("calendar_id", calendar_id);
    dispatch(editCalendar(calendar_id));
  };
};
const modalSetCalendarFB = () => {
  return function (dispatch, getState, { history }) {
    const calendarDB = firestore.collection("calendar");

    calendarDB.get().then((docs) => {
      let calendar_list = [];

      docs.forEach((doc) => {
        console.log("doc.id, doc.data()", doc.id, doc.data());
        // console.log("", doc.id, doc.data().date);
        // console.log(docs.id);
        // // console.log("calendar", calendar_list[0].doc.id)

        let calendar = {
          title: doc.title,
          date: doc.date,
          backgroundColor: doc.backgroundColor,
          id: doc.id,
          ...doc.data(),
        };

        calendar_list.push(calendar);
      });

      // console.log("calendar_list", calendar_list);
      dispatch(modalSetCalendar(calendar_list));
    });
  };
};
const removeCalendarFB = (id) => {
	const calendarDB = firestore.collection("calendar");
  return function (dispatch, getState, { history }) {
    calendarDB
      .doc(id)
      .delete()
      .then(() => {
        dispatch(removeCalendar(id));
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
    [EDIT_CALENDAR]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (c) => c.id === action.payload.calendar_id
        );
        draft.list[idx] = { ...draft.list[idx], ...action.payload.calendar };
      }),
    [MODAL_SET_CALENDAR]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.calendar_list;
      }),
    [REMOVE_CALENDAR]: (state, action) =>
      produce(state, (draft) => {
				draft.list.filter((c) => c.id !== action.payload.id);
      }),
  },
  initialState
);

// action creator export
const actionCreators = {
  setCalendar,
  addCalendar,
  editCalendar,
  setCalendarFB,
  addCalendarFB,
  editCalendarFB,
  removeCalendarFB,
  removeCalendar,

  modalSetCalendar,
  modalSetCalendarFB,
};

export { actionCreators };
