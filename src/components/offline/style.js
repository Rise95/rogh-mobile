import styled from 'styled-components/native'

export const Container = styled.View`
    display: ${({ active }) => active ? 'flex' : 'none'};
    height: 50px;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #c0c0c0;
`;

export const Text = styled.Text`
    color: #000;
    font-weight: bold;
    letter-spacing: 4px;
`;