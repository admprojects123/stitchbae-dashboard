import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./totalrevenue.css";

const data = [
  { day: "16", revenue: 500000 },
  { day: "17", revenue: 1200000 },
  { day: "18", revenue: 1000000 },
  { day: "19", revenue: 800000 },
  { day: "20", revenue: 2000000 },
  { day: "21", revenue: 2500000 },
  { day: "22", revenue: 1500000 },
  { day: "23", revenue: 1800000 },
  { day: "24", revenue: 2500000 },
  { day: "25", revenue: 1300000 },
  { day: "26", revenue: 3000000 },
  { day: "27", revenue: 2000000 },
  { day: "28", revenue: 1500000 },
  { day: "29", revenue: 1800000 },
  { day: "30", revenue: 2400000 },
  { day: "31", revenue: 1800000 },
  { day: "02", revenue: 1000000 },
];

const RevenueChart = () => {
  const [timeRange, setTimeRange] = useState("Weekly");
  const [selectedDate, setSelectedDate] = useState("2023-03-12");

  const formatYAxisValue = (value) => `${(value / 1000000).toFixed(1)}M`;

  return (
    <div className="chart-container">
      <div className="chart-header">
        <div className="revenue-title">Revenue</div>
        <div className="controls">
          <select
            style={{
              fontFamily: "Poppins",
              border: "0px",
              backgroundColor: "#F0F2F6",
              fontWeight: "600",
              padding: "5px 10px",
            }}
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
          <input
            style={{
              fontFamily: "Poppins",
              border: "0px",
              backgroundColor: "#F0F2F6",
              fontWeight: "600",
              padding: "5px 10px",
            }}
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="day" tickMargin={10} />
          <YAxis tickFormatter={formatYAxisValue} tickMargin={10} />
          <Tooltip
            formatter={(value) => `${(value / 1000).toFixed(1)}k`}
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#279F51"
            strokeWidth={3}
            dot={{ stroke: "#279F51", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
            fillOpacity={0.1}
            fill="rgba(120, 171, 152, 20)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
