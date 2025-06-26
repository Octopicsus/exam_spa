import styled from "styled-components"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"

export default function AccountInfo() {
  const { user } = useSelector((state: RootState) => state.auth)
  
  // Добавляем отладочную информацию
  console.log('AccountInfo: Current user:', user);

  return (
    <Wrapper>
        <Avatar/>
        <AccountName>{user?.email || 'User'}</AccountName>
    </Wrapper>
  )
}


const Wrapper = styled.div`
margin-right: 30px;
display: flex;
align-items: center;
gap: 10px;
`

const Avatar = styled.div`
width: 40px;
height: 40px;
background-color: #292929;
border-radius: 50px;
`

const AccountName = styled.h5`
font-weight: 400;
color: white;
margin: 0;
opacity: 0.8;
`
