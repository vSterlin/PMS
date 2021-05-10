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
  StyledIcon,
  ButtonWrapper,
} from "../Reusable/ListItems";

import Sorting from "./Sorting";

const Deliverable = () => {
  const [deliverables, setDeliverables] = useState(null);
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      const res = await db
        .collection("deliverables")
        .orderBy(sort, order)
        .get();

      setDeliverables(
        res.docs.map((deliverable) => ({
          ...deliverable.data(),
          id: deliverable.id,
        }))
      );
    };
    fetchData();
  }, [sort, order]);

  return (
    <div style={{ position: "relative" }}>
      <Header>Deliverables</Header>
      <Sorting setOrder={setOrder} setSort={setSort} />

      <ButtonWrapper>
        <Link to="/deliverables/create">
          {/* <button> */}
          <div>
            <StyledIcon />
            New Deliverable
          </div>
          {/* </button> */}
        </Link>
      </ButtonWrapper>
      {!deliverables && <Loading />}
      {deliverables && deliverables.length === 0 && (
        <p style={{ textAlign: "center" }}>
          Currently there are no deliverables
        </p>
      )}
      {deliverables &&
        deliverables.map((deliverable) => (
          <ItemCard>
            <ItemName>Deliverable Name - {deliverable.name}</ItemName>
            <ItemDescription>
              Deliverable Description - {deliverable.description} ***TEMPORARY
              ID DISPLAY {deliverable.id}
            </ItemDescription>
            <DetailsLink to={`/deliverables/${deliverable.id}`}>
              Details
            </DetailsLink>
          </ItemCard>
        ))}
    </div>
  );
};

export default Deliverable;
