import React, { useEffect, useRef, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { useTooltipContext } from "./CustomTooltip";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function ExampleChart() {
  const department = useSelector((state) => state.countdepartment);

  const [departmentList, setDepartmentList] = useState(null);

  useEffect(() => {
    if (!_.isNil(department.data)) {
      setDepartmentList(department.data.result);
    }
  }, [department]);
  const { openTooltip, closeTooltip } = useTooltipContext();

  //This is where you create content to go inside of the tooltip
  const tooltipContent = (e) => {
    return <div>{"Employee: " + e.EMPLOYEE}</div>;
  };

  //This is where you style the tooltip wrapper
  const tooltipStyle = {
    backgroundColor: "white",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: "1%",
    fontFamily: "helvetica, sans-serif",
    fontSize: "16px",
    padding: ".5%",
  };

  return (
    <BarChart
      width={500}
      height={300}
      data={!_.isNil(department.data) ? department.data.result : []}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="DEPT_NAME" />
      <YAxis />
      <Legend />
      <Bar
        dataKey="EMPLOYEE"
        fill="#da9101"
        onMouseEnter={(e) =>
          openTooltip({
            content: tooltipContent(e),
            style: tooltipStyle,
          })
        }
        onMouseLeave={() => closeTooltip()}
      />
    </BarChart>
  );
}
