import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { symbol } from 'prop-types';

const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.background};
    align-items: center;
    justify-content: center;
`;

const Title = styled.Text`
    font-size: 40px;
    font-weight: 600;
    color: ${({theme}) => theme.main};
    width: 100%;
    align-items: flex-end;
    padding: 0 20px;
`;

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Text>new Project</Text>
                <StatusBar style="auto" />
            </Container>
        </ThemeProvider>
    );
}

