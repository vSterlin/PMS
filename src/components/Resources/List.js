import React, { useEffect, useState } from "react";
import Header from "../Reusable/Header";
import { Link } from "react-router-dom";
import db from "../../firebase";

import Loading from "../Reusable/Loading";
import { ItemCard, ItemDescription, ItemName, DetailsLink, ButtonWrapper, StyledIcon } from "../Reusable/ListItems";


const Resource = () => {
  const [resources, setResources] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await db.collection("resources").get();

      setResources(
        res.docs.map((resource) => ({
          ...resource.data(),
          id: resource.id,
        }))
      );
    };
    fetchData();
  }, []);
  return (
    <div style={{ position: "relative" }}>
      <Header>Resources</Header>
      <ButtonWrapper>
        <Link to="/resources/create">
          {/* <button> */}
          <div>
            <StyledIcon />
            New Resource
          </div>
          {/* </button> */}
        </Link>
      </ButtonWrapper>
      {!resources && <Loading />}
      {resources && resources.length === 0 && (
        <p style={{ textAlign: "center" }}>Currently there are no resources</p>
      )}
      {resources &&
        resources.map((resource) => (
          <ItemCard>
            <ItemName>Resource Name - {resource.name}</ItemName>
            <ItemDescription>
              Resource Description - {resource.description} ***TEMPORARY ID DISPLAY{" "}
              {resource.id}
            </ItemDescription>
            <DetailsLink>Details</DetailsLink>
          </ItemCard>
        ))}
    </div>
  );
};

export default Resource;
