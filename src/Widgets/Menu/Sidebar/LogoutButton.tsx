import styled from "styled-components"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { AppDispatch } from "../../../store/store"
import { logoutUser } from "../../../store/features/authSlice"
import colors from "../../../ui/colorsPalette"

export default function LogoutButton() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      console.log('LogoutButton: Starting logout process...');
      await dispatch(logoutUser()).unwrap();
      console.log('LogoutButton: Logout successful, navigating to home...');
      navigate('/');
    } catch (error) {
      console.error('LogoutButton: Logout error:', error);
      // Даже если logout не удался, переходим на главную страницу
      navigate('/');
    }
  }

  return (
    <Button onClick={handleLogout}></Button>
  )
}

const Button = styled.button`
width: 34px;
height: 34px;
background: transparent;
background-image: url('/img/Layout/logout_icon.svg');
background-size: 20px 20px;
background-repeat: no-repeat;
background-position: center;
border: none;
outline: 1px solid white;
border-radius: 50%;
opacity: 0.2; 
cursor: pointer;
transition: all 0.3s ease;
filter: brightness(0) invert(1); 

&:hover {
  opacity: 0.8;
  outline: 2px solid ${colors.brandColor};
  filter: none; 
}
`