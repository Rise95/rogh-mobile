import React, { useReducer, useMemo } from 'react'
import Provider from './components/provider'
import Scenes from '../scenes'
import AsyncStorage from '@react-native-community/async-storage'

export default () => {

    const [state, dispatch] = useReducer((prevState, action) => {
        switch (action.type) {
            case 'RESTORE_TOKEN':
                return { ...prevState, userToken: action.token, isLoading: false };
            case 'USERS':
                return { ...prevState, users: action.users };
            case 'USERNAME':
                return { ...prevState, username: action.username };
            case 'PASSWORD':
                return { ...prevState, password: action.password };
            case 'PROFILE':
                return { ...prevState, profile: action.profile };
            case 'TASKS':
                return { ...prevState, tasks: action.tasks };
            case 'NOTIFICATION_BOTTOM':
                return { ...prevState, notificationBottom: action.notificationBottom };
            default:
                return prevState
        }
    }, {
        isLoading: true,
        userToken: null,
        username: '',
        password: '',
        notificationBottom: null,
        users: [],
        profile: null,
        tasks: []
    });

    const appContext = useMemo(() => ({
        restoreToken: async userToken => {
            try {
                if (userToken) {
                    await AsyncStorage.setItem('userToken', userToken)
                } else {
                    await AsyncStorage.removeItem('userToken')
                }
                dispatch({ type: 'RESTORE_TOKEN', token: userToken });
            } catch (e) {
                console.log('e', e)
            }
        },
        setUsers: async users => {
            try {
                if (users) {
                    await AsyncStorage.setItem('users', JSON.stringify(users))
                } else {
                    await AsyncStorage.removeItem('users')
                }
                dispatch({ type: 'USERS', users: users });
            } catch (e) {
                console.log('e', e)
            }
        },
        setUsername: async username => {
            dispatch({ type: 'USERNAME', username: username });
        },
        setPassword: async password => {
            dispatch({ type: 'PASSWORD', password: password });
        },
        setProfile: async profile => {
            try {
                if (profile) {
                    await AsyncStorage.setItem('profile', JSON.stringify(profile))
                } else {
                    await AsyncStorage.removeItem('profile')
                }
                dispatch({ type: 'PROFILE', profile: profile });
            } catch (e) {
                console.log('e', e)
            }
        },
        setNotificationBottom: async notificationBottom => {
            dispatch({ type: 'NOTIFICATION_BOTTOM', notificationBottom: notificationBottom });
        },
        setTasks: async tasks => {
            try {
                if (tasks) {
                    await AsyncStorage.setItem('tasks', JSON.stringify(tasks))
                } else {
                    await AsyncStorage.removeItem('tasks')
                }
                dispatch({ type: 'TASKS', tasks: tasks });
            } catch (e) {
                console.log('e', e)
            }
        },
        ...state
    }));

    return (
        <Provider value={appContext}>
            <Scenes />
        </Provider>
    )
}

console.disableYellowBox = true