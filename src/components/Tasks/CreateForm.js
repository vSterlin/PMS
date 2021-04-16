import React, { useEffect, useState } from "react";
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
  & > * > input,
  textarea {
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


const StyledSelect = styled.select`
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
`;

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
      const res = await db.collection("tasks").add(values);
      history.push("/tasks");
    },
  });

  return (
    <div>
      <Header>Create New Task</Header>
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
            placeholder="Task Type"
            value={formik.values}
            onChange={formik.handleChange}
            name="type"
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
            placeholder="Expected Start Date (mm/dd/yy)"
            value={formik.values.date}
            onChange={formik.handleChange}
            name="date"
            type="date"
          />
                    <StyledInput
            placeholder="Expected End Date (mm/dd/yy)"
            value={formik.values.date}
            onChange={formik.handleChange}
            name="date"
            type="date"
          />
        </div>

        <div>
          <StyledInput
            placeholder="Expected Duration"
            value={formik.values}
            onChange={formik.handleChange}
            name=""
          />
        </div>
        <div>
          <StyledInput
            placeholder="Expected Effort"
            value={formik.values}
            onChange={formik.handleChange}
            name=""
          />
        </div>
        <div>
          <StyledInput
            placeholder="Actual Start Date (mm/dd/yy)"
            value={formik.values.date}
            onChange={formik.handleChange}
            name="date"
            type="date"
          />
                    <StyledInput
            placeholder="Actual End Date (mm/dd/yy)"
            value={formik.values.date}
            onChange={formik.handleChange}
            name="date"
            type="date"
          />
        </div>

        <div>
          <StyledInput
            placeholder="Actual Duration"
            value={formik.values}
            onChange={formik.handleChange}
            name=""
          />
        </div>
        <div>
          <StyledInput
            placeholder="Effort Completed"
            value={formik.values}
            onChange={formik.handleChange}
            name=""
          />
        </div>
        <div>
          <StyledInput
            placeholder="Actual Effort"
            value={formik.values}
            onChange={formik.handleChange}
            name=""
          />
        </div>

        <div>
          <StyledInput
            placeholder="Percent Completed"
            value={formik.values}
            onChange={formik.handleChange}
            name=""
          />
        </div>

        <div>
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
        </div>

        <div>
          <StyledSelect
            value={formik.values}
            onChange={formik.handleChange}
            name=""
          >
            <option value="" label="Successor Tasks" />
            {tasks.map((task) => (
              <option value={task.id} label={task.name} />
            ))}
          </StyledSelect>
        </div>

        <div>
          <StyledSelect
            value={formik.values}
            onChange={formik.handleChange}
            name=""
          >
            <option value="" label="List of Issues" />
            {tasks.map((task) => (
              <option value={task.id} label={task.name} />
            ))}
          </StyledSelect>
        </div>

        <div>
          <StyledSelect
            value={formik.values}
            onChange={formik.handleChange}
            name=""
          >
            <option value="" label="List of Decisions" />
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
