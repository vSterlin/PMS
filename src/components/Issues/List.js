import React, { useEffect, useState } from "react";
import Header from "../Reusable/Header";
import { Link } from "react-router-dom";
import db from "../../firebase";

import Loading from "../Reusable/Loading";
import { ItemCard, ItemDescription, ItemName, DetailsLink, ButtonWrapper, StyledIcon } from "../Reusable/ListItems";


const Issue = () => {
  const [issues, setIssues] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await db.collection("issues").get();

      setIssues(
        res.docs.map((issue) => ({
          ...issue.data(),
          id: issue.id,
        }))
      );
    };
    fetchData();
  }, []);
  return (
    <div style={{ position: "relative" }}>
      <Header>Issues</Header>
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
            <DetailsLink>Details</DetailsLink>
          </ItemCard>
        ))}
    </div>
  );
};

export default Issue;
