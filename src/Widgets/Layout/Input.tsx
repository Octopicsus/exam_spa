import React from 'react';
import styled from 'styled-components';


interface Props {
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    className?: string;
}

export default function Input({
    type = 'text',
    placeholder = '',
    value = '',
    onChange,
    error = '',
    className = ''
}: Props) {
    return (
        <InputContainer className={className}>
            <InputField
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                hasError={!!error}
            />
            <ErrorMessage>{error}</ErrorMessage>
        </InputContainer>
    );
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const InputField = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== 'hasError',
})<{ hasError: boolean }>`
  padding: 12px 16px;
  border: 1px solid ${props => props.hasError ? '#dc3545' : '#787878'};
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  width: 320px;

  &:focus {
    border-color: ${props => props.hasError ? '#dc3545' : '#007bff'};
  }
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 14px;
  margin-top: 4px;
  min-height: 14px;
  display: block;
`;