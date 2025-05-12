
import React from "react";
import { Card } from "@/components/ui/card";

interface VitalSignProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
}

const VitalSign = ({ title, value, unit, icon }: VitalSignProps) => {
  return (
    <Card className="p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">{icon}</div>
        <div className="text-sm text-gray-500">{title}</div>
      </div>
      <div className="mt-2 flex items-end gap-1">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <span className="mb-1 text-lg text-gray-600">{unit}</span>
      </div>
    </Card>
  );
};

export default VitalSign;
