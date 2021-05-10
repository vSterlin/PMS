import React from "react";

import styled from "styled-components";

const StyledSorter = styled.div`
  margin: 10px 0;
  margin-left: 20px;
`;

const Sorting = ({ setOrder, setSort }) => {
  return (
    <StyledSorter>
      Sort By:{" "}
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="name">Name</option>
      </select>{" "}
      Order:{" "}
      <select onChange={(e) => setOrder(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </StyledSorter>
  );
};

export default Sorting;
