import styled from 'styled-components/native'

export const Container = styled.View`
    display: ${({ active }) => active ? 'flex' : 'none'};
    height: 50px;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${({ type }) => 
        type === 'failure' 
            ? '#D71535' 
            : type === 'success'
            ? '#00ff00'
            : '#C0C0C0'};
`;

export const Text = styled.Text`
    color: #fff;
    font-weight: bold;
    letter-spacing: 4px;
`;