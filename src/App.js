import React from 'react';
import { StatusBar } from 'react-native';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './theme';

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({theme}) => theme.background};
    align-items: center;
    justify-content: flex-start;
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
                <Title>new Project</Title>
                <StatusBar 
                    barStyle="light-content"
                    backgroundColor={theme.background}
                />
            </Container>
        </ThemeProvider>
    );
}

