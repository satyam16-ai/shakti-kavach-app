import { useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';

export default function useShakeDetection(onShake) {
  useEffect(() => {
    let lastShakeTime = 0;

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      const now = Date.now();

      if (acceleration > 1.75) {
        // Prevent multiple triggers in a short time
        if (now - lastShakeTime > 1000) {
          lastShakeTime = now;
          onShake(); // Call the callback when shake is detected
        }
      }
    });

    Accelerometer.setUpdateInterval(500); // 200ms

    return () => {
      subscription.remove();
    };
  }, [onShake]);
}
