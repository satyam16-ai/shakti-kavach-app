import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import useAccelerometer from '../services/sensors/useAccelerometer';
import useDeviceMotion from '../services/sensors/useDeviceMotion';
import useBattery from '../services/sensors/useBattery';
import useLocation from '../services/sensors/useLocation';
import useNetwork from '../services/sensors/useNetwork';

export default function SensorTestScreen() {
  const accel = useAccelerometer();
  const motion = useDeviceMotion();
  const battery = useBattery();
  const location = useLocation();
  const network = useNetwork();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🔋 Battery: {battery ? `${(battery * 100).toFixed(0)}%` : 'Loading...'}</Text>

      <Text style={styles.title}>📶 Network: {network === null ? 'Checking...' : network ? 'Online' : 'Offline'}</Text>

      <Text style={styles.title}>📍 Location:</Text>
      <Text>{location ? JSON.stringify(location.coords, null, 2) : 'Getting location...'}</Text>

      <Text style={styles.title}>📈 Accelerometer:</Text>
      <Text>{`X: ${accel.x.toFixed(2)} | Y: ${accel.y.toFixed(2)} | Z: ${accel.z.toFixed(2)}`}</Text>

      <Text style={styles.title}>🎯 Device Motion:</Text>
      <Text>{motion ? JSON.stringify(motion.rotation, null, 2) : 'Loading...'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  title: { fontWeight: 'bold', marginTop: 20, fontSize: 16 },
});
