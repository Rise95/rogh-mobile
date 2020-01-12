import React, { useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppContext } from '../app/components/context'
import Splash from './splash';
import Account from './account';
import Home from './home';
import Offline from '../components/offline'
import NotificationBottom from '../components/notificationBottom'
import {
    Container
} from './style'

const Stack = createStackNavigator();

export default () => {

    const { 
        isLoading, 
        userToken, 
        restoreToken, 
        setProfile 
    } = useContext(AppContext);

    useEffect(() => {

        const bootstrapAsync = async () => {

            let userToken;

            try {

                userToken = await AsyncStorage.getItem('userToken');
                let getProfile = await AsyncStorage.getItem('profile');

                let parseGetProfile = JSON.parse(getProfile)

                if (parseGetProfile && parseGetProfile.userToken === userToken) {
                    restoreToken(userToken);
                    setProfile(parseGetProfile);
                } else {
                    restoreToken(null);
                    setProfile(null);
                }

            } catch (e) {
                console.log(e)
                restoreToken(null);
                setProfile(null);
            }

        };

        bootstrapAsync();

    }, []);

    return (
        <Container>            
            <Offline />
            <NotificationBottom />
            <NavigationNativeContainer>
                <Stack.Navigator>
                    {isLoading ? (
                        <Stack.Screen 
                            name="Splash" 
                            component={Splash} 
                            options={{
                                headerShown: false
                            }}
                        />
                    ) : userToken == null ? (
                        <Stack.Screen
                            name="Account"
                            component={Account}
                            options={{
                                headerShown: false
                            }}
                        />
                    ) : (
                        <Stack.Screen 
                            name="Home" 
                            component={Home} 
                            options={{
                                headerShown: false
                            }}
                        />
                    )}
                </Stack.Navigator>
            </NavigationNativeContainer>
        </Container>
    )
}