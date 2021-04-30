import styled from "styled-components";

const Item = styled.div`
  padding: 10px 10%;

  color: #6a6a6a;
  & > * {
    margin: 20px 0;
  }
`;

const ItemDetail = styled.h3`
  font-weight: lighter;
`;

const Bolder = styled.span`
  font-weight: bolder;
`;

const Button = styled.button`
  padding: 8px 15px;
  background-color: ${({ darker }) => (darker ? "#393535" : "#989898")};
  color: #ffffff;
  border: none;
  border-radius: 5px;
  &:first-of-type {
    margin-right: 10px;
  }
  &:hover {
    opacity: 0.9;
  }
`;
export { Item, ItemDetail, Bolder, Button };
