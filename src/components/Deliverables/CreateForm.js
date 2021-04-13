import React from "react";
import { useFormik } from "formik";
import styled from "styled-components";
import Header from "../Header";
import db from "../../firebase";
import { Router, useHistory } from "react-router";

const StyledForm = styled.form`
  margin: 0 20px;
  margin-top: 20px;
  padding: 0 300px;
  /* text-align: center; */
  &> * > input, textarea {
   padding: 5px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  margin-bottom: 10px;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
  resize: none;
`;

const Form = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      date: "",
      requirement: "",
      task: "",
    },
    onSubmit: async (values) => {
      const res = await db.collection("deliverables").add(values);
      history.push("/deliverables");
    },
  });

  return (
    <div>
      <Header>Create New Deliverable</Header>
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
            placeholder="Due Date (mm/dd/yy)"
            value={formik.values.date}
            onChange={formik.handleChange}
            name="date"
          />
        </div>
        <div>
          <StyledInput
            placeholder="List of Requirements"
            value={formik.values.requirement}
            onChange={formik.handleChange}
            name="requirement"
          />
        </div>
        <div>
          <StyledInput
            placeholder="List of Tasks"
            value={formik.values.task}
            onChange={formik.handleChange}
            name="task"
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
