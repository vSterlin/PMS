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

const Decision = () => {
  const [decisions, setDecisions] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await db.collection("decisions").get();

      setDecisions(
        res.docs.map((decision) => ({
          ...decision.data(),
          id: decision.id,
        }))
      );
    };
    fetchData();
  }, []);
  return (
    <div style={{ position: "relative" }}>
      <Header>Decisions</Header>
      <ButtonWrapper>
        <Link to="/decisions/create">
          {/* <button> */}
          <div>
            <StyledIcon />
            New Decision
          </div>
          {/* </button> */}
        </Link>
      </ButtonWrapper>
      {!decisions && <Loading />}
      {decisions && decisions.length === 0 && (
        <p style={{ textAlign: "center" }}>Currently there are no Decisions</p>
      )}
      {decisions &&
        decisions.map((decision) => (
          <ItemCard>
            <ItemName>Decision Name - {decision.name}</ItemName>
            <ItemDescription>
              Decision Description - {decision.description} ***TEMPORARY ID
              DISPLAY {decision.id}
            </ItemDescription>
            <DetailsLink to={`/decisions/${decision.id}`}>Details</DetailsLink>
          </ItemCard>
        ))}
    </div>
  );
};

export default Decision;
