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

  

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      priority: "",
      impact: "",
      dateNeeded: "",
      expectedCompletionDate: "",
      actualCompletionDate: "",
      meetingNotes: "",
      status: "",
      // referenceDocument: "",
    },
    onSubmit: async (values) => {
      const res = await db.collection("decisions").add(values);
      history.push("/decisions");
    },
  });

  return (
    <div>
      <Header>Create New Decision</Header>
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
        </div>
        <div>
          <StyledInput
            placeholder="Impact"
            value={formik.values.impact}
            onChange={formik.handleChange}
            name="impact"
          />
        </div>
        <div>
          <StyledInput
            placeholder="Date Needed (mm/dd/yy)"
            value={formik.values.dateNeeded}
            onChange={formik.handleChange}
            name="dateNeeded"
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
            placeholder="List of Meeting Notes"
            value={formik.values.meetingNotes}
            onChange={formik.handleChange}
            name="meetingNotes"
          />
        </div>
        <div>
          <StyledInput
            placeholder="Status"
            value={formik.values.status}
            onChange={formik.handleChange}
            name="status"
          />
          <StyledInput
            placeholder="List of Reference Documents (Not part of the project)"
            value={formik.values.referenceDocument}
            onChange={formik.handleChange}
            name="referenceDocument"
            disabled
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
