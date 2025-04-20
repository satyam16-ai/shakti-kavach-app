import { useState, useEffect } from 'react';
import { DeviceMotion } from 'expo-sensors';

export default function useDeviceMotion() {
  const [data, setData] = useState({ alpha: 0, beta: 0, gamma: 0 });

  useEffect(() => {
    const subscription = DeviceMotion.addListener((motionData) => {
      if (motionData?.rotation) {
        setData({
          alpha: motionData.rotation.alpha || 0,
          beta: motionData.rotation.beta || 0,
          gamma: motionData.rotation.gamma || 0,
        });
      }
    });

    DeviceMotion.setUpdateInterval(500);

    return () => subscription.remove();
  }, []);

  return data;
}
