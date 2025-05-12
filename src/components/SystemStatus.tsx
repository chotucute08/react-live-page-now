
import React from "react";

interface SystemStatusProps {
  status: string;
  deviceInfo: string;
}

const SystemStatus = ({ status, deviceInfo }: SystemStatusProps) => {
  return (
    <div className="bg-customLavender/10 border-t border-customLavender-light p-3 mt-auto text-sm flex justify-between text-customLavender-medium">
      <div>System Status: {status}</div>
      <div>Device Info: {deviceInfo}</div>
    </div>
  );
};

export default SystemStatus;
