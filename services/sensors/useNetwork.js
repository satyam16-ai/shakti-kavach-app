import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

export default function useNetwork() {
  const [network, setNetwork] = useState({ isConnected: false });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetwork({ isConnected: state.isConnected });
    });

    return () => unsubscribe();
  }, []);

  return network;
}
