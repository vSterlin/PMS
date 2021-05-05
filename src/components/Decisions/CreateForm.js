import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Header from "../Reusable/Header";
import db from "../../firebase";
import { Router, useHistory } from "react-router";
import * as Yup from "yup";
import {
  StyledForm,
  StyledInput,
  StyledInputWrapper,
  StyledSelect,
  StyledTextArea,
} from "../Reusable/Form";

const validationSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  priority: Yup.string().required(),
  impact: Yup.string().required(),
  dateNeeded: Yup.string().required(),
  expectedCompletionDate: Yup.string().required(),
  // actualCompletionDate: Yup.string().required(),
  // meetingNotes: Yup.string().required(),
  status: Yup.string().required(),
  // referenceDo
});

const Form = () => {
  const history = useHistory();

  const [priorities, setPriorities] = useState([]);
  const [impacts, setImpacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const priorities = await db
        .collection("lists")
        .where("name", "==", "priority")
        .get();
      setPriorities(priorities.docs[0].data().values);

      const impacts = await db
        .collection("lists")
        .where("name", "==", "impact")
        .get();
      setImpacts(impacts.docs[0].data().values);
    };

    fetchData();
  }, []);

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
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const res = await db.collection("decisions").add(values);
      history.push("/decisions");
    },
  });

  const { errors } = formik;
  {
    console.log(errors);
  }
  return (
    <div>
      <Header>Create New Decision</Header>
      <StyledForm onSubmit={formik.handleSubmit}>
        <StyledInputWrapper error={!!errors.name}>
          <StyledInput
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            name="name"
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
        <StyledInputWrapper error={!!errors.priority}>
          <StyledSelect
            value={formik.values.priority}
            onChange={formik.handleChange}
            name="priority"
          >
            <option value="" label="Priority" />
            {priorities.map((priority) => (
              <option value={priority} label={priority} />
            ))}
          </StyledSelect>
        </StyledInputWrapper>

        <StyledInputWrapper error={!!errors.impact}>
          <StyledSelect
            value={formik.values.impact}
            onChange={formik.handleChange}
            name="impact"
          >
            <option value="" label="Impact" />
            {impacts.map((impact) => (
              <option value={impact} label={impact} />
            ))}
          </StyledSelect>
        </StyledInputWrapper>
        <StyledInputWrapper error={!!errors.dateNeeded}>
          <StyledInput
            placeholder="Date Needed (mm/dd/yy)"
            value={formik.values.dateNeeded}
            onChange={formik.handleChange}
            name="dateNeeded"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </StyledInputWrapper>

        <StyledInputWrapper error={!!errors.expectedCompletionDate}>
          <StyledInput
            placeholder="Expected Completion Date (mm/dd/yy)"
            value={formik.values.expectedCompletionDate}
            onChange={formik.handleChange}
            name="expectedCompletionDate"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </StyledInputWrapper>
        <StyledInputWrapper error={!!errors.actualCompletionDate}>
          <StyledInput
            placeholder="Actual Completion Date (mm/dd/yy)"
            value={formik.values.actualCompletionDate}
            onChange={formik.handleChange}
            name="actualCompletionDate"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </StyledInputWrapper>

        <StyledInputWrapper error={!!errors.meetingNotes}>
          <StyledInput
            placeholder="List of Meeting Notes"
            value={formik.values.meetingNotes}
            onChange={formik.handleChange}
            name="meetingNotes"
          />
        </StyledInputWrapper>
        <StyledInputWrapper error={!!errors.status}>
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
        </StyledInputWrapper>

        <div>
          <button>Submit</button>
        </div>
      </StyledForm>
    </div>
  );
};

export default Form;
