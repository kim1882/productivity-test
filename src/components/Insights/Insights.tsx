"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { selectTasks, useSelector } from "@/lib/redux";
import { Duration, Filter, Task } from "@/types/tasks";
import { useState } from "react";
import DurationFilter from "../DurationFilter";
import { Content } from "./Insights.styles";
import { CategoryAttributes } from "@/constants";
import { getCategoryAttributes } from "@/utils";
import moment from "moment";

const Insights = () => {
  const tasks: Task[] = useSelector(selectTasks);
  const [filter, setFilter] = useState(Filter.All);

  const shortLine = { duration: Duration.Short, dataKey: "short" };
  const mediumLine = { duration: Duration.Medium, dataKey: "medium" };
  const longLine = { duration: Duration.Long, dataKey: "long" };

  const lineMappings = {
    All: [shortLine, mediumLine, longLine],
    Short: [shortLine],
    Medium: [mediumLine],
    Long: [longLine],
  };

  const convertTasksToChartData = (): {
    date: string;
    short: number;
    medium: number;
    long: number;
  }[] => {
    const initialChartData: {
      [date: string]: { short: number; medium: number; long: number };
    } = {};
    const chartData = tasks
      .map((task) => ({
        task,
        category: getCategoryAttributes(task.durationInMilliseconds),
      }))
      .reduce((accumulator, { task, category }) => {
        const formattedDate = moment(task.creationDate).format("DD/MMM");
        const { isCompleted } = task;

        if (isCompleted) {
          if (!accumulator[formattedDate]) {
            accumulator[formattedDate] = { short: 0, medium: 0, long: 0 };
          }

          if (category.label === Filter.Short) {
            accumulator[formattedDate].short += 1;
          } else if (category.label === Filter.Medium) {
            accumulator[formattedDate].medium += 1;
          } else if (category.label === Filter.Long) {
            accumulator[formattedDate].long += 1;
          }
        }

        return accumulator;
      }, initialChartData);

    const result = Object.keys(chartData).map((date) => ({
      date,
      short: chartData[date].short,
      medium: chartData[date].medium,
      long: chartData[date].long,
    }));

    return result.sort(
      (a, b) =>
        moment(a.date, "DD/MMM").valueOf() - moment(b.date, "DD/MMM").valueOf()
    );
  };

  return (
    <Content>
      <DurationFilter filter={filter} setFilter={setFilter} />
      <ResponsiveContainer width="100%" aspect={2.0 / 1.0}>
        <LineChart data={convertTasksToChartData()}>
          {lineMappings[filter].map((line) => (
            <Line
              type="monotone"
              dataKey={line.dataKey}
              stroke={CategoryAttributes[line.duration].color}
            />
          ))}
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </Content>
  );
};

export default Insights;
