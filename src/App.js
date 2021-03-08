import styled, {createGlobalStyle} from "styled-components";
import Sidebar from "./components/Sidebar";
import Nav from "./components/Navbar";

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
`;


function App() {
  return (
    <MainFlexBox>
      <Global />
      <Nav />
      <Sidebar />
      <div></div>
    </MainFlexBox>
  );
}

export default App;
