
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
    <Card className="p-6 shadow-sm border-customLavender bg-white transition-all hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">{icon}</div>
        <div className="text-sm text-customLavender-medium">{title}</div>
      </div>
      <div className="mt-2 flex items-end gap-1">
        <span className="text-3xl font-bold text-customLavender-dark">{value}</span>
        <span className="mb-1 text-lg text-customLavender-medium">{unit}</span>
      </div>
    </Card>
  );
};

export default VitalSign;
