import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import db from "../../firebase";
import Header from "../Header";

const Deliverable = styled.div`
  padding: 10px 10%;

  color: #6a6a6a;
  & > * {
    margin: 20px 0;
  }
`;


const DeliverableDetail = styled.h3`
  font-weight: lighter;
`;

const Bolder = styled.span`
  font-weight: bolder;
`;

const Button = styled.button`
  padding: 8px 15px;
  background-color: ${({darker}) => darker ? "#393535" : "#989898"};
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  &:first-of-type{
    margin-right: 10px;
  }
  &:hover{
    opacity: 0.9;
  }


`;

const ShowDeliverable = () => {
  const history = useHistory();
  const [deliverable, setDeliverable] = useState(null);
  const [task, setTask] = useState("");
  const { id } = useParams();
  console.log(id)
  useEffect(() => {
    const fetchData = async () => {
      const res = await db.collection("deliverables").doc(id).get();
      setDeliverable(res.data());
      const tas = await res.data().task.get();
      setTask(tas.data());
    };
    fetchData();
  }, []);

  const deleteDeliverable = async () => {
    await db.collection("deliverables").doc(id).delete();
    history.push("/deliverables");

  }
  return (
    <div>
      {deliverable && (
        <>
          <Header>adsda</Header>
          <Deliverable>
            <DeliverableDetail>
              <Bolder>Name: </Bolder> {deliverable.name}
            </DeliverableDetail>

            <DeliverableDetail>
              <Bolder>Description: </Bolder>
              {deliverable.description}
            </DeliverableDetail>
            <DeliverableDetail>
              <Bolder>Due Date: </Bolder>
              {deliverable.date}
            </DeliverableDetail>
            <DeliverableDetail>
              <Bolder>Requirement: </Bolder> * NOT PART OF PROJE
            </DeliverableDetail>
            <DeliverableDetail>
              <Bolder>Task: </Bolder>
              {task.name}
            </DeliverableDetail>

            <Button darker>Edit</Button>
            <Button onClick={deleteDeliverable}>Delete</Button>

          </Deliverable>
        </>
      )}
    </div>
  );
};

export default ShowDeliverable;
