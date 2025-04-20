import { useState, useEffect } from 'react';
import * as Battery from 'expo-battery';

export default function useBattery() {
  const [batteryLevel, setBatteryLevel] = useState(null);

  useEffect(() => {
    Battery.getBatteryLevelAsync().then(setBatteryLevel);
  }, []);

  return batteryLevel;
}
