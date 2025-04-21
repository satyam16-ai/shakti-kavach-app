import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import { requestAllPermissions } from './utils/permissions';

// Sensor Hooks
import useLocation from './services/sensors/useLocation';
import useBattery from './services/sensors/useBattery';
import useNetwork from './services/sensors/useNetwork';
import useAccelerometer from './services/sensors/useAccelerometer';
import useDeviceMotion from './services/sensors/useDeviceMotion';

export default function App() {
  const [permissions, setPermissions] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // for splash screen

  const location = useLocation();
  const battery = useBattery();
  const network = useNetwork();
  const accel = useAccelerometer();
  const motion = useDeviceMotion();

  useEffect(() => {
    async function initPermissions() {
      const result = await requestAllPermissions();
      setPermissions(result);
    }

    initPermissions();

    // Splash timer
    const splashTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // show splash for 2.5 seconds

    return () => clearTimeout(splashTimer);
  }, []);

  // Splash screen UI
  if (isLoading) {
    return (
      <View style={styles.splashContainer}>
        <Image
          source={require('./assets/logo.png')} // 🛑 replace with your logo path
          style={styles.splashLogo}
        />
        <Text style={styles.splashText}>Shakti Kavach</Text>
        <ActivityIndicator size="large" color="#dc3545" />
      </View>
    );
  }

  // Main App UI
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🚨 Shakti Kavach App</Text>

      {permissions ? (
        <>
          <Text style={styles.heading}>🔐 Permissions:</Text>
          <Text>📍 Location: {permissions.locationGranted ? 'Granted' : 'Denied'}</Text>
          <Text>🔔 Notifications: {permissions.notificationGranted ? 'Granted' : 'Denied'}</Text>
          <Text>🔋 Battery Level: {Math.round(permissions.batteryLevel * 100)}%</Text>
        </>
      ) : (
        <Text>Requesting Permissions...</Text>
      )}

      <Text style={styles.heading}>📡 Sensors:</Text>

      <Text>🌐 Network: {network?.isConnected ? 'Online' : 'Offline'}</Text>

      {location?.coords && (
        <Text>
          📍 Location: {location.coords.latitude?.toFixed(4)}, {location.coords.longitude?.toFixed(4)}
        </Text>
      )}

      {accel && (
        <Text>
          📈 Accelerometer: x={accel.x?.toFixed(2)} y={accel.y?.toFixed(2)} z={accel.z?.toFixed(2)}
        </Text>
      )}

      {motion && (
        <Text>
          📱 Device Motion: alpha={motion.alpha?.toFixed(2) || '0.00'} beta={motion.beta?.toFixed(2) || '0.00'} gamma={motion.gamma?.toFixed(2) || '0.00'}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  splashLogo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  splashText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: 10,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: '#dc3545',
  },
  heading: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: '600',
  },
});
