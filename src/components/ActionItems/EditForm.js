import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Header from "../Reusable/Header";
import db from "../../firebase";
import { useHistory, useParams } from "react-router";
import {
  StyledForm,
  StyledInput,
  StyledSelect,
  StyledTextArea,
  StyledInputWrapper,
} from "../Reusable/Form";

import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  dateAssigned: Yup.string().required(),
  resourceAssigned: Yup.mixed().oneOf([
    Yup.string().required(),
    Yup.object().required(),
  ]),
  expectedCompletionDate: Yup.string().required(),
  status: Yup.string().required(),
});

const Form = () => {
  const history = useHistory();
  const { id } = useParams();

  const [actionItem, setActionItem] = useState(null);

  const [resources, setResources] = useState([]);
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resources = await db.collection("resources").get();
      setResources(
        resources.docs.map((resource) => ({
          ...resource.data(),
          id: resource.id,
        }))
      );

      const actionItemDoc = await db.collection("action-items").doc(id).get();
      const actionItem = actionItemDoc.data();
      setActionItem(actionItem);
      formik.setValues(actionItem);

      if (actionItem.resourceAssigned !== "") {
        const res = await actionItem.resourceAssigned.get();
        const resourceAssigned = res.data();
        setResource(resourceAssigned);
      }

      // const tasks = await db.collection("tasks").get();
      // setActionItems(
      //   tasks.docs.map((task) => ({
      //     ...task.data(),
      //     id: task.id,
      //   }))
      // );
    };

    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      dateAssigned: "",
      resourceAssigned: "",
      expectedCompletionDate: "",
      actualCompletionDate: "",

      status: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      values.updateDate = new Date().toDateString();
      if (
        values.resourceAssigned !== "" &&
        typeof values.resourceAssigned !== "object"
      ) {
        values.resourceAssigned = db.doc(
          `resources/${values.resourceAssigned}/`
        );
      }

      await db.collection("action-items").doc(id).set(values);

      history.push("/action-items");
    },
  });

  const { errors } = formik;
  return (
    <>
      {actionItem && (
        <div>
          <Header>Edit {actionItem.name} Action Item</Header>
          <StyledForm onSubmit={formik.handleSubmit}>
            <StyledInputWrapper error={!!errors.name}>
              <StyledInput
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                name="name"
              />
            </StyledInputWrapper>
            <StyledInputWrapper error={!!errors.name}>
              <StyledTextArea
                placeholder="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                name="description"
              ></StyledTextArea>
            </StyledInputWrapper>
            <StyledInputWrapper error={!!errors.name}>
              <StyledInput
                placeholder="Date Assigned (mm/dd/yy)"
                value={formik.values.dateAssigned}
                onChange={formik.handleChange}
                name="dateAssigned"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </StyledInputWrapper>{" "}
            <StyledInputWrapper error={!!errors.name}>
              <StyledSelect
                value={formik.values.resourceAssigned}
                onChange={formik.handleChange}
                name="resourceAssigned"
              >
                {resource && (
                  <option value={resource.id} label={resource.name} />
                )}

                <option value="" label="Resource Assigned" />
                {resources.map((resource) => (
                  <option value={resource.id} label={resource.name} />
                ))}
              </StyledSelect>
            </StyledInputWrapper>
            <StyledInputWrapper error={!!errors.name}>
              <StyledInput
                placeholder="Expected Completion Date"
                value={formik.values.expectedCompletionDate}
                onChange={formik.handleChange}
                name="expectedCompletionDate"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </StyledInputWrapper>
            <StyledInputWrapper error={!!errors.name}>
              <StyledInput
                placeholder="Actual Completion Date"
                value={formik.values.actualCompletionDate}
                onChange={formik.handleChange}
                name="actualCompletionDate"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </StyledInputWrapper>
            <div>
              <button>Submit</button>
            </div>
          </StyledForm>
        </div>
      )}
    </>
  );
};

export default Form;
