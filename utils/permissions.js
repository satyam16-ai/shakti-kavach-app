import * as Location from 'expo-location';
import * as Battery from 'expo-battery';
import * as Notifications from 'expo-notifications';

export async function requestLocationPermission() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
}

export async function checkBatteryOptimization() {
  const batteryState = await Battery.getPowerStateAsync();
  return batteryState.batteryLevel;
}

export async function requestNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function requestAllPermissions() {
  const locationGranted = await requestLocationPermission();
  const notificationGranted = await requestNotificationPermission();
  const batteryLevel = await checkBatteryOptimization();

  return {
    locationGranted,
    notificationGranted,
    batteryLevel,
  };
}
