import React  from "react";
import { useFormik } from "formik";
import Header from "../Reusable/Header";
import db from "../../firebase";
import {  useHistory } from "react-router";
import * as Yup from "yup";
import {
  StyledForm,
  StyledInput,
  StyledInputWrapper,
  StyledSelect,
} from "../Reusable/Form";
// import styled from "styled-components";

// const Error = styled.span`
//   font-size: 0.5em;
//   color: red;
// `;

const validationSchema = Yup.object({
  name: Yup.string().required(),
  title: Yup.string().required(),
  // skill: Yup.string().required(),
  availabilityCalendar: Yup.string().required(),
  payRate: Yup.string().required(),
});

const Form = () => {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: "",
      title: "",
      skill: "",
      availabilityCalendar: "",
      payRate: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    onSubmit: async (values) => {
      
      await db.collection("resources").add(values);
      history.push("/resources");
    },
  });

  const { errors } = formik;

  return (
    <div>
      {formik.errors !== {} && console.log(formik.errors)}
      <Header>Create New Resource</Header>
      <StyledForm onSubmit={formik.handleSubmit}>
        <StyledInputWrapper error={!!errors.name}>
          <StyledInput
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            name="name"
          />
        </StyledInputWrapper>
        <StyledInputWrapper error={!!errors.title}>
          <StyledInput
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            name="title"
          />
        </StyledInputWrapper>
        <StyledInputWrapper error={!!errors.skill}>
          <StyledSelect
            value={formik.values.skill}
            onChange={formik.handleChange}
            name="skill"
          >
            <option value="" label="List of Skills" />
            {/* {resources.map((resource) => (
              <option value={resource.id} label={resource.name} />
            ))} */}
          </StyledSelect>
        </StyledInputWrapper>

        <StyledInputWrapper error={!!errors.availabilityCalendar}>
          <StyledInput
            placeholder="Availabilty Calendar (mm/dd/yy)"
            value={formik.values.availabilityCalendar}
            onChange={formik.handleChange}
            name="availabilityCalendar"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </StyledInputWrapper>
        <StyledInputWrapper error={!!errors.payRate}>
          <StyledInput
            placeholder="Pay Rate"
            value={formik.values.payRate}
            onChange={formik.handleChange}
            name="payRate"
          />
        </StyledInputWrapper>

        <div>
          <button type="submit">Submit</button>
        </div>
      </StyledForm>
    </div>
  );
};

export default Form;
