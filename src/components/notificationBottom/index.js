import React, { useContext } from 'react'
import {
    Container,
    Text
} from './style'
import { AppContext } from '../../app/components/context'

export default () => {

    const {
        notificationBottom,
        setNotificationBottom
    } = useContext(AppContext)

   if (notificationBottom) {
        setTimeout(() => {
            setNotificationBottom(null)
        }, 3000)
   }

    return (
        <Container 
            active={notificationBottom ? 1 : 0}
            type={notificationBottom ? notificationBottom.type : '' }
        >
            <Text>
                {notificationBottom ? notificationBottom.message : ''}
            </Text>
        </Container>
    )
}