import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import db from "../../firebase";
import Header from "../Reusable/Header";
import { Item, ItemDetail, Bolder, Button } from "../Reusable/ShowItem";

const ShowDecision = () => {
  const history = useHistory();
  const [decision, setDecision] = useState(null);
  const [resource, setResource] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await db.collection("decisions").doc(id).get();
      setDecision(res.data());
      console.log(res.data())
      if (res.data().resourceAssigned) {
        const resource = await res.data().resourceAssigned.get();
        setResource(resource.data());
      }
    };
    fetchData();
  }, []);

  const deleteDecision = async () => {
    await db.collection("decisions").doc(id).delete();
    history.push("/decisions");
  };
  return (
    <div>
      {decision && (
        <>
          <Header>{decision.name}</Header>
          <Item>
            <ItemDetail>
              <Bolder>Name: </Bolder> {decision.name}
            </ItemDetail>

            <ItemDetail>
              <Bolder>Description: </Bolder>
              {decision.description}
            </ItemDetail>

            <ItemDetail>
              <Bolder>Priority: </Bolder>
              {decision.priority}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Date Needed: </Bolder>
              {decision.dateNeeded}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Expected Completion Date: </Bolder>
              {decision.expectedCompletionDate}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Actual Completion Date: </Bolder>
              {decision.actualCompletionDate}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Status: </Bolder>
              {decision.status}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Reference Document: </Bolder>
        Not part of proj
            </ItemDetail>
            <Button darker>Edit</Button>
            <Button onClick={deleteDecision}>Delete</Button>
          </Item>
        </>
      )}
    </div>
  );
};

export default ShowDecision;
