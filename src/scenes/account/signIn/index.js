import React, { useState, useContext } from 'react'
import { View, TextInput, Button, Text } from 'react-native'
import { AppContext } from '../../../app/components/context'
import AsyncStorage from '@react-native-community/async-storage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default ({
    navigation
}) => {
    const {
        restoreToken,
        username,
        setProfile,
        password,
        setUsername,
        setPassword,
        setNotificationBottom
    } = useContext(AppContext);

    const signIn = async () => {
        try {

            let usersAsyncStorage = await AsyncStorage.getItem('users');

            if (usersAsyncStorage) {
                let parseUsers = JSON.parse(usersAsyncStorage)
                veryUser = parseUsers.filter(user => {
                    if (user.username === username) {
                        return true
                    } else {
                        return false
                    }
                })
                if (veryUser && veryUser.length > 0) {
                    let token = 'dadsadssadadsa'
                    let user = veryUser[0]
                    setProfile({ ...user, userToken: token })
                    restoreToken(token);
                    setUsername('')
                    setPassword('')
                } else {
                    setNotificationBottom({
                        type: 'failure',
                        message: 'CREDENCIAL INVALIDA'
                    })
                }
            } else {
                setNotificationBottom({
                    type: 'failure',
                    message: 'BASE DE DADOS VAZIA'
                })
            }

        } catch (e) {
            console.log('e', e)
        }
    }

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-around',
                padding: 30
            }}
        >
            <View>
                <MaterialIcons 
                    name="list"
                    size={100}
                    color="#D71535"
                />
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color:"#D71535",
                        letterSpacing: 4,
                    }}
                >
                    SEJA BEM VINDO
                </Text>
            </View>
            <View>
                <TextInput
                    autoCapitalize="none"
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor='#D71535'
                    style={{ 
                        borderWidth: 1, 
                        borderStyle: 'solid', 
                        borderColor: '#D71535', 
                        elevation: 1, 
                        marginBottom: 5,
                        paddingLeft: 10,
                        color: '#D71535'
                    }}
                />
                <TextInput
                    autoCapitalize="none"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor='#D71535'
                    style={{ 
                        borderWidth: 1, 
                        borderStyle: 'solid', 
                        borderColor: '#D71535', 
                        elevation: 1, 
                        marginBottom: 5,
                        paddingLeft: 10,
                        color: '#D71535'
                    }}
                />
            </View>
            <View>
                <View
                    style={{ marginBottom: 5 }}
                >
                    <Button 
                        title="Sign in" 
                        onPress={() => signIn()} 
                        color="#D71535"
                    />
                </View>
                <View>
                    <Button 
                        title="Sign Up" 
                        onPress={() => navigation.navigate('SignUp')}
                        color="#C0C0C0"
                     /> 
                </View>   
            </View>
        </View>
    );
}