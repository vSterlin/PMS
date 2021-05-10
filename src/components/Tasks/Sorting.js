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
        <option value="expectedStartDate">Expected Start Date</option>
        <option value="expectedEndDate">Expected End Date</option>
        <option value="expectedEffort">Expected Effort</option>
        <option value="effortCompleted">Effort Completed</option>
        <option value="percentComplete">Percent Complete</option>
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
