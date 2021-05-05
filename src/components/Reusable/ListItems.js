import { Link } from "react-router-dom";
import styled from "styled-components";
import { CircleWithPlus } from "@styled-icons/entypo";

const ItemCard = styled.div`
  width: 50%;
  border-bottom: 1px grey solid;
  margin: 0 auto;
  padding: 10px;
  color: #6a6a6a;
  & > * {
    margin: 10px 0;
  }
`;

const ItemName = styled.h3`
  font-weight: normal;
`;

const ItemDescription = styled.h4`
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

const GanttButtonWrapper = styled.div`
  position: absolute;
  left: 10%;
  display: flex;
  & > * {
    &:hover {
      opacity: 0.6;
    }
  }
  transition: all 0.1 linear;
`;

const StyledIcon = styled(CircleWithPlus)`
  height: 20px;
  margin-right: 10px;
`;

export {
  ItemCard,
  ItemName,
  ItemDescription,
  DetailsLink,
  ButtonWrapper,
  StyledIcon,
  GanttButtonWrapper
};
