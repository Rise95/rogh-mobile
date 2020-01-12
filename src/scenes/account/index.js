import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './signIn'
import SignUp from './signUp'

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen 
                name="SignIn" 
                component={SignIn}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="SignUp" 
                component={SignUp} 
                options={{
                    title: '',
                    headerTintColor: "#D71535",
                    headerTransparent: true
                }}
            />
        </Stack.Navigator>
    )
}