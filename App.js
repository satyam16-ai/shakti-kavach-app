import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { requestAllPermissions } from './utils/permissions';

// Sensor Hooks
import useLocation from './services/sensors/useLocation';
import useBattery from './services/sensors/useBattery';
import useNetwork from './services/sensors/useNetwork';
import useAccelerometer from './services/sensors/useAccelerometer';
import useDeviceMotion from './services/sensors/useDeviceMotion';
import useShakeDetection from './services/sensors/useShakeDetection';

// HomeScreen
import HomeScreen from './screens/HomeScreen';

export default function App() {
  const [permissions, setPermissions] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // for splash screen

  const location = useLocation();
  const battery = useBattery();
  const network = useNetwork();
  const accel = useAccelerometer();
  const motion = useDeviceMotion();

  // Move useShakeDetection inside the functional component
  useShakeDetection(() => {
    alert('Shake detected! 🚨 Triggering emergency action...');
    // console.log('Shake detected! 🚨 Triggering emergency action...');
  });
  
  useEffect(() => {
    async function initPermissions() {
      const result = await requestAllPermissions();
      setPermissions(result);
    }

    initPermissions();

    const splashTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(splashTimer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.splashContainer}>
        <Image
          source={require('./assets/logo.png')} // ✅ Replace with your logo
          style={styles.splashLogo}
        />
        <Text style={styles.splashText}>Shakti Kavach</Text>
        <ActivityIndicator size="large" color="#dc3545" />
      </View>
    );
  }

  return (
    <HomeScreen
      permissions={permissions}
      location={location}
      battery={battery}
      network={network}
      accel={accel}
      motion={motion}
    />
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
});
