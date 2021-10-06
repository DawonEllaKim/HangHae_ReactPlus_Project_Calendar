import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import { history } from "../redux/configureStore";

import Calendar from "../component/Calendar";
import AddPage from "../component/AddPage";
import EditModalPage from "../component/EditModalPage";
// import NotFound from "../component/NotFound";

function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Calendar} />
        <Route path="/addpage" exact component={AddPage} />
        <Route path="/modal" exact component={EditModalPage} />
        {/* <Route exact component={NotFound} /> */}
      </ConnectedRouter>
    </>
  );
}

export default App;
