
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import VitalSign from "@/components/VitalSign";
import LiveECG from "@/components/LiveECG";
import PatientCondition from "@/components/PatientCondition";
import SystemStatus from "@/components/SystemStatus";
import { Heart, Thermometer, Landmark, Tree } from "lucide-react";

// This would be replaced with Firebase real-time data
const useMockData = () => {
  const [data, setData] = useState({
    heartRate: 72,
    oxygenSaturation: 98,
    temperature: 98.6,
    ecgData: Array.from({ length: 100 }, (_, i) => ({
      time: i,
      value1: Math.sin(i / 10) * 10 + 50 + Math.random() * 5,
      value2: Math.cos(i / 10) * 8 + 30 + Math.random() * 3,
    })),
    condition: "Normal",
    confidence: 95,
    lastUpdated: new Date(),
    systemStatus: "No errors detected",
    deviceInfo: "Raspberry Pi 192.168.1.100",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setData(prev => ({
        ...prev,
        heartRate: Math.floor(Math.random() * 10) + 65,
        oxygenSaturation: Math.floor(Math.random() * 4) + 96,
        temperature: +(98 + Math.random()).toFixed(1),
        ecgData: [...prev.ecgData.slice(1), {
          time: prev.ecgData[prev.ecgData.length - 1].time + 1,
          value1: Math.sin(prev.ecgData.length / 10) * 10 + 50 + Math.random() * 5,
          value2: Math.cos(prev.ecgData.length / 10) * 8 + 30 + Math.random() * 3,
        }],
        lastUpdated: new Date(),
      }));
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return data;
};

const PatientDashboard = () => {
  // Replace this with Firebase data fetching logic when connecting to Firebase
  const data = useMockData();
  
  return (
    <div className="min-h-screen w-full bg-customLavender-light flex flex-col">
      <Card className="m-4 p-4 shadow-sm border-customLavender">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-customLavender-dark">Patient Health Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-customLavender-medium">LIVE</span>
            <span className="text-sm text-customLavender-dark">
              Last Updated: {data.lastUpdated.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 flex-grow">
        <div className="md:col-span-1 flex flex-col gap-4">
          <VitalSign 
            title="Heart Rate"
            value={data.heartRate}
            unit="bpm"
            icon={<Heart className="h-6 w-6 text-red-500" />}
          />
          <VitalSign 
            title="Oxygen Saturation"
            value={data.oxygenSaturation}
            unit="%"
            icon={<span className="text-blue-500 font-bold">O₂</span>}
          />
          <VitalSign 
            title="Body Temperature"
            value={data.temperature}
            unit="°F"
            icon={<Thermometer className="h-6 w-6 text-yellow-500" />}
          />
          <Card className="p-4 shadow-sm border-customLavender bg-gradient-to-br from-white to-customLavender-light">
            <div className="flex items-center gap-2">
              <Landmark className="h-6 w-6 text-customLavender-medium" />
              <h3 className="text-lg font-semibold text-customLavender-dark">Hospital Info</h3>
            </div>
            <div className="mt-2">
              <p className="text-sm text-customLavender-dark">Central Hospital</p>
              <p className="text-xs text-customLavender-medium">Device ID: MED-2024-457</p>
              <p className="text-xs text-customLavender-medium">Room: 302-B</p>
            </div>
          </Card>
          <Card className="p-4 shadow-sm border-customLavender bg-gradient-to-br from-white to-customLavender-light">
            <div className="flex items-center gap-2">
              <Tree className="h-6 w-6 text-green-500" />
              <h3 className="text-lg font-semibold text-customLavender-dark">Environment</h3>
            </div>
            <div className="mt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-customLavender-medium">Room Temp:</span>
                <span className="text-sm font-medium text-customLavender-dark">72°F</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-customLavender-medium">Humidity:</span>
                <span className="text-sm font-medium text-customLavender-dark">45%</span>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="md:col-span-3 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 flex-grow">
            <Card className="p-4 shadow-sm border-customLavender md:w-[70%] flex flex-col">
              <h2 className="mb-4 text-lg font-semibold text-customLavender-dark">Live ECG</h2>
              <div className="flex-grow">
                <LiveECG data={data.ecgData} />
              </div>
            </Card>
            
            <PatientCondition 
              condition={data.condition} 
              confidence={data.confidence} 
              className="md:w-[30%]"
            />
          </div>
          
          <Card className="p-4 shadow-sm border-customLavender bg-gradient-to-br from-white to-customLavender-light">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-customLavender-dark">Patient Notes</h2>
              <span className="text-xs text-customLavender-medium">Updated: Today, 2:45 PM</span>
            </div>
            <p className="mt-2 text-sm text-customLavender-dark">
              Patient is stable and responding well to treatment. Vitals are within normal range.
              Continue monitoring ECG patterns for any irregularities.
            </p>
          </Card>
        </div>
      </div>

      <SystemStatus 
        status={data.systemStatus}
        deviceInfo={data.deviceInfo}
      />
    </div>
  );
};

export default PatientDashboard;
