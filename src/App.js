import React, { useState } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import Input from './components/input';
import Task from './components/Task';
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
    width: ${({width}) => width - 40}px;
`;

export default function App() {
    const width = Dimensions.get('window').width;
    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        alert(newTask);
        setNewTask('');
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Title>new Project</Title>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={theme.background}
                />
                <Input
                    placeholder="+ Add a Task"
                    value={newTask}
                    onChangeText={text => setNewTask(text)}
                    onSubmitEditing={addTask}
                />
                <List width={width}>
                    <Task text="React Native" />
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
                    <Task text="JavaScript" />
                </List>
                {/* <IconButton icon={icons.check} onPress={() => alert('check')} />
                <IconButton icon={icons.uncheck} onPress={() => alert('uncheck')} />
                <IconButton icon={icons.edit} onPress={() => alert('edit')} />
                <IconButton icon={icons.delete} onPress={() => alert('delete')} /> */}
            </Container>
        </ThemeProvider>
    );
}
