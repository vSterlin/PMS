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
`;

const StyledInput = styled.input`
  width: 100%;
  margin-bottom: 10px;
`;

const Form = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
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
          <StyledInput
            placeholder="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            name="description"
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
