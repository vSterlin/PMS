import React, { useEffect, useState } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import db from "../../firebase";
import styled from "styled-components";
import { CircleWithPlus } from "@styled-icons/entypo";
const DeliverableCard = styled.div`
  width: 50%;
  border-bottom: 1px grey solid;
  margin: 0 auto;
  padding: 10px;
  color: #6a6a6a;
  & > * {
    margin: 10px 0;
  }
`;

const DeliverableName = styled.h3`
  font-weight: normal;
`;

const DeliverableDescription = styled.h4`
  font-weight: lighter;
`;

const DetailsLink = styled(Link)`
  text-decoration: underline;
  font-weight: bold;
  padding-right: 0;
  &:hover {
    opacity: 0.8;
  }
  transition: all 0.1 linear;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  right: 10%;
  display: flex;
  &:hover {
    opacity: 0.6;
  }
  transition: all 0.1 linear;
`;

const StyledIcon = styled(CircleWithPlus)`
  height: 20px;
  margin-right: 10px;
`;

const Deliverable = () => {
  const [deliverables, setDeliverables] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await db.collection("deliverables").get();

      setDeliverables(
        res.docs.map((deliverable) => ({
          ...deliverable.data(),
          id: deliverable.id,
        }))
      );
    };
    fetchData();
  }, []);
  return (
    <div style={{ position: "relative" }}>
      <Header>Deliverables</Header>
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
      {deliverables.length === 0 && (
        <p style={{ textAlign: "center" }}>
          Currently there are no deliverables
        </p>
      )}
      {deliverables.map((deliverable) => (
        <DeliverableCard>
          {console.log(deliverable)}
          <DeliverableName>
            Deliverable Name - {deliverable.name}
          </DeliverableName>
          <DeliverableDescription>
            Deliverable Description - {deliverable.description} ***TEMPORARY ID DISPLAY {deliverable.id}
          </DeliverableDescription>
          <DetailsLink>Details</DetailsLink>
        </DeliverableCard>
      ))}
    </div>
  );
};

export default Deliverable;
