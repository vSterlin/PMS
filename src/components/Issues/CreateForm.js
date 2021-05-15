import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Header from "../Reusable/Header";
import db from "../../firebase";
import { useHistory } from "react-router";
import {
  StyledForm,
  StyledInput,
  StyledInputWrapper,
  StyledSelect,
  StyledTextArea,
} from "../Reusable/Form";

import * as Yup from "yup";
import { Button } from "../Reusable/ShowItem";

const validationSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  resourceAssigned: Yup.mixed().oneOf([
    Yup.string().required(),
    Yup.object().required(),
  ]),
  priority: Yup.string().required(),
  severity: Yup.string().required(),
  dateAssigned: Yup.string().required(),
  expectedCompletionDate: Yup.string().required(),
  status: Yup.string().required(),
  // actionItem: "",
  // decision: "",
});


const Form = () => {
  const history = useHistory();
  const [actionItems, setActionItems] = useState([]);

  const [decisions, setDecisions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const actionItems = await db.collection("action-items").get();
      setActionItems(
        actionItems.docs.map((actionItem) => ({
          ...actionItem.data(),
          id: actionItem.id,
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
    validationSchema,
    onSubmit: async (values) => {
      // const res = await db.collection("issues").add(values);
      if (values.decision !== "") {
        values.decision = db.doc(`decisions/${values.decision}/`);
      }
      if (values.actionItem !== "") {
        values.actionItem = db.doc(`action-item/${values.actionItem}/`);
      }

      await db.collection("issues").add(values);
      history.push("/issues");
    },
  });

  const { errors } = formik;

  return (
    <div>
      <Header>Create New Issue</Header>
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
          <StyledInput
            placeholder="Priority"
            value={formik.values.priority}
            onChange={formik.handleChange}
            name="priority"
          />
        </StyledInputWrapper>
        <StyledInputWrapper error={!!errors.severity}>
          <StyledInput
            placeholder="Severity"
            value={formik.values.severity}
            onChange={formik.handleChange}
            name="severity"
          />
        </StyledInputWrapper>
        <StyledInputWrapper error={!!errors.dateAssigned}>
          <StyledInput
            placeholder="Date Assigned (mm/dd/yy)"
            value={formik.values.dateAssigned}
            onChange={formik.handleChange}
            name="dateAssigned"
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

        <StyledInputWrapper error={!!errors.status}>
          <StyledInput
            placeholder="Status"
            value={formik.values.status}
            onChange={formik.handleChange}
            name="status"
          />
        </StyledInputWrapper>

        <StyledInputWrapper error={!!errors.actionItem}>
          <StyledSelect
            value={formik.values.actionItem}
            onChange={formik.handleChange}
            name="actionItem"
          >
            <option value="" label="List of Action Items" />
            {actionItems.map((actionItem) => (
              <option value={actionItem.id} label={actionItem.name} />
            ))}
          </StyledSelect>
        </StyledInputWrapper>

        <StyledInputWrapper error={!!errors.decision}>
          <StyledSelect
            value={formik.values.decision}
            onChange={formik.handleChange}
            name="decision"
          >
            <option value="" label="List of Decisions" />
            {decisions.map((decision) => (
              <option value={decision.id} label={decision.name} />
            ))}
          </StyledSelect>
        </StyledInputWrapper>

        <div>
          <Button darker type="submit">Submit</Button>
        </div>
      </StyledForm>
    </div>
  );
};

export default Form;
