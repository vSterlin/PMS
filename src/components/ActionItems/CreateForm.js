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
  // const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {


      // const tasks = await db.collection("tasks").get();
      // setActionItems(
      //   tasks.docs.map((task) => ({
      //     ...task.data(),
      //     id: task.id,
      //   }))
      // );
    };

    fetchData();
  }, []);

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
    onSubmit: async (values) => {
      values.updateDate = new Date().toDateString();
      const res = await db.collection("action-items").add(values);
      history.push("/action-items");
    },
  });

  return (
    <div>
      <Header>Create New Action Item</Header>
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
            placeholder="Date Assigned (mm/dd/yy)"
            value={formik.values.dateAssigned}
            onChange={formik.handleChange}
            name="dateAssigned"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
          <StyledInput
            placeholder="Resource Assigned"
            value={formik.values.resourceAssigned}
            onChange={formik.handleChange}
            name="resourceAssigned"
          />
        </div>

        <div>
          <StyledInput
            placeholder="Expected Completion Date"
            value={formik.values.expectedCompletionDate}
            onChange={formik.handleChange}
            name="expectedCompletionDate"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </div>
        <div>
          <StyledInput
            placeholder="Actual Completion Date"
            value={formik.values.actualCompletionDate}
            onChange={formik.handleChange}
            name="actualCompletionDate"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </div>

        {/* <div>
          <StyledSelect
            value={formik.values}
            onChange={formik.handleChange}
            name=""
          >
            <option value="" label="Predecessor Tasks" />
            {tasks.map((task) => (
              <option value={task.id} label={task.name} />
            ))}
          </StyledSelect>
        </div> */}
        <div>
          <button>Submit</button>
        </div>
      </StyledForm>
    </div>
  );
};

export default Form;
