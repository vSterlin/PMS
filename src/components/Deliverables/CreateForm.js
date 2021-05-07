import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Header from "../Reusable/Header";
import db from "../../firebase";
import {  useHistory } from "react-router";
import { StyledForm, StyledInput, StyledSelect, StyledTextArea } from "../Reusable/Form";


const Form = () => {
  const history = useHistory();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const tasks = await db.collection("tasks").get();
      setTasks(
        tasks.docs.map((task) => ({
          ...task.data(),
          id: task.id,
        }))
      );
    };

    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      date: "",
      requirement: "",
      task: "",
    },
    onSubmit: async (values) => {
      values.task = db.doc(`tasks/${values.task}/`);
      // const res = await db.collection("deliverables").add(values);
      await db.collection("deliverables").add(values);

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
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </div>
        <div>
          <StyledInput
            placeholder="List of Requirements (Not part of our project)"
            value={formik.values.requirement}
            onChange={formik.handleChange}
            name="requirement"
            disabled
          />
        </div>
        <div>
          <StyledSelect
            value={formik.values.task}
            onChange={formik.handleChange}
            name="task"
          >
            <option value="" label="List of Tasks" />
            {tasks.map((task) => (
              <option value={task.id} label={task.name} />
            ))}
          </StyledSelect>
        </div>

        <div>
          <button>Submit</button>
        </div>
      </StyledForm>
    </div>
  );
};

export default Form;
