
import React from "react";

interface SystemStatusProps {
  status: string;
  deviceInfo: string;
}

const SystemStatus = ({ status, deviceInfo }: SystemStatusProps) => {
  return (
    <div className="mt-4 py-3 text-sm text-gray-500">
      <div>System Status: {status}</div>
      <div>Device Info: {deviceInfo}</div>
    </div>
  );
};

export default SystemStatus;
