import { useNavigate } from "react-router"
import styled from "styled-components"
import { LINK_ROUTES } from "../../enums/routes"
import CategoryIconPlace from "../Placeholders/CategoryIconPlace"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

type Props = {
  title: string,
  amount: number,
  date: string,
  time: string,
  img: string,
  isFirst?: boolean,
  isLast?: boolean
}

function getbuttonLable(category: string): any {
  switch (category) {
    case 'Income':
      return "+"
    case 'Expense':
      return "-"
  }
}

export default function MoneyActionItem({ title, amount, time, img, isFirst, isLast }: Props) {
  const navigate = useNavigate()
  const category = useSelector((state: RootState) => state.category.category)

  function handleOpenItem() {
    navigate(LINK_ROUTES.MONEY_ITEM)
  }

  const formattedTime = time.slice(0, 5)

  return (
    <ActionItemButton onClick={handleOpenItem} $isFirst={isFirst} $isLast={isLast}>
      <Wrapper>
        <CategoryIconPlace img={img} />
        <TitleWrapper>
          <Title>{title}</Title>
          <Time>{formattedTime}</Time>
        </TitleWrapper>
      </Wrapper>
      <Amount>{getbuttonLable(category)} {amount}</Amount>
    </ActionItemButton>
  )
}

const ActionItemButton = styled.button<{ $isFirst?: boolean; $isLast?: boolean }>`
  display: flex;
  justify-content: space-between;
  background-color: #1c1c1c;
  width: 300px;
  margin-bottom: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  cursor: pointer;
  box-sizing: border-box;
  border: none;
  border-radius: ${props => {
    if (props.$isFirst && props.$isLast) return '8px';
    if (props.$isFirst) return '8px 8px 0 0';
    if (props.$isLast) return '0 0 8px 8px';
    return '0';
  }};

  &:hover {
    background-color: #8c8c8c39;
  }
`

const Wrapper = styled.div`
display: flex;
align-items: center;
`

const Title = styled.h4`
width: 80px;
text-align: left;
color: #ebebeb;
`

const Amount = styled.h4`
width: 150px;
text-align: right;
font-size: 18px;
padding-right: 16px;
`

const TitleWrapper = styled.div`
display: flex;
flex-direction: column;
padding-left: 16px;
`

const Time = styled.h6`
color: #7f7f7f;
text-align: left;
margin-top: 4px;
font-size: 12px;
`

