import styled from "styled-components";
import {Link} from "react-router-dom";

const resources = [
  "Deliverables",
  "Tasks",
  "Action Items",
  "Issues",
  "Decisions",
  "Resources",
  "Risks",
  "Requirements",
  "Changes",
  "Reference Doc.",
  "Components",
  "Defects",
];

const Bar = styled.div`
  background-color: #4f585e;
  color: #d9d9d9;
  height: 100vh;
`;

const BarItem = styled.div`
  padding: 10px 0;
  /* text-align: center; */
  padding-left: 20px;
  border-bottom: 1px #d9d9d9 solid;
  &:hover{
   color: white;
   background-color: #C6C9CB;
  }
  transition: all 0.1s linear;
`;


const Sidebar = () => {
  return (
    <Bar>
      {resources.map((resource) => (
        <Link to={resource.trim().toLowerCase()}>
        <BarItem>{resource}</BarItem>
        </Link>
      ))}
    </Bar>
  );
};

export default Sidebar;
