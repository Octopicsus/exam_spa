import { useNavigate } from "react-router"
import styled from "styled-components"
import { LINK_ROUTES } from "../../enums/routes"
import CategoryIconPlace from "../Placeholders/CategoryIconPlace"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import getAmountSign from "../../utils/getAmountSign"
import { useEffect, useState } from "react"
import { formatAmount } from "../../utils/balanceCalc"

type Props = {
  title: string,
  desc?: string,
  amount: number,
  date: string,
  time: string,
  img: string,
  color: string,
  isFirst?: boolean,
  isLast?: boolean
}

export default function MoneyActionItem({ title, desc, amount, time, img, color, isFirst, isLast }: Props) {
  const navigate = useNavigate()
    const currency = useSelector((state: RootState) => state.currency)
  const category = useSelector((state: RootState) => state.category.category)
    const [currencySign, setCurrencySign] = useState("zł")
  
    useEffect(() => {
      const fetchCurrencySign = async () => {
        try {
          const response = await fetch('/data/currency.json')
          const data = await response.json()
          const selectedCurrency = data.currencies.find(
            (curr: any) => curr.code === currency.to
          )
          if (selectedCurrency) {
            setCurrencySign(selectedCurrency.sign)
          }
        } catch (error) {
          console.error(error)
        }
      }
  
      fetchCurrencySign()
    }, [currency.to])

  

  function handleOpenItem() {
    navigate(LINK_ROUTES.MONEY_ITEM)
  }

  const formattedTime = time.slice(0, 5)

  return (
    <ActionItemButton onClick={handleOpenItem} $isFirst={isFirst} $isLast={isLast}>
      <Wrapper>
        <CategoryIconPlace img={img} color={color}/>
        <TitleWrapper>
          {desc && <Desc>{desc}</Desc>}
          <Category $hasDesc={!!desc}>{title}</Category>
          <Time>{formattedTime}</Time>
        </TitleWrapper>
      </Wrapper>
      <Amount>{getAmountSign(category)} {formatAmount(amount)} 
        <Sign>
           {currencySign}
        </Sign>
        </Amount>
    </ActionItemButton>
  )
}

const ActionItemButton = styled.button<{ $isFirst?: boolean; $isLast?: boolean }>`
  display: flex;
  justify-content: space-between;
  background-color: #1c1c1c;
  width: 300px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  cursor: pointer;
  box-sizing: border-box;
  border: none;
  border-radius: ${props => {
    if (props.$isFirst && props.$isLast) return '8px'
    if (props.$isFirst) return '8px 8px 0 0'
    if (props.$isLast) return '0 0 8px 8px'
    return '0'
  }};

  &:hover {
    background-color: #8c8c8c39;
  }
`

const Wrapper = styled.div`
display: flex;
align-items: center;
`

const Category = styled.h4<{ $hasDesc?: boolean }>`
width: 80px;
text-align: left;
font-size: ${props => props.$hasDesc ? '12px' : '14px'};
font-weight: ${props => props.$hasDesc ? '300' : '700'};
color: ${props => props.$hasDesc ? '#7b7b7b' : '#c6c6c6'};
margin-top: 2px;
`

const Desc = styled.h4`
width: 80px;
font-size: 14px;
text-align: left;
color: #c6c6c6;
`

const Amount = styled.h4`
width: 150px;
text-align: right;
font-size: 18px;
padding-right: 12px;

`

const TitleWrapper = styled.div`
display: flex;
flex-direction: column;
padding-left: 16px;
`

const Time = styled.h6`
color: #808080;
text-align: left;
margin-top: 6px;
font-size: 12px;
`

const Sign = styled.span`
font-size: 15px;
margin-left: 4px;
color: #ffffff;
font-weight: 600;
`