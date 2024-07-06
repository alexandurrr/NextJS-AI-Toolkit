"use client";
import styles from "./chart.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Sun",
    OpenAI: 5,
    Claude: 3,
    NorLLM: 2,
  },
  {
    name: "Mon",
    OpenAI: 7,
    Claude: 6,
    NorLLM: 4,
  },
  {
    name: "Tue",
    OpenAI: 3,
    Claude: 8,
    NorLLM: 5,
  },
  {
    name: "Wed",
    OpenAI: 9,
    Claude: 4,
    NorLLM: 7,
  },
  {
    name: "Thu",
    OpenAI: 6,
    Claude: 7,
    NorLLM: 3,
  },
  {
    name: "Fri",
    OpenAI: 8,
    Claude: 5,
    NorLLM: 6,
  },
  {
    name: "Sat",
    OpenAI: 4,
    Claude: 9,
    NorLLM: 8,
  },
];

const Chart = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Weekly AI Model Requests</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="OpenAI"
            stroke="#8884d8"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="Claude"
            stroke="#82ca9d"
            strokeDasharray="3 4 5 2"
          />
          <Line
            type="monotone"
            dataKey="NorLLM"
            stroke="#ffc658"
            strokeDasharray="3 3"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
