import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { RootState, AppDispatch } from '../../store/store';
import { fetchUsers } from '../../store/features/usersSlice';
import { logout } from '../../store/features/authSlice';
import { LINK_ROUTES } from '../../enums/routes';
import colors from '../../ui/colorsPalette';

export default function UsersList() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { users, isLoading, error, total } = useSelector((state: RootState) => state.users);
    const { user: currentUser } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleGoBack = () => {
        navigate(LINK_ROUTES.EXPENSE);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <Wrapper>
                <LoadingMessage>Loading users...</LoadingMessage>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <Header>
                <div>
                    <BackButton onClick={handleGoBack}>← Back to application</BackButton>
                    <Title>Users List</Title>
                </div>
                <UserInfo>
                    <span>Welcome, {currentUser?.email}!</span>
                    <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                </UserInfo>
            </Header>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <StatsContainer>
                <StatItem>
                    <StatLabel>Total users:</StatLabel>
                    <StatValue>{total}</StatValue>
                </StatItem>
            </StatsContainer>

            <UsersContainer>
                {users.length === 0 ? (
                    <EmptyMessage>No users found</EmptyMessage>
                ) : (
                    users.map((user) => (
                        <UserCard key={user.id}>
                            <UserEmail>{user.email}</UserEmail>
                            <UserMeta>
                                <MetaItem>
                                    <MetaLabel>ID:</MetaLabel>
                                    <MetaValue>{user.id}</MetaValue>
                                </MetaItem>
                                <MetaItem>
                                    <MetaLabel>Registration date:</MetaLabel>
                                    <MetaValue>{formatDate(user.createdAt)}</MetaValue>
                                </MetaItem>
                                {user.updatedAt && user.updatedAt !== user.createdAt && (
                                    <MetaItem>
                                        <MetaLabel>Last updated:</MetaLabel>
                                        <MetaValue>{formatDate(user.updatedAt)}</MetaValue>
                                    </MetaItem>
                                )}
                            </UserMeta>
                        </UserCard>
                    ))
                )}
            </UsersContainer>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 30px;
    
    > div:first-child {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
`;

const BackButton = styled.button`
    background: none;
    border: 1px solid ${colors.brandColor};
    color: ${colors.brandColor};
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
    
    &:hover {
        background-color: ${colors.brandColor};
        color: white;
    }
`;

const Title = styled.h1`
    color: #333;
    margin: 0;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    
    span {
        color: #666;
        font-size: 14px;
    }
`;

const LogoutButton = styled.button`
    background-color: #ff4444;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    
    &:hover {
        background-color: #cc3333;
    }
`;

const StatsContainer = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
`;

const StatItem = styled.div`
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    min-width: 200px;
`;

const StatLabel = styled.div`
    color: #666;
    font-size: 14px;
    margin-bottom: 8px;
`;

const StatValue = styled.div`
    color: #333;
    font-size: 24px;
    font-weight: bold;
`;

const UsersContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 20px;
`;

const UserCard = styled.div`
    background-color: white;
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
`;

const UserEmail = styled.h3`
    color: ${colors.brandColor};
    margin: 0 0 15px 0;
    font-size: 18px;
`;

const UserMeta = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const MetaItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const MetaLabel = styled.span`
    color: #666;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 500;
`;

const MetaValue = styled.span`
    color: #333;
    font-size: 14px;
`;

const LoadingMessage = styled.div`
    text-align: center;
    padding: 40px;
    color: #666;
    font-size: 18px;
`;

const ErrorMessage = styled.div`
    color: #ff4444;
    background-color: #ffe6e6;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    text-align: center;
`;

const EmptyMessage = styled.div`
    text-align: center;
    padding: 40px;
    color: #666;
    font-size: 16px;
    grid-column: 1 / -1;
`;
