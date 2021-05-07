import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Header from "../Reusable/Header";
import db from "../../firebase";
import {  useHistory } from "react-router";
import {
  StyledForm,
  StyledInput,
  StyledSelect,
  StyledTextArea,
} from "../Reusable/Form";

const Form = () => {
  const history = useHistory();
  const [resources, setResources] = useState([]);
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
    };

    fetchData();
  }, []);

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
    onSubmit: async (values) => {
      if (values.resourceAssigned !== "") {
        values.resourceAssigned = db.doc(
          `resources/${values.resourceAssigned}/`
        );
      }
      if (values.predecessorTask !== "") {
        values.predecessorTask = db.doc(`tasks/${values.predecessorTask}/`);
      }
      if (values.successorTask !== "") {
        values.successorTask = db.doc(`tasks/${values.successorTask}/`);
      }
      // const res = await db.collection("tasks").add(values);
      await db.collection("tasks").add(values);

      history.push("/tasks");
    },
  });

  return (
    <div>
      <Header>Create New Task</Header>
      <StyledForm onSubmit={formik.handleSubmit}>
        <div>
          <StyledInput
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            name="name"
          />
        </div>
        <div>
          <StyledInput
            placeholder="Task Type"
            value={formik.values.type}
            onChange={formik.handleChange}
            name="type"
          />
        </div>

        <div>
          <StyledTextArea
            placeholder="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            name="description"
          ></StyledTextArea>
        </div>
        <div>
          <StyledSelect
            value={formik.values.resourceAssigned}
            onChange={formik.handleChange}
            name="resourceAssigned"
          >
            <option value="" label="Resource Assigned" />
            {resources.map((resource) => (
              <option value={resource.id} label={resource.name} />
            ))}
          </StyledSelect>
        </div>
        <div>
          <StyledInput
            placeholder="Expected Start Date (mm/dd/yy)"
            value={formik.values.expectedStartDate}
            onChange={formik.handleChange}
            name="expectedStartDate"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
          <StyledInput
            placeholder="Expected End Date (mm/dd/yy)"
            value={formik.values.expectedEndDate}
            onChange={formik.handleChange}
            name="expectedEndDate"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </div>

        <div>
          <StyledInput
            placeholder="Expected Duration"
            value={formik.values.expectedDuration}
            onChange={formik.handleChange}
            name="expectedDuration"
          />
        </div>
        <div>
          <StyledInput
            placeholder="Expected Effort"
            value={formik.values.expectedEffort}
            onChange={formik.handleChange}
            name="expectedEffort"
          />
        </div>
        <div>
          <StyledInput
            placeholder="Actual Start Date (mm/dd/yy)"
            value={formik.values.actualStartDate}
            onChange={formik.handleChange}
            name="actualStartDate"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
          <StyledInput
            placeholder="Actual End Date (mm/dd/yy)"
            value={formik.values.actualEndDate}
            onChange={formik.handleChange}
            name="actualEndDate"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </div>

        <div>
          <StyledInput
            placeholder="Actual Duration"
            value={formik.values.actualDuration}
            onChange={formik.handleChange}
            name="actualDuration"
          />
        </div>
        <div>
          <StyledInput
            placeholder="Effort Completed"
            value={formik.values.effortCompleted}
            onChange={formik.handleChange}
            name="effortCompleted"
          />
        </div>
        <div>
          <StyledInput
            placeholder="Actual Effort"
            value={formik.values.actualEffort}
            onChange={formik.handleChange}
            name="actualEffort"
          />
        </div>

        <div>
          <StyledInput
            placeholder="Percent Completed"
            value={formik.values.percentComplete}
            onChange={formik.handleChange}
            name="percentComplete"
          />
        </div>

        <div>
          <StyledSelect
            value={formik.values.predecessorTask}
            onChange={formik.handleChange}
            name="predecessorTask"
          >
            <option value="" label="Predecessor Tasks" />
            {tasks.map((task) => (
              <option value={task.id} label={task.name} />
            ))}
          </StyledSelect>
        </div>

        <div>
          <StyledSelect
            value={formik.values.successorTask}
            onChange={formik.handleChange}
            name="successorTask"
          >
            <option value="" label="Successor Tasks" />
            {tasks.map((task) => (
              <option value={task.id} label={task.name} />
            ))}
          </StyledSelect>
        </div>

        <div>
          <StyledSelect
            value={formik.values.issues}
            onChange={formik.handleChange}
            name="issues"
          >
            <option value="" label="List of Issues" />
            {issues.map((issue) => (
              <option value={issue.id} label={issue.name} />
            ))}
          </StyledSelect>
        </div>

        <div>
          <StyledSelect
            value={formik.values.decisions}
            onChange={formik.handleChange}
            name="decisions"
          >
            <option value="" label="List of Decisions" />
            {decisions.map((decision) => (
              <option value={decision.id} label={decisions.name} />
            ))}
          </StyledSelect>
        </div>

        <div>
          <button>Submit</button>
        </div>
      </StyledForm>
    </div>
  );
};

export default Form;
