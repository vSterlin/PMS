import React, { useEffect, useState } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import db from "../../firebase";
import styled from "styled-components";
import { CircleWithPlus } from "@styled-icons/entypo";
import Loading from "../Loading";
const TaskCard = styled.div`
  width: 50%;
  border-bottom: 1px grey solid;
  margin: 0 auto;
  padding: 10px;
  color: #6a6a6a;
  & > * {
    margin: 10px 0;
  }
`;

const TaskName = styled.h3`
  font-weight: normal;
`;

const TaskDescription = styled.h4`
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
      <ButtonWrapper>
        <Link to="/tasks/create">
          {/* <button> */}
          <div>
            <StyledIcon />
            New Task
          </div>
          {/* </button> */}
        </Link>
      </ButtonWrapper>
      {!tasks && <Loading />}
      {tasks && tasks.length === 0 && (
        <p style={{ textAlign: "center" }}>Currently there are no tasks</p>
      )}
      {tasks &&
        tasks.map((task) => (
          <TaskCard>
            <TaskName>Task Name - {task.name}</TaskName>
            <TaskDescription>
              Task Description - {task.description} ***TEMPORARY ID DISPLAY{" "}
              {task.id}
            </TaskDescription>
            <DetailsLink>Details</DetailsLink>
          </TaskCard>
        ))}
    </div>
  );
};

export default Task;
