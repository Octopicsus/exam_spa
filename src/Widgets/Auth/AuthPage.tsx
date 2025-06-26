import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { registerUser, loginUser, clearError } from '../../store/features/authSlice';
import Input from '../Layout/Input';
import styled from 'styled-components';
import colors from '../../ui/colorsPalette';

export default function AuthPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(clearError());
        setEmailError('');
        setPasswordError('');
    }, [isLoginMode, dispatch]);

    const validateForm = () => {
        let isValid = true;

        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Invalid email format');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.length < 4) {
            setPasswordError('Password must contain at least 4 characters');
            isValid = false;
        } else if (password.length > 124) {
            setPasswordError('Password must contain at most 124 characters');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            if (isLoginMode) {
                await dispatch(loginUser({ email, password })).unwrap();
            } else {
                await dispatch(registerUser({ email, password })).unwrap();
            }
        } catch (error) {
            console.error('Auth error:', error);
        }
    };

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
        setEmail('');
        setPassword('');
        setEmailError('');
        setPasswordError('');
    };

    if (isAuthenticated) {
        return (
            <Wrapper>
                <SuccessMessage>
                    You have successfully {isLoginMode ? 'logged in' : 'registered'}!
                </SuccessMessage>
            </Wrapper>
        );
    }

    return (
        <div>
            <Wrapper>
                <form onSubmit={handleSubmit}>
                    <BrandHeader>Finance Tracker</BrandHeader>
                    <Title>{isLoginMode ? 'Login' : 'Registration'}</Title>

                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    <Input
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        error={emailError}
                    />

                    <Input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        error={passwordError}
                    />

                    <NavigationWrapper>

                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Loading...' : (isLoginMode ? 'Login' : 'Register')}
                        </Button>

                        <ToggleButton type="button" onClick={toggleMode}>
                            {isLoginMode ? 'No account? Register' : 'Have account? Login'}
                        </ToggleButton>
                    </NavigationWrapper>
                </form>
            </Wrapper>
        </div>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`

const NavigationWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const Title = styled.h3`
    text-align: left;
    margin-bottom: 18px;
    color: #555555;
    margin-left: 0;
    font-size: 18px;
    font-weight: 700;
`

const Button = styled.button`
    font-weight: bold;
    margin-top: 30px;
    padding: 10px 30px;
    width: auto;
    color: black;
    border: none;
    background-color: ${colors.brandColor};
    cursor: pointer;
    opacity: ${props => props.disabled ? 0.6 : 1};
    
    &:disabled {
        cursor: not-allowed;
    }
`

const ToggleButton = styled.button`
    background: none;
    border: none;
    color: ${colors.brandColor};
    cursor: pointer;
    margin-top: 15px;
    text-decoration: underline;
    font-size: 14px;
`;

const ErrorMessage = styled.div`
    color: #ff4444;
    background-color: #ffe6e6;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 15px;
    font-size: 14px;
`

const SuccessMessage = styled.div`
    color: #22bb33;
    background-color: #e8f5e8;
    padding: 20px;
    border-radius: 8px;
    font-size: 18px;
    text-align: center;
`

const BrandHeader = styled.h3`
    margin-bottom: 28px;
    font-size: 28px;
`