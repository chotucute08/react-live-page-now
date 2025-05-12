
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import VitalSign from "@/components/VitalSign";
import LiveECG from "@/components/LiveECG";
import PatientCondition from "@/components/PatientCondition";
import SystemStatus from "@/components/SystemStatus";
import { Heart, Thermometer } from "lucide-react";

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
    <div className="min-h-screen bg-customLavender-light p-4">
      <Card className="mb-4 p-4 shadow-sm border-customLavender">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-customLavender-dark">Patient Health Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-sm font-medium text-customLavender-medium">LIVE</span>
            <span className="text-sm text-customLavender-dark">
              Last Updated: {data.lastUpdated.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-4">
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
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="p-4 shadow-sm border-customLavender md:w-[70%]">
          <h2 className="mb-4 text-lg font-semibold text-customLavender-dark">Live ECG</h2>
          <LiveECG data={data.ecgData} />
        </Card>
        
        <PatientCondition 
          condition={data.condition} 
          confidence={data.confidence} 
          className="md:w-[30%]"
        />
      </div>

      <SystemStatus 
        status={data.systemStatus}
        deviceInfo={data.deviceInfo}
      />
    </div>
  );
};

export default PatientDashboard;
