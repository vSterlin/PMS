import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import db from "../../firebase";
import Header from "../Reusable/Header";
import { Item, ItemDetail, Bolder, Button } from "../Reusable/ShowItem";

const ShowIssue = () => {
  const history = useHistory();
  const [issue, setIssue] = useState(null);
  const [decision, setDecision] = useState("");
  const [actionItem, setActionItem] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await db.collection("issues").doc(id).get();
      setIssue(res.data());
      console.log(res.data())
      if (res.data().decision) {
        const decision = await res.data().decision.get();
        setDecision(decision.data());
      }
      if (res.data().actionItem) {
        const actionItem = await res.data().actionItem.get();
        setActionItem(actionItem.data());
      }
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const deleteIssue = async () => {
    await db.collection("issues").doc(id).delete();
    history.push("/issues");
  };
  return (
    <div>
      {issue && (
        <>
          <Header>{issue.name}</Header>
          <Item>
            <ItemDetail>
              <Bolder>Name: </Bolder> {issue.name}
            </ItemDetail>

            <ItemDetail>
              <Bolder>Description: </Bolder>
              {issue.description}
            </ItemDetail>

            <ItemDetail>
              <Bolder>Priority: </Bolder>
              {issue.priority}
            </ItemDetail>

            <ItemDetail>
              <Bolder>Severity: </Bolder>
              {issue.severity}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Date Assigned: </Bolder>
              {issue.dateAssigned}
            </ItemDetail>


            <ItemDetail>
              <Bolder>Expected Completion Date: </Bolder>
              {issue.expectedCompletionDate}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Actual Completion Date: </Bolder>
              {issue.actualCompletionDate}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Status: </Bolder>
              {issue.status}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Action Item: </Bolder>
              {actionItem.name}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Decision: </Bolder>
              {decision.name}
            </ItemDetail>

            <Button darker>Edit</Button>
            <Button onClick={deleteIssue}>Delete</Button>
          </Item>
        </>
      )}
    </div>
  );
};

export default ShowIssue;
