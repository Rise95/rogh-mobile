import React from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native';

export default () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <LottieView 
                source={require('../../animation/loader.json')} 
                style={{
                    fill: '#000'
                }}
                autoPlay 
                loop 
            />
        </View>
    );
}