import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';


export const Profile = () => {
  const [name, setName] = useState('');
  const [lastNameP, setLastNameP] = useState('');
  const [lastNameM, setLastNameM] = useState('');
  const [photo, setPhoto] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      updateData();
    });
    return unsubscribe;
  }, [navigation]);

  const updateData = async () => {
    try {
      const name = await AsyncStorage.getItem('name');
      const lastNameP = await AsyncStorage.getItem('lastNameP');
      const lastNameM = await AsyncStorage.getItem('lastNameM');
      const photo = await AsyncStorage.getItem('photo');
      if (name !== null) {
        setName(name);
      }
      if (lastNameP !== null) {
        setLastNameP(lastNameP);
      }
      if (lastNameM !== null) {
        setLastNameM(lastNameM);
      }
      if (photo !== null) {
        setPhoto(photo);
      }
    } catch (e) {
      console.log(e);
    }
  };
  

  const handleChoosePhoto = async () => {
    const options = {
      title: 'Seleccionar foto de perfil',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        console.log('Usuario canceló la selección de imagen');
      } else if (response.error) {
        console.log('Error: ', response.error);
      } else if (response.customButton) {
        console.log('Botón personalizado: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        setPhoto(source.uri);
        await AsyncStorage.setItem('photo', source.uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChoosePhoto}>
        {photo === null ? (
          <Image
          style={styles.photo}
          source={require('../assets/avatar.jpg')}
        />
        
        ) : (
          <Image style={styles.photo} source={{ uri: photo }} />
        )}
      </TouchableOpacity>
      <Text style={styles.text}>
        {name} {lastNameP} {lastNameM}
      </Text>
      <Button
        title="Editar perfil"
        onPress={() => navigation.navigate('EditProfile')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
    resizeMode: 'contain'
  },  
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black'
  },

});
