import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';


export const EditProfile = () => {
    const [name, setName] = useState('');
    const [lastNameP, setLastNameP] = useState('');
    const [lastNameM, setLastNameM] = useState('');
    const [photo, setPhoto] = useState('');
    const navigation = useNavigation();

    const handleSave = async () => {
        try {
          await AsyncStorage.setItem('name', name);
          await AsyncStorage.setItem('lastNameP', lastNameP);
          await AsyncStorage.setItem('lastNameM', lastNameM);
          await AsyncStorage.setItem('photo', photo);
          Alert.alert('Datos guardados correctamente', '', [
            { text: 'Aceptar', onPress: () => navigation.navigate('Profile') },
          ]);
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
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    placeholderTextColor="#A9A9A9"
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Apellido paterno"
                    placeholderTextColor="#A9A9A9"
                    value={lastNameP}
                    onChangeText={setLastNameP}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Apellido materno"
                    placeholderTextColor="#A9A9A9"
                    value={lastNameM}
                    onChangeText={setLastNameM}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Guardar cambios</Text>
            </TouchableOpacity>
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
      },      
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginVertical: 10,
        width: '80%',
    },
    input: {
        fontSize: 16,
        paddingVertical: 10,
        color: 'black'
    },
    button: {
        backgroundColor: '#3f51b5',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});