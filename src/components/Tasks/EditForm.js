import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Header from "../Reusable/Header";
import db from "../../firebase";
import { useHistory, useParams } from "react-router";
import {
  StyledForm,
  StyledInput,
  StyledInputWrapper,
  StyledSelect,
  StyledTextArea,
} from "../Reusable/Form";

import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required(),

  type: Yup.string().required(),
  description: Yup.string().required(),
  resourceAssigned: Yup.mixed().oneOf([
    Yup.string().required(),
    Yup.object().required(),
  ]),
  expectedStartDate: Yup.string().required(),
  expectedEndDate: Yup.string().required(),
  expectedDuration: Yup.string().required(),
  expectedEffort: Yup.string().required(),
  // actualStartDate: "",
  // actualEndDate: "",
  // actualDuration: "",
  // effortCompleted: "",
  // actualEffort: "",
  // percentComplete: Yup.string().required(),
  // predecessorTask: "",
  // successorTask: "",
  // issues: "",
  // decisions: "",
});

const Form = () => {
  const history = useHistory();
  const { id } = useParams();

  const [resources, setResources] = useState([]);
  const [resourceAssigned, setResourceAssigned] = useState(null);

  const [task, setTask] = useState(null);

  const [predecessorTask, setPredecessorTask] = useState(null);
  const [successorTask, setSuccessorTask] = useState(null);

  const [issue, setIssue] = useState(null);
  const [decision, setDecision] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [issues, setIssues] = useState([]);
  const [decisions, setDecisions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resources = await db.collection("resources").get();
      setResources(
        resources.docs.map((resource) => ({
          ...resource.data(),
          id: resource.id,
        }))
      );
      const tasks = await db.collection("tasks").get();
      setTasks(
        tasks.docs.map((task) => ({
          ...task.data(),
          id: task.id,
        }))
      );
      const issues = await db.collection("issues").get();
      setIssues(
        issues.docs.map((issue) => ({
          ...issue.data(),
          id: issue.id,
        }))
      );
      const decisions = await db.collection("decisions").get();
      setDecisions(
        decisions.docs.map((decision) => ({
          ...decision.data(),
          id: decision.id,
        }))
      );

      const taskDoc = await db.collection("tasks").doc(id).get();
      const task = taskDoc.data();
      setTask(task);
      formik.setValues(task);

      if (task.resourceAssigned !== "") {
        const res = await task.resourceAssigned.get();
        const resourceAssigned = res.data();
        setResourceAssigned(resourceAssigned);
      }

      if (task.issues !== "") {
        const res = await task.issues.get();
        const issue = res.data();

        setIssue(issue);
      }

      if (task.decisions !== "") {
        const res = await task.decisions.get();
        const decision = res.data();
        setDecision(decision);
      }

      if (task.predecessorTask !== "") {
        const res = await task.predecessorTask.get();
        const predecessorTask = res.data();
        setPredecessorTask(predecessorTask);
      }
      if (task.successorTask !== "") {
        const res = await task.successorTask.get();
        const successorTask = res.data();
        setSuccessorTask(successorTask);
      }
    };

    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      description: "",
      resourceAssigned: "",
      expectedStartDate: "",
      expectedEndDate: "",
      expectedDuration: "",
      expectedEffort: "",
      actualStartDate: "",
      actualEndDate: "",
      actualDuration: "",
      effortCompleted: "",
      actualEffort: "",
      percentComplete: "",
      predecessorTask: "",
      successorTask: "",
      issues: "",
      decisions: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      if (
        values.resourceAssigned !== "" &&
        typeof values.resourceAssigned !== "object"
      ) {
        values.resourceAssigned = db.doc(
          `resources/${values.resourceAssigned}/`
        );
      }
      if (
        values.predecessorTask !== "" &&
        typeof values.predecessorTask !== "object"
      ) {
        values.predecessorTask = db.doc(`tasks/${values.predecessorTask}/`);
      }
      if (
        values.successorTask !== "" &&
        typeof values.successorTask !== "object"
      ) {
        values.successorTask = db.doc(`tasks/${values.successorTask}/`);
      }

      if (values.issues !== "" && typeof values.issues !== "object") {
        values.issues = db.doc(`issues/${values.issues}/`);
      }
      if (values.decisions !== "" && typeof values.decisions !== "object") {
        values.decisions = db.doc(`decisions/${values.decisions}/`);
      }
      if (!values.percentComplete) {
        values.percentComplete = "0";
      }

      await db.collection("tasks").doc(id).set(values);

      history.push("/tasks");
    },
  });

  const { errors } = formik;
  return (
    <>
      {task && (
        <div>
          <Header>Edit {task.name} Task</Header>
          <StyledForm onSubmit={formik.handleSubmit}>
            <StyledInputWrapper error={!!errors.name}>
              <StyledInput
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                name="name"
              />
            </StyledInputWrapper>
            <StyledInputWrapper error={!!errors.type}>
              <StyledInput
                placeholder="Task Type"
                value={formik.values.type}
                onChange={formik.handleChange}
                name="type"
              />
            </StyledInputWrapper>

            <StyledInputWrapper error={!!errors.description}>
              <StyledTextArea
                placeholder="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                name="description"
              ></StyledTextArea>
            </StyledInputWrapper>
            <StyledInputWrapper error={!!errors.resourceAssigned}>
              <StyledSelect
                value={formik.values.resourceAssigned}
                onChange={formik.handleChange}
                name="resourceAssigned"
              >
                {resourceAssigned && (
                  <option
                    value={resourceAssigned.id}
                    label={resourceAssigned.name}
                  />
                )}
                <option value="" label="Resource Assigned" />
                {resources.map((resource) => (
                  <option value={resource.id} label={resource.name} />
                ))}
              </StyledSelect>
            </StyledInputWrapper>
            <StyledInputWrapper error={!!errors.expectedStartDate}>
              <StyledInput
                placeholder="Expected Start Date (mm/dd/yy)"
                value={formik.values.expectedStartDate}
                onChange={formik.handleChange}
                name="expectedStartDate"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </StyledInputWrapper>
            <StyledInputWrapper error={!!errors.expectedEndDate}>
              <StyledInput
                placeholder="Expected End Date (mm/dd/yy)"
                value={formik.values.expectedEndDate}
                onChange={formik.handleChange}
                name="expectedEndDate"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </StyledInputWrapper>

            <StyledInputWrapper error={!!errors.expectedDuration}>
              <StyledInput
                placeholder="Expected Duration"
                value={formik.values.expectedDuration}
                onChange={formik.handleChange}
                name="expectedDuration"
              />
            </StyledInputWrapper>
            <StyledInputWrapper error={!!errors.expectedEffort}>
              <StyledInput
                placeholder="Expected Effort"
                value={formik.values.expectedEffort}
                onChange={formik.handleChange}
                name="expectedEffort"
              />
            </StyledInputWrapper>
            <StyledInputWrapper error={!!errors.actualStartDate}>
              <StyledInput
                placeholder="Actual Start Date (mm/dd/yy)"
                value={formik.values.actualStartDate}
                onChange={formik.handleChange}
                name="actualStartDate"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </StyledInputWrapper>
            <StyledInputWrapper error={!!errors.actualEndDate}>
              <StyledInput
                placeholder="Actual End Date (mm/dd/yy)"
                value={formik.values.actualEndDate}
                onChange={formik.handleChange}
                name="actualEndDate"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </StyledInputWrapper>

            <StyledInputWrapper error={!!errors.actualDuration}>
              <StyledInput
                placeholder="Actual Duration"
                value={formik.values.actualDuration}
                onChange={formik.handleChange}
                name="actualDuration"
              />
            </StyledInputWrapper>
            <StyledInputWrapper error={!!errors.effortCompleted}>
              <StyledInput
                placeholder="Effort Completed"
                value={formik.values.effortCompleted}
                onChange={formik.handleChange}
                name="effortCompleted"
              />
            </StyledInputWrapper>
            <StyledInputWrapper error={!!errors.actualEffort}>
              <StyledInput
                placeholder="Actual Effort"
                value={formik.values.actualEffort}
                onChange={formik.handleChange}
                name="actualEffort"
              />
            </StyledInputWrapper>

            <StyledInputWrapper error={!!errors.percentComplete}>
              <StyledInput
                placeholder="Percent Completed"
                value={formik.values.percentComplete}
                onChange={formik.handleChange}
                name="percentComplete"
              />
            </StyledInputWrapper>

            <StyledInputWrapper error={!!errors.predecessorTask}>
              <StyledSelect
                value={formik.values.predecessorTask}
                onChange={formik.handleChange}
                name="predecessorTask"
              >
                {predecessorTask && (
                  <option
                    value={predecessorTask.id}
                    label={predecessorTask.name}
                  />
                )}

                <option value="" label="Predecessor Tasks" />
                {tasks.map((task) => (
                  <option value={task.id} label={task.name} />
                ))}
              </StyledSelect>
            </StyledInputWrapper>

            <StyledInputWrapper error={!!errors.successorTask}>
              <StyledSelect
                value={formik.values.successorTask}
                onChange={formik.handleChange}
                name="successorTask"
              >
                {successorTask && (
                  <option value={successorTask.id} label={successorTask.name} />
                )}
                {console.log(successorTask)}

                <option value="" label="Successor Tasks" />
                {tasks.map((task) => (
                  <option value={task.id} label={task.name} />
                ))}
              </StyledSelect>
            </StyledInputWrapper>

            <StyledInputWrapper error={!!errors.issues}>
              <StyledSelect
                value={formik.values.issues}
                onChange={formik.handleChange}
                name="issues"
              >
                {issue && <option value={issue.id} label={issue.name} />}
                <option value="" label="List of Issues" />
                {issues.map((issue) => (
                  <option value={issue.id} label={issue.name} />
                ))}
              </StyledSelect>
            </StyledInputWrapper>

            <StyledInputWrapper error={!!errors.decisions}>
              <StyledSelect
                value={formik.values.decisions}
                onChange={formik.handleChange}
                name="decisions"
              >
                {decision && (
                  <option value={decision.id} label={decision.name} />
                )}

                <option value="" label="List of Decisions" />
                {decisions.map((decision) => (
                  <option value={decision.id} label={decision.name} />
                ))}
              </StyledSelect>
            </StyledInputWrapper>

            <div>
              <button type="submit">Submit</button>
            </div>
          </StyledForm>
        </div>
      )}
    </>
  );
};

export default Form;
