import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
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
      setDecision({ ...res.data(), id: res.id });
      console.log(res.data());
      if (res.data().decisionMaker) {
        const resource = await res.data().decisionMaker.get();
        setResource(resource.data());
      }
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
              <Bolder>Impact: </Bolder>
              {decision.impact}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Date Needed: </Bolder>
              {decision.dateNeeded}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Date Made: </Bolder>
              {decision.dateMade}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Decision Maker: </Bolder>
              {resource.name}
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
            <Link to={`/decisions/${decision.id}/edit`}>
              <Button darker>Edit</Button>
            </Link>
            <Button onClick={deleteDecision}>Delete</Button>
          </Item>
        </>
      )}
    </div>
  );
};

export default ShowDecision;
