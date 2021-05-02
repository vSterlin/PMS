import React, { useEffect, useState } from "react";
import db from "../../firebase";
import { Chart } from "react-google-charts";
import styled from "styled-components";
const Gannt = () => {
  function daysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
  }
  const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", labe: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];

  const GanttScreen = styled.div`
    position: relative;

    > * {
      position: absolute;
      left: 10px;
      right: 10px;
      top: 10px;
      bottom: 10px;
    }
  `;

  const mapTasks = (tasks) => {
    return tasks.map((task) => {
      const [startYear, startMonth, startDay] = task.expectedStartDate.split(
        "-"
      );
      const [endYear, endMonth, endDay] = task.expectedEndDate.split("-");

      const percentComplete = parseInt(task.percentComplete);
      console.log(percentComplete);
      return [
        task.id,
        task.name,
        task.id,
        new Date(startYear, startMonth, startDay),
        new Date(endYear, endMonth, endDay),
        null,
        percentComplete,
        null,
      ];
    });
  };
  const [rows, setRows] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await db.collection("tasks").get();

      const tasks = res.docs.map((task) => ({
        ...task.data(),
        id: task.id,
      }));
      setRows(mapTasks(tasks));
    };

    fetchData();
  }, []);

  return (
    <GanttScreen>
      {rows && console.log(rows)}
      {rows && (
        <Chart
          data={[columns, ...rows]}
          chartType="Gantt"
          // width="100%"
          // height="50%"
        ></Chart>
      )}
    </GanttScreen>
  );
};

export default Gannt;
