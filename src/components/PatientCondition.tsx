
import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface PatientConditionProps {
  condition: string;
  confidence: number;
}

const PatientCondition = ({ condition, confidence }: PatientConditionProps) => {
  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "normal":
        return "text-green-500";
      case "warning":
        return "text-yellow-500";
      case "critical":
        return "text-red-500";
      default:
        return "text-blue-500";
    }
  };

  const conditionColor = getConditionColor(condition);

  return (
    <Card className="p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-700">
        Patient Condition Prediction
      </h2>
      <div className="mb-2 flex items-center gap-2">
        <span className={`text-lg font-medium ${conditionColor}`}>
          {condition}
        </span>
        <span
          className={`inline-flex h-3 w-3 rounded-full ${
            condition.toLowerCase() === "normal" ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
      </div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm text-gray-500">Confidence:</span>
        <span className="text-sm font-medium">{confidence}%</span>
      </div>
      <Progress value={confidence} className="h-2" />
    </Card>
  );
};

export default PatientCondition;
