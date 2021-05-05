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
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resources = await db.collection("resources").get();
      setResources(
        resources.docs.map((resource) => ({
          ...resource.data(),
          id: resource.id,
        }))
      );
    };

    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      title: "",
      skill: "",
      availabilityCalendar: "",
      payRate: "",
    },
    onSubmit: async (values) => {
      const res = await db.collection("resources").add(values);
      history.push("/resources");
    },
  });

  return (
    <div>
      <Header>Create New Resource</Header>
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
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            name="title"
          />
        </div>
        <div>
          <StyledSelect
            value={formik.values.skill}
            onChange={formik.handleChange}
            name="skill"
          >
            <option value="" label="List of Skills" />
            {resources.map((resource) => (
              <option value={resource.id} label={resource.name} />
            ))}
          </StyledSelect>
        </div>

        <div>
          <StyledInput
            placeholder="Availabilty Calendar (mm/dd/yy)"
            value={formik.values.availabilityCalendar}
            onChange={formik.handleChange}
            name="availabilityCalendar"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
          <StyledInput
            placeholder="Pay Rate"
            value={formik.values.payRate}
            onChange={formik.handleChange}
            name="payRate"
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
