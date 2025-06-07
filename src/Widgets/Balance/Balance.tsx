import styled from "styled-components"
import { moneyAdapter } from "../../store/features/moneyHistorySlice"
import { RootState } from "../../store/store"
import { useSelector } from "react-redux"
import { getBalance, formatAmount } from "../../utils/balanceCalc"
import { useEffect, useState } from "react"
import { useCurrencyConverter } from "../../hooks/useCurrencyConverter"


export default function Balance() {
  const selectAll = moneyAdapter.getSelectors(
    (state: RootState) => state.moneyHistory
  ).selectAll

  const items = useSelector(selectAll)
  const currency = useSelector((state: RootState) => state.currency)
  const balance = getBalance(items)
  const [currencySign, setCurrencySign] = useState("zł")

  useCurrencyConverter()

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
        setCurrencySign("zł")
      }
    }

    fetchCurrencySign()
  }, [currency.to])

  return (
    <>
      <BalanceValue>
        {formatAmount(balance)}
        <Sign>
          {currencySign}
        </Sign>
      </BalanceValue>
    </>
  )
}

const BalanceValue = styled.div`
   font-size: 80px;
   font-weight: 600;
   display: flex;
   justify-content: center;
   align-items: center;
   gap: 10px;
   margin-bottom: 30px;
   margin-top: 80px;
   `

const Sign = styled.p`
 font-size: 50px; 
`