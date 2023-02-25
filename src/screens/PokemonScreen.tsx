import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParams } from '../navigator/Navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';
import { usePokemonStore } from '../hooks/PokemonStore';
import AsyncStorage from '@react-native-async-storage/async-storage';



interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { };

export const PokemonScreen = ({ navigation, route }: Props) => {

    const { simplePokemon, color } = route.params;
    const { id, name, picture } = simplePokemon;
    const { top } = useSafeAreaInsets();
    const [isAdded, setIsAdded] = useState(false);
    const [buttonIcon, setButtonIcon] = useState('add-outline');
    const [buttonColor, setButtonColor] = useState('transparent');
    
    useEffect(() => {
        // Leer el estado actual del AsyncStorage y establecer el estado actual del botón en función de este valor
        const getIsAddedFromAsyncStorage = async () => {
            const value = await AsyncStorage.getItem(id.toString());
            if (value !== null) {
                const isAddedFromAsyncStorage = JSON.parse(value);
                setIsAdded(isAddedFromAsyncStorage);
                setButtonIcon(isAddedFromAsyncStorage ? 'close' : 'add-outline');
                setButtonColor(isAddedFromAsyncStorage ? 'red' : 'transparent');
            }
        };
        getIsAddedFromAsyncStorage();
    }, [id]);
    

    const handleAddRemovePokemon = async () => {
        if (isAdded) {
            decreasePokemonCount(); // disminuir el número de pokemons
            setButtonColor('transparent'); // establecer el color en verde
        } else {
            increasePokemonCount(); // aumentar el número de pokemons
            setButtonColor('red'); // establecer el color en rojo
        }
        setIsAdded(!isAdded); // invertir el valor de isAdded después de establecer el color del botón
        setButtonIcon(isAdded ? 'add-outline' : 'close');

        // Guardar el nuevo estado en AsyncStorage
        try {
            await AsyncStorage.setItem(id.toString(), JSON.stringify(!isAdded));
        } catch (error) {
            console.log(error);
        }
    };


    const { isLoading, pokemon } = usePokemon(id);
    const { pokemonCount, increasePokemonCount, decreasePokemonCount } = usePokemonStore();

    return (
        <View style={{ flex: 1 }}>
            {/* Heade Containerr */}
            <View style={{
                ...styles.headerContainer,
                backgroundColor: color,
            }}>
                {/* Backbutton */}
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    activeOpacity={0.8}
                    style={{
                        ...styles.backButton,
                        top: top + 5
                    }}
                >
                    <Icon
                        name="arrow-back-outline"
                        color="white"
                        size={35}
                    />
                </TouchableOpacity>

                {/* Nombre del Pokemon */}
                <Text
                    style={{
                        ...styles.pokemonName,
                        top: top + 40
                    }}
                >
                    {name + '\n'}#{id}
                </Text>

                {/* Pokebola blanca */}
                <Image
                    source={require('../assets/pokebola-blanca.png')}
                    style={styles.pokeball}
                />

                <FadeInImage
                    uri={picture}
                    style={styles.pokemonImage}
                />

                <TouchableOpacity
                    style={[styles.addButton, { backgroundColor: buttonColor }]}
                    onPress={handleAddRemovePokemon}
                >
                    <Icon name={buttonIcon} color="white" size={35} />
                </TouchableOpacity>

            </View>


            {/* Detalles y Loading */}
            {
                isLoading
                    ? (
                        <View style={styles.loadingIndicator}>
                            <ActivityIndicator
                                color={color}
                                size={50}
                            />
                        </View>
                    )
                    : <PokemonDetails pokemon={pokemon} />
            }


        </View>
    )
}


const styles = StyleSheet.create({
    headerContainer: {
        height: 370,
        zIndex: 999,
        alignItems: 'center',
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000,
    },
    backButton: {
        position: 'absolute',
        left: 20
    },
    pokemonName: {
        color: 'white',
        fontSize: 40,
        alignSelf: 'flex-start',
        left: 20
    },
    pokeball: {
        width: 250,
        height: 250,
        bottom: -20,
        opacity: 0.7
    },
    pokemonImage: {
        width: 250,
        height: 250,
        position: 'absolute',
        bottom: -15
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 35,
        position: 'absolute',
        marginHorizontal: 120,
        left: 200,
        marginTop: 5
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
    },
});