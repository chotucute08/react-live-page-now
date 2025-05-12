
import React from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface ECGDataPoint {
  time: number;
  value1: number;
  value2: number;
}

interface LiveECGProps {
  data: ECGDataPoint[];
}

const LiveECG = ({ data }: LiveECGProps) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="time" hide />
          <YAxis hide />
          <Line
            type="monotone"
            dataKey="value1"
            stroke="#9a9acc"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="value2"
            stroke="#8e8ec0"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LiveECG;
