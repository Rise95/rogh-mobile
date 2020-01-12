import React, { useState, useEffect } from 'react'
import {
    Container,
    Text
} from './style'

import {useNetInfo} from "@react-native-community/netinfo";

export default () => {

    const netInfo = useNetInfo();

    return (
        <Container active={netInfo.isConnected ? 0 : 1}>
            <Text>
                {netInfo.isConnected ? 'ONLINE' : 'OFFLINE'}
            </Text>
        </Container>
    )
}