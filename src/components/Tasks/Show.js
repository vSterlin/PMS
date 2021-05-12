import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import db from "../../firebase";
import Header from "../Reusable/Header";
import { Item, ItemDetail, Bolder, Button } from "../Reusable/ShowItem";
import { DetailsLink } from "../Reusable/ListItems";

const ShowTask = () => {
  const history = useHistory();
  const [task, setTask] = useState(null);
  const [predecessorTask, setPredecessorTask] = useState("");
  const [successorTask, setSuccessorTask] = useState("");
  const [resourceAssigned, setResourceAssigned] = useState("");
  const [issues, setIssues] = useState("");
  const [decisions, setDecisions] = useState("");

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      const res = await db.collection("tasks").doc(id).get();
      setTask({ ...res.data(), id: res.id });
      if (res.data().predecessorTask) {
        const predecessorTask = await res.data().predecessorTask.get();
        setPredecessorTask({
          ...predecessorTask.data(),
          id: predecessorTask.id,
        });
      }
      if (res.data().successorTask) {
        const successorTask = await res.data().successorTask.get();
        setSuccessorTask({ ...successorTask.data(), id: successorTask.id });
      }
      if (res.data().resourceAssigned) {
        const resourceAssigned = await res.data().resourceAssigned.get();
        setResourceAssigned({
          ...resourceAssigned.data(),
          id: resourceAssigned.id,
        });
      }

      if (res.data().issues) {
        const issues = await res.data().issues.get();
        setIssues({ ...issues.data(), id: issues.id });
      }
      if (res.data().decisions) {
        const decisions = await res.data().decisions.get();
        setDecisions({ ...decisions.data(), id: decisions.id });
      }
    };
    fetchData();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const deleteTask = async () => {
    await db.collection("tasks").doc(id).delete();
    history.push("/tasks");
  };
  return (
    <div>
      {task && (
        <>
          <Header>{task.name}</Header>
          <Item>
            <ItemDetail>
              <Bolder>Unique ID: </Bolder> {task.id}
            </ItemDetail>

            <ItemDetail>
              <Bolder>Name: </Bolder> {task.name}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Type: </Bolder>
              {task.type}
            </ItemDetail>

            <ItemDetail>
              <Bolder>Description: </Bolder>
              {task.description}
            </ItemDetail>
            <ItemDetail>
              <Bolder>Resource: </Bolder>

              {(resourceAssigned && (
                <DetailsLink to={`/resources/${resourceAssigned.id}`}>
                  {resourceAssigned.name}
                </DetailsLink>
              )) ||
                "Doesn't exist"}
            </ItemDetail>

            <ItemDetail>
              <Bolder>Expected Start Date: </Bolder>
              {task.expectedStartDate}
            </ItemDetail>

            <ItemDetail>
              <Bolder>Expected End Date: </Bolder>
              {task.actualEndDate}
            </ItemDetail>

            <ItemDetail>
              <Bolder>Expected Duration: </Bolder>
              {task.expectedDuration}
            </ItemDetail>

            <ItemDetail>
              <Bolder>Expected Effort: </Bolder>
              {task.expectedEffort}
            </ItemDetail>

            <ItemDetail>
              <Bolder>Actual Start Date: </Bolder>
              {task.actualStartDate}
            </ItemDetail>

            <ItemDetail>
              <Bolder>Actual End Date: </Bolder>
              {task.actualEndDate}
            </ItemDetail>

            <ItemDetail>
              <Bolder>Actual Duration: </Bolder>
              {task.actualDuration}
            </ItemDetail>

            <ItemDetail>
              <Bolder>Effort Completed: </Bolder>
              {task.effortCompleted}
            </ItemDetail>

            <ItemDetail>
              <Bolder>Actual Effort: </Bolder>
              {task.actualEffort}
            </ItemDetail>

            <ItemDetail>
              <Bolder>Percent Completed: </Bolder>
              {task.percentComplete}%
            </ItemDetail>

            <ItemDetail>
              <Bolder>Predecessor Task: </Bolder>
              {(predecessorTask && (
                <DetailsLink to={`/tasks/${predecessorTask.id}`}>
                  {predecessorTask.name}
                </DetailsLink>
              )) ||
                "Doesn't exist"}
            </ItemDetail>

            <ItemDetail>
              <Bolder>Successor Task: </Bolder>
              {(successorTask && <DetailsLink  to={`/tasks/${successorTask.id}`} >{successorTask.name}</DetailsLink>) ||
                "Doesn't exist"}
            </ItemDetail>

            <ItemDetail>
              <Bolder>List of Issues: </Bolder>
              {(issues && (
                <DetailsLink to={`/issues/${issues.id}`}>
                  {issues.name}
                </DetailsLink>
              )) ||
                "Doesn't exist"}
            </ItemDetail>

            <ItemDetail>
              <Bolder>List of Decisions: </Bolder>
              {(decisions && (
                <DetailsLink to={`/decisions/${decisions.id}`}>
                  {decisions.name}
                </DetailsLink>
              )) ||
                "Doesn't exist"}
            </ItemDetail>

            <Link to={`/tasks/${task.id}/edit`}>
              <Button darker>Edit</Button>
            </Link>
            <Button onClick={deleteTask}>Delete</Button>
          </Item>
        </>
      )}
    </div>
  );
};

export default ShowTask;
