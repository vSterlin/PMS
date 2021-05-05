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
  StyledIcon,GanttButtonWrapper
} from "../Reusable/ListItems";
import { BarChartSteps } from "@styled-icons/bootstrap";
import styled from "styled-components";

const StyledGraphIcon = styled(BarChartSteps)`
  height: 20px;
  margin-right: 10px;
`;

const Task = () => {
  const [tasks, setTasks] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await db.collection("tasks").get();

      setTasks(
        res.docs.map((task) => ({
          ...task.data(),
          id: task.id,
        }))
      );
    };
    fetchData();
  }, []);
  return (
    <div style={{ position: "relative" }}>
      <Header>Tasks</Header>
      <GanttButtonWrapper>

      <Link to="/tasks/gantt" style={{ marginRight: "10px" }}>
          <div>
            <StyledGraphIcon />
            View Gantt Chart
          </div>
        </Link>
      </GanttButtonWrapper>
      <ButtonWrapper>

        <Link to="/tasks/create">
          <div>
            <StyledIcon />
            New Task
          </div>
        </Link>
      </ButtonWrapper>
      {!tasks && <Loading />}
      {tasks && tasks.length === 0 && (
        <p style={{ textAlign: "center" }}>Currently there are no tasks</p>
      )}
      {tasks &&
        tasks.map((task) => (
          <ItemCard>
            <ItemName>Task Name - {task.name}</ItemName>
            <ItemDescription>
              Task Description - {task.description} ***TEMPORARY ID DISPLAY{" "}
              {task.id}
            </ItemDescription>
            <DetailsLink to={`/tasks/${task.id}`}>Details</DetailsLink>
          </ItemCard>
        ))}
    </div>
  );
};

export default Task;
