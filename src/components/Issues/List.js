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

const Issue = () => {
  const [issues, setIssues] = useState(null);
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      const res = await db.collection("issues").orderBy(sort, order).get();

      setIssues(
        res.docs.map((issue) => ({
          ...issue.data(),
          id: issue.id,
        }))
      );
    };
    fetchData();
  }, [sort, order]);

  return (
    <div style={{ position: "relative" }}>
      <Header>Issues</Header>
      <Sorting setOrder={setOrder} setSort={setSort} />

      <ButtonWrapper>
        <Link to="/issues/create">
          {/* <button> */}
          <div>
            <StyledIcon />
            New Issue
          </div>
          {/* </button> */}
        </Link>
      </ButtonWrapper>
      {!issues && <Loading />}
      {issues && issues.length === 0 && (
        <p style={{ textAlign: "center" }}>Currently there are no issues</p>
      )}
      {issues &&
        issues.map((issue) => (
          <ItemCard>
            <ItemName>Issue Name - {issue.name}</ItemName>
            <ItemDescription>
              Issue Description - {issue.description} ***TEMPORARY ID DISPLAY{" "}
              {issue.id}
            </ItemDescription>
            <DetailsLink to={`/issues/${issue.id}`}>Details</DetailsLink>
          </ItemCard>
        ))}
    </div>
  );
};

export default Issue;
