import React, { useEffect, useState } from "react";
import Header from "../Reusable/Header";
import { Link } from "react-router-dom";
import db from "../../firebase";

import Loading from "../Reusable/Loading";
import { ItemCard, ItemDescription, ItemName, DetailsLink, ButtonWrapper, StyledIcon } from "../Reusable/ListItems";


const ActionItem = () => {
  const [actionItems, setActionItems] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await db.collection("actionItems").get();

      setActionItems(
        res.docs.map((actionItem) => ({
          ...actionItem.data(),
          id: actionItem.id,
        }))
      );
    };
    fetchData();
  }, []);
  return (
    <div style={{ position: "relative" }}>
      <Header>Action Items</Header>
      <ButtonWrapper>
        <Link to="/action-items/create">
          {/* <button> */}
          <div>
            <StyledIcon />
            New Action Item
          </div>
          {/* </button> */}
        </Link>
      </ButtonWrapper>
      {!actionItems && <Loading />}
      {actionItems && actionItems.length === 0 && (
        <p style={{ textAlign: "center" }}>Currently there are no Action Items</p>
      )}
      {actionItems &&
        actionItems.map((actionItem) => (
          <ItemCard>
            <ItemName>Action Item Name - {actionItem.name}</ItemName>
            <ItemDescription>
              ActionItem Description - {actionItem.description} ***TEMPORARY ID DISPLAY{" "}
              {actionItem.id}
            </ItemDescription>
            <DetailsLink>Details</DetailsLink>
          </ItemCard>
        ))}
    </div>
  );
};

export default ActionItem;
