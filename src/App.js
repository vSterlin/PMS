import { BrowserRouter as Router, Route ,Redirect} from "react-router-dom";

import styled, { createGlobalStyle } from "styled-components";
import Sidebar from "./components/Sidebar";
import Nav from "./components/Navbar";
import DeliverableList from "./components/Deliverables/List";
import DeliverableCreateForm from "./components/Deliverables/CreateForm";

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
        <Route path="/deliverables" exact component={() => <DeliverableList />}/>
        <Route path="/deliverables/create" exact component={() => <DeliverableCreateForm />}/>
        <Redirect from="/" exact to="/deliverables" />

        <div></div>
      </MainFlexBox>
</Router>

  );
}

export default App;
