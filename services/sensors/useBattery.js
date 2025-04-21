import { useState, useEffect } from 'react';
import * as Battery from 'expo-battery';

export default function useBattery() {
  const [batteryLevel, setBatteryLevel] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // Function to fetch battery level
    const fetchBatteryLevel = async () => {
      const level = await Battery.getBatteryLevelAsync();
      if (isMounted) {
        setBatteryLevel(level);
      }
    };

    // Fetch battery level initially
    fetchBatteryLevel();

    // Poll for battery level every 10 seconds
    const interval = setInterval(fetchBatteryLevel, 10000);

    // Cleanup on unmount
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return batteryLevel;
}
