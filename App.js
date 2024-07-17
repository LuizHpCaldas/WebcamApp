import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const getPermission = async () => {
      try {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (error) {
        console.log('Erro ao solicitar permissão:', error);
        setHasPermission(false); // Define hasPermission como false em caso de erro
      }
    };

    getPermission();
  }, []);

  const requestPermissionAgain = async () => {
    try {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    } catch (error) {
      console.log('Erro ao solicitar permissão novamente:', error);
      setHasPermission(false); // Define hasPermission como false em caso de erro
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Solicitando permissão...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Acesso à câmera negado</Text>
        <Button title="Solicitar Permissão Novamente" onPress={requestPermissionAgain} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Permissão concedida!</Text>
      {/* Aqui você pode adicionar o código para exibir a câmera ou outras funcionalidades */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
