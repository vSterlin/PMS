import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Header from "../Reusable/Header";
import db from "../../firebase";
import { Router, useHistory } from "react-router";
import {
  StyledForm,
  StyledInput,
  StyledSelect,
  StyledTextArea,
} from "../Reusable/Form";

const Form = () => {
  const history = useHistory();
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const issues = await db.collection("issues").get();
      setIssues(
        issues.docs.map((issue) => ({
          ...issue.data(),
          id: issue.id,
        }))
      );
    };

    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      priority: "",
      severity: "",
      dateAssigned: "",
      expectedCompletionDate: "",
      actualCompletionDate: "",
      status: "",
      actionItem: "",
      decision: "",
    },
    onSubmit: async (values) => {
      const res = await db.collection("issues").add(values);
      history.push("/issues");
    },
  });

  return (
    <div>
      <Header>Create New Issue</Header>
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
          <StyledTextArea
            placeholder="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            name="description"
          ></StyledTextArea>
        </div>
        <div>
          <StyledInput
            placeholder="Priority"
            value={formik.values.priority}
            onChange={formik.handleChange}
            name="priority"
          />
          <StyledInput
            placeholder="Severity"
            value={formik.values.severity}
            onChange={formik.handleChange}
            name="severity"
          />

          <StyledInput
            placeholder="Date Assigned (mm/dd/yy)"
            value={formik.values.dateAssigned}
            onChange={formik.handleChange}
            name="dateAssigned"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </div>

        <div>
          <StyledInput
            placeholder="Expected Completion Date (mm/dd/yy)"
            value={formik.values.expectedCompletionDate}
            onChange={formik.handleChange}
            name="expectedCompletionDate"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </div>

        <div>
          <StyledInput
            placeholder="Actual Completion Date (mm/dd/yy)"
            value={formik.values.actualCompletionDate}
            onChange={formik.handleChange}
            name="actualCompletionDate"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </div>

        <div>
          <StyledInput
            placeholder="Status"
            value={formik.values.status}
            onChange={formik.handleChange}
            name="status"
          />
        </div>
        <div>
          <StyledInput
            placeholder="List of Action Items"
            value={formik.values.actionItem}
            onChange={formik.handleChange}
            name="actionItem"
          />
        </div>
        <div>
          <StyledInput
            placeholder="List of Decisions"
            value={formik.values.decision}
            onChange={formik.handleChange}
            name="decision"
          />
        </div>

        <div>
          <button>Submit</button>
        </div>
      </StyledForm>
    </div>
  );
};

export default Form;
