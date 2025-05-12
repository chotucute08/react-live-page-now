
import React from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

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
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e7e7f3" />
          <XAxis dataKey="time" stroke="#9a9acc" />
          <YAxis stroke="#9a9acc" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "white", 
              border: "1px solid #d4d3e5",
              borderRadius: "0.375rem" 
            }} 
          />
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
