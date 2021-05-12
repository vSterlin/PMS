import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import db from "../../firebase";
import Header from "../Reusable/Header";
import { Item, ItemDetail, Bolder, Button } from "../Reusable/ShowItem";

const ShowActionItem = () => {
  const history = useHistory();
  const [actionItem, setActionItem] = useState(null);
  const [resource, setResource] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await db.collection("action-items").doc(id).get();
      setActionItem({ ...res.data(), id: res.id });
      console.log(res.data());
      if (res.data().resourceAssigned) {
        const resource = await res.data().resourceAssigned.get();
        setResource(resource.data());
      }
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const deleteActionItem = async () => {
    await db.collection("action-items").doc(id).delete();
    history.push("/action-items");
  };
  return (
    <div>
      {actionItem && (
        <>
          <Header>{actionItem.name}</Header>
          <Item>
          <ItemDetail>
              <Bolder>Unique ID: </Bolder> {actionItem.id}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Name: </Bolder> {actionItem.name}
            </ItemDetail>

            <ItemDetail>
              <Bolder>Description: </Bolder>
              {actionItem.description}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Date Assigned: </Bolder>
              {actionItem.dateAssigned}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Resource Assigned: </Bolder>
              {(resource && resource.name) || "Doesn't exist"}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Expected Completion Date: </Bolder>
              {actionItem.expectedCompletionDate}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Actual Completion Date: </Bolder>
              {actionItem.actualCompletionDate}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Status: </Bolder>
              {actionItem.status}
            </ItemDetail>

            <Link to={`/action-items/${actionItem.id}/edit`}>
              <Button darker>Edit</Button>
            </Link>
            <Button onClick={deleteActionItem}>Delete</Button>
          </Item>
        </>
      )}
    </div>
  );
};

export default ShowActionItem;
