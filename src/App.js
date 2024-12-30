import React, { useState } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import Input from './components/input';
import Task from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
// import IconButton from './components/IconButton';
// import { icons } from './icons';

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    align-items: center;
    justify-content: flex-start;
`;

const Title = styled.Text`
    font-size: 40px;
    font-weight: 600;
    color: ${({ theme }) => theme.main};
    width: 100%;
    align-items: flex-end;
    padding: 0 20px;
`;

const List = styled.ScrollView`
    flex: 1;
    width: ${({ width }) => width - 40}px;
`;

export default function App() {
    const width = Dimensions.get('window').width;

    // const tempData = {
    //     '1': { id: '1', text: 'React Native', completed: false },
    //     '2': { id: '2', text: 'Expo', completed: true },
    //     '3': { id: '3', text: 'JavaScript', completed: false },
    // };

    const [tasks, setTasks] = useState({});

    const storeData = async tasks => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            setTasks(tasks);
        } catch (e) {
            //
        }
    };

    const getData = async () => {
        try {
            const loadedData = await AsyncStorage.getItem('tasks');
            setTasks(JSON.parse(loadedData || '{}'));
        } catch (e) {
            //
        }
    };

    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        if (newTask.length < 1) return;
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID]: { id: ID, text: newTask, completed: false },
        };
        setNewTask('');
        storeData({ ...tasks, ...newTaskObject});
        //setTasks({ ...tasks, ...newTaskObject });
    };

    const deleteTask = (id) => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        storeData(currentTasks);
        //setTasks(currentTasks);
    };

    const toggleTask = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        storeData(currentTasks);
        //setTasks(currentTasks);
    };

    const updateTask = item => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[item.id] = item;
        storeData(currentTasks);
        //setTasks(currentTasks);
    };

    const [isReady, setIsReady] = useState(false);

    return isReady ? (
        <ThemeProvider theme={theme}>
            <Container>
                <Title>TODO List</Title>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={theme.background}
                />
                <Input
                    placeholder="+ Add a Task"
                    value={newTask}
                    onChangeText={text => setNewTask(text)}
                    onSubmitEditing={addTask}
                    onBlur={() => setNewTask('')}
                />
                <List width={width}>
                    {Object.values(tasks).reverse().
                        map(item => (
                            <Task key={item.id}
                                item={item}
                                deleteTask={deleteTask}
                                toggleTask={toggleTask}
                                updateTask={updateTask}
                            />))}
                    {/* <Task text="React Native" />
                    <Task text="Expo" />
                    <Task text="JavaScript" />
                    <Task text="React Native" />
                    <Task text="Expo" />
                    <Task text="JavaScript" />
                    <Task text="React Native" />
                    <Task text="Expo" />
                    <Task text="JavaScript" />
                    <Task text="React Native" />
                    <Task text="Expo" />
                    <Task text="JavaScript" /> */}
                </List>
                {/* <IconButton icon={icons.check} onPress={() => alert('check')} />
                <IconButton icon={icons.uncheck} onPress={() => alert('uncheck')} />
                <IconButton icon={icons.edit} onPress={() => alert('edit')} />
                <IconButton icon={icons.delete} onPress={() => alert('delete')} /> */}
            </Container>
        </ThemeProvider>
    ) : (<AppLoading 
        startAsync={getData}
        onFinish={() => setIsReady(true)}
        onError={() => {}}
    />);
}
