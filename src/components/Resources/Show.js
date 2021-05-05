import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import db from "../../firebase";
import Header from "../Reusable/Header";
import { Item, ItemDetail, Bolder, Button } from "../Reusable/ShowItem";



const ShowResource = () => {
  const history = useHistory();
  const [resource, setResource] = useState(null);


  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await db.collection("resources").doc(id).get();
      setResource(res.data());
    };
    fetchData();
  }, []);

  const deleteResource = async () => {
    await db.collection("resources").doc(id).delete();
    history.push("/resources");
  };
  return (
    <div>
      {resource && (
        <>
          <Header>{resource.name}</Header>
          <Item>
            <ItemDetail>
              <Bolder>Name: </Bolder> {resource.name}
            </ItemDetail>

            <ItemDetail>
              <Bolder>Title: </Bolder>
              {resource.description}
            </ItemDetail>

            <ItemDetail>
              <Bolder>Skills: </Bolder>
              {resource.skill}
            </ItemDetail>

            <ItemDetail>
              <Bolder>Availability Calendar: </Bolder>
              {resource.availabilityCalendar}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Pay Rate: </Bolder>
              {resource.payRate} $
            </ItemDetail>

            <Button darker>Edit</Button>
            <Button onClick={deleteResource}>Delete</Button>
          </Item>
        </>
      )}
    </div>
  );
};

export default ShowResource;
