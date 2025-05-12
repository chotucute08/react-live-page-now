
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

interface ECGDataPoint {
  time: number;
  value1: number;
  value2: number;
}

interface VitalsHistoryProps {
  data: ECGDataPoint[];
}

const VitalsHistory = ({ data }: VitalsHistoryProps) => {
  const [timeRange, setTimeRange] = useState<"10m" | "1h" | "24h">("10m");

  return (
    <Card className="p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-700">
        Vitals History
      </h2>
      <div className="mb-4 flex justify-between">
        <Button
          variant={timeRange === "10m" ? "default" : "outline"}
          size="sm"
          onClick={() => setTimeRange("10m")}
        >
          Last 10 mins
        </Button>
        <Button
          variant={timeRange === "1h" ? "default" : "outline"}
          size="sm"
          onClick={() => setTimeRange("1h")}
        >
          1 hr
        </Button>
        <Button
          variant={timeRange === "24h" ? "default" : "outline"}
          size="sm"
          onClick={() => setTimeRange("24h")}
        >
          24 hr
        </Button>
      </div>
      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.slice(-50)}>
            <Line
              type="monotone"
              dataKey="value1"
              stroke="#E100FF"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="value2"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default VitalsHistory;
