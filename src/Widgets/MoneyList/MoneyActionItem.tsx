import { useNavigate } from "react-router"
import styled from "styled-components"
import { LINK_ROUTES } from "../../enums/routes"

type Props = {
  title: string,
  amount: number,
  date: string,
  time: string,
  img: string
}

export default function MoneyActionItem({ title, amount, time, img }: Props) {
  const navigate = useNavigate()

  function handleOpenItem() {
    navigate(LINK_ROUTES.MONEY_ITEM)
  }

  const formattedTime = time.slice(0, 5)

  return (
    <ActionItemButton onClick={handleOpenItem}>
      <IconCategory src={img}/>
      <TitleWrapper>
        <Title>{title}</Title>
        <Time>{formattedTime}</Time>
      </TitleWrapper>
      <Amount>{amount}</Amount>
    </ActionItemButton>
  )
}

const ActionItemButton = styled.button`
display: flex;
justify-content: space-between;
background-color: #4a4a4a39;
width: 300px;
margin-bottom: 5px;
padding-top: 10px;
padding-bottom: 10px;
padding-left: 16px;
cursor: pointer;
box-sizing: border-box;
border: none;

&:hover{
  background-color: #8c8c8c39;
}
`

const Title = styled.h4`
width: 150px;
text-align: left;
color: #ebebeb;
`

const Amount = styled.h4`
width: 60px;
text-align: right;
font-size: 18px;
padding-right: 16px;
`

const TitleWrapper = styled.div`
display: flex;
flex-direction: column;
`

const Time = styled.h6`
color: #7f7f7f;
text-align: left;
margin-top: 4px;
font-size: 12px;
`

const IconCategory = styled.img`
width: 34px;
height: 34px;

`