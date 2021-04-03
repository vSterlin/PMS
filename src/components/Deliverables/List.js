import React from "react";
import Header from "../Header";
import {Link} from "react-router-dom"


const Deliverable = (props) => {
  return (
    <div>
      <Header>Deliverables</Header>
      <Link to="/deliverables/create">
        <button>Create a new deliverable</button>
      </Link>
  
      
    </div>
  );
};

export default Deliverable;
