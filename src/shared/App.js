import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import Calendar from "../component/Calendar";
import AddPage from "../component/AddPage";

function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Calendar} />
        <Route path="/addpage" exact component={AddPage} />
      </ConnectedRouter>
    </>
  );
}

export default App;
