import React, { useContext, useState, useEffect } from 'react'
import { View, Text, Button, TextInput, FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { AppContext } from '../../app/components/context'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default () => {

    const [taskValue, setTasksValue] = useState('')

    const {
        restoreToken,
        setProfile,
        profile,
        setTasks,
        tasks,
        setNotificationBottom
    } = useContext(AppContext);

    const signOut = async () => {
        restoreToken(null);
        setProfile(null);
    }

    const addTasks = async () => {
        
        try {
        
            if (taskValue === '') {
            
                setNotificationBottom({
                    type: 'failure',
                    message: 'DIGITE O NOME DA TAREFA'
                })
            
            } else {
                
                let tasksAsyncStorage = await AsyncStorage.getItem('tasks');

                if (tasksAsyncStorage) {

                    let parseTasks = JSON.parse(tasksAsyncStorage)

                    let listTasks = parseTasks
                    listTasks.push({ name: taskValue, username: profile.username, id: listTasks.length + 1 })
                    setTasks(listTasks);
                    setTasksValue('')

                } else {
                    
                    let listTasks = tasks
                    listTasks.push({ name: taskValue, username: profile.username, id: listTasks.length + 1 })
                    setTasks(listTasks);
                    setTasksValue('')

                }
                
            }
    

        } catch (e) {
            console.log(e)
        }
    }

    deleteTasks = async ({ index }) => {
        try {

            let tasks = await AsyncStorage.getItem('tasks');

            let parseTasks = JSON.parse(tasks)

            parseTasks.splice(index, 1)

            setTasks(parseTasks);


        } catch (e) {
            console.log(e)
        }
    }

    const listTasks = () => {
        if (profile && profile.username !== '') {
            let array = tasks.filter(task => {
                if (task.username === profile.username) {
                    return true
                } else {
                    return false
                }
            })
            return array
        } else {
            return tasks
        }

    }

    const Item = ({ index, name }) => {
        return (
            <View
                style={{
                    backgroundColor: '#C0C0C0',
                    padding: 20,
                    flexDirection: 'row',
                    marginVertical: 8,
                    alignItems: 'center',
                    elevation: 1,
                    justifyContent: 'space-between'
                }}
            >
                <Text
                    style={{
                        color: '#FFF',
                        fontSize: 22,
                    }}
                >
                    {name}
                </Text>

                <MaterialIcons
                    onPress={() => deleteTasks({ index })}
                    name="delete"
                    size={25}
                    color="#D71535"
                />

            </View>
        );
    }

    useEffect(() => {
        
        const getTasks = async () => {
            
            try {

                let tasks = await AsyncStorage.getItem('tasks');
    
                if (tasks) {
                    let parseTasks = JSON.parse(tasks)
                    setTasks(parseTasks);
                }

            } catch (e) {
                console.log(e)
            }

        }

        getTasks()

    }, [])

    return (
        <View
            style={{
                flex: 1
            }}
        >
            <Button 
                title="Sign out" 
                onPress={() => signOut()} 
                color="#C0C0C0"
            />
            <View
                style={{
                    flex: 1,
                    padding: 30
                }}
            >
                <TextInput 
                    placeholder="Nome da Tarefa" 
                    value={taskValue} 
                    onChangeText={setTasksValue} 
                    autoCapitalize="none"
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
                <Button 
                    title="Add Tarefa" 
                    onPress={() => addTasks()}
                    color="#00ff00"
                />
                <View
                    style={{
                        flex: 1,
                        marginTop: 30
                    }}
                >
                    <FlatList
                        data={listTasks()}
                        renderItem={({ index, item }) => <Item {...item} index={index} />}
                        keyExtractor={item => parseInt(item.id)}
                    />
                </View>
            </View>
        </View>
    );
}
