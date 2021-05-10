import React, { useEffect, useState } from "react";
import Header from "../Reusable/Header";
import { Link } from "react-router-dom";
import db from "../../firebase";

import Loading from "../Reusable/Loading";
import {
  ItemCard,
  ItemDescription,
  ItemName,
  DetailsLink,
  ButtonWrapper,
  StyledIcon,
} from "../Reusable/ListItems";
import Sorting from "./Sorting";

const Resource = () => {
  const [resources, setResources] = useState(null);
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      // let res;
      // if (sort) {
      const res = await db.collection("resources").orderBy(sort, order).get();
      // } else {
      //   res = await db.collection("resources").get();
      // }

      setResources(
        res.docs.map((resource) => ({
          ...resource.data(),
          id: resource.id,
        }))
      );
    };
    fetchData();
  }, [sort, order]);

  return (
    <div style={{ position: "relative" }}>
      <Header>Resources</Header>
      <Sorting setOrder={setOrder} setSort={setSort} />
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
              Resource Description - {resource.description} ***TEMPORARY ID
              DISPLAY {resource.id}
            </ItemDescription>
            <DetailsLink to={`/resources/${resource.id}`}>Details</DetailsLink>
          </ItemCard>
        ))}
    </div>
  );
};

export default Resource;
