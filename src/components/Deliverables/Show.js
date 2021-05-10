import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import db from "../../firebase";
import Header from "../Reusable/Header";
import { Item, ItemDetail, Bolder, Button } from "../Reusable/ShowItem";

const ShowDeliverable = () => {
  const history = useHistory();
  const [deliverable, setDeliverable] = useState(null);
  const [task, setTask] = useState("");
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      const res = await db.collection("deliverables").doc(id).get();
      setDeliverable({ ...res.data(), id: res.id });
      const tas = await res.data().task.get();
      setTask(tas.data());
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const deleteDeliverable = async () => {
    await db.collection("deliverables").doc(id).delete();
    history.push("/deliverables");
  };
  return (
    <div>
      {deliverable && (
        <>
          <Header>{deliverable.name}</Header>
          <Item>
            <ItemDetail>
              <Bolder>Name: </Bolder> {deliverable.name}
            </ItemDetail>

            <ItemDetail>
              <Bolder>Description: </Bolder>
              {deliverable.description}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Due Date: </Bolder>
              {deliverable.date}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Requirement: </Bolder> * NOT PART OF PROJE
            </ItemDetail>
            <ItemDetail>
              <Bolder>Task: </Bolder>
              {!task && "Doesn't exist"}
              {task && task.name}
            </ItemDetail>

            <Link to={`/deliverables/${deliverable.id}/edit`}>
              <Button darker>Edit</Button>
            </Link>
            <Button onClick={deleteDeliverable}>Delete</Button>
          </Item>
        </>
      )}
    </div>
  );
};

export default ShowDeliverable;
