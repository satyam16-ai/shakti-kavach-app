import { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';

export default function useAccelerometer() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  

  useEffect(() => {
    const sub = Accelerometer.addListener(setData);
    Accelerometer.setUpdateInterval(500);
    return () => sub.remove();
  }, []);

  return data;
}
