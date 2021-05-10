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
} from "../Reusable/Form";

const Form = () => {
  const history = useHistory();
  const [tasks, setTasks] = useState([]);
  const [deliverable, setDeliverable] = useState(null);

  const [task, setTask] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const tasks = await db.collection("tasks").get();
      setTasks(
        tasks.docs.map((task) => ({
          ...task.data(),
          id: task.id,
        }))
      );

      const deliverableDoc = await db.collection("deliverables").doc(id).get();
      const deliverable = deliverableDoc.data();
      setDeliverable(deliverable);
      formik.setValues(deliverable);

      if (deliverable.task !== "") {
        const res = await deliverable.task.get();
        const task = res.data();
        setTask(task);
      }
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      date: "",
      requirement: "",
      task: "",
    },
    onSubmit: async (values) => {
      if (values.task !== "" && typeof values.task !== "object") {
        values.task = db.doc(`tasks/${values.task}/`);
      }

      await db.collection("deliverables").doc(id).set(values);

      history.push("/deliverables");
    },
  });

  return (
    <>
      {deliverable && (
        <div>
          <Header>Edit {deliverable.name} Deliverable</Header>
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
                {task && <option value={task.id} label={task.name} />}
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
      )}
    </>
  );
};

export default Form;
