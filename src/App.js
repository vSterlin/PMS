import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import styled, { createGlobalStyle } from "styled-components";
import Sidebar from "./components/Reusable/Sidebar";
import Nav from "./components/Reusable/Navbar";

import {
  DeliverableList,
  DeliverableCreateForm,
  ShowDeliverable,
} from "./components/Deliverables";
import { TaskList, TaskCreateForm, ShowTask, Gantt } from "./components/Tasks";
import {
  ActionItemList,
  ActionItemCreateForm,
  ShowActionItem,
} from "./components/ActionItems";

const MainFlexBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 8fr;
  padding-top: 50px;
`;

const Global = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  * {
    padding: 0;
    margin: 0;
    box-sizing: content-box;
    font-family: 'Roboto', 'sans-serif';
  }

  body {
    background-color: #EFEFEF;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

function App() {
  return (
    <Router>
      <MainFlexBox>
        <Global />
        <Nav />
        <Sidebar />
        <Switch>
          {/* /////////////////////////////////////// */}
          <Route
            path="/deliverables"
            exact
            component={() => <DeliverableList />}
          />
          <Route
            path="/deliverables/create"
            exact
            component={() => <DeliverableCreateForm />}
          />
          <Route
            path="/deliverables/:id"
            exact
            component={() => <ShowDeliverable />}
          />
          {/* /////////////////////////////////////// */}
          <Route path="/tasks" exact component={() => <TaskList />} />
          <Route
            path="/tasks/create"
            exact
            component={() => <TaskCreateForm />}
          />
                    <Route
            path="/tasks/gantt"
            exact
            component={() => <Gantt />}
          />
          <Route path="/tasks/:id" exact component={() => <ShowTask />} />
          {/* /////////////////////////////////////// */}
          <Route
            path="/action-items"
            exact
            component={() => <ActionItemList />}
          />
          <Route
            path="/action-items/create"
            exact
            component={() => <ActionItemCreateForm />}
          />
          <Route
            path="/action-items/:id"
            exact
            component={() => <ShowActionItem />}
          />
          {/* /////////////////////////////////////// */}
          {/* <Redirect from="/" exact to="/deliverables" /> */}
        </Switch>
        <div></div>
      </MainFlexBox>
    </Router>
  );
}

export default App;
