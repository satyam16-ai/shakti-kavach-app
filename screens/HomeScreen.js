import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Hooks for real data
import useAccelerometer from '../services/sensors/useAccelerometer';
import useDeviceMotion from '../services/sensors/useDeviceMotion';
import useBattery from '../services/sensors/useBattery';
import useLocation from '../services/sensors/useLocation';
import useNetwork from '../services/sensors/useNetwork';

const HomeScreen = ({ navigation }) => {
  const accel = useAccelerometer();
  const motion = useDeviceMotion();
  const battery = useBattery();
  const location = useLocation();
  const network = useNetwork();

  useEffect(() => {
    console.log('Motion data updated:', motion);
  }, [motion]);

  console.log('device motion', motion);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🚨 Shakti Kavach</Text>

      {/* Status Section */}
      <View style={styles.statusBox}>
        <Text style={styles.statusTitle}>🧾 Live Status Overview</Text>
        <Text>📍 Location:</Text>
        <Text>
          {location?.coords
            ? `${location.coords.latitude.toFixed(4)}, ${location.coords.longitude.toFixed(4)}`
            : 'Getting location...'}
        </Text>

        <Text>🌐 Network: {network === null ? 'Checking...' : network ? 'Online' : 'Offline'}</Text>
        <Text>
          🎯 Device Motion: 
          {motion
            ? `Alpha: ${motion.alpha.toFixed(2)}, Beta: ${motion.beta.toFixed(2)}, Gamma: ${motion.gamma.toFixed(2)}`
            : 'No motion data available'}
        </Text>
        <Text>🔋 Battery: {battery ? `${(battery * 100).toFixed(0)}%` : 'Loading...'}</Text>
        <Text>
          📈 Accelerometer: X: {accel.x.toFixed(2)} Y: {accel.y.toFixed(2)} Z: {accel.z.toFixed(2)}
        </Text>
      </View>

      {/* Quick Actions */}
      <Text style={styles.quickTitle}>⚡ Quick Actions</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="alarm-light" size={40} color="white" />
        <Text style={styles.buttonText}>SOS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="location" size={24} color="#fff" />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="settings" size={24} color="#fff" />
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#dc3545',
    alignSelf: 'center',
    marginBottom: 30,
  },
  statusBox: {
    padding: 20,
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    marginBottom: 30,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  quickTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: 100,
  },
  buttonText: {
    color: '#fff',
    marginTop: 8,
    fontWeight: '600',
  },
});
