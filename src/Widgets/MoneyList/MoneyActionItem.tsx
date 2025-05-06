import { useNavigate } from "react-router"
import styled from "styled-components"
import { LinkRoutes } from "../../enums/routes"

type Props = {
  title: string,
  amount: number
}

export default function MoneyActionItem({ title, amount }: Props) {
  const navigate = useNavigate()

  function handleOpenItem() {
    navigate(LinkRoutes.MONEY_ITEM)
  }

  return (
    <ActionItemButton onClick={handleOpenItem}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </ActionItemButton>
  )
}

const ActionItemButton = styled.button`
display: flex;
justify-content: space-between;
background-color: #8080803a;
width: 300px;
margin-bottom: 5px;
padding-top: 10px;
padding-bottom: 10px;
padding-left: 20px;
cursor: pointer;
box-sizing: border-box;
border: none;

&:hover{
  background-color: #b1b1b139;
}
`

const Title = styled.h4`
width: 150px;
text-align: left;
opacity: 50%;
`

const Amount = styled.h4`
width: 60px;
text-align: center;
`