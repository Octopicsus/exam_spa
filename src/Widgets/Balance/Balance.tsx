import styled from "styled-components"
import { moneyAdapter } from "../../store/features/moneyHistorySlice"
import { RootState } from "../../store/store"
import { useSelector } from "react-redux"
import { getBalance } from "../../utils/balanceCalc"

export default function Balance() {
  const selectAll = moneyAdapter.getSelectors(
    (state: RootState) => state.moneyHisory
  ).selectAll

  const items = useSelector(selectAll)
  const balance = getBalance(items)

  return (
    <>
      <BalanceValue>{balance}</BalanceValue>
    </>
  );
}

const BalanceValue = styled.div`
   font-size: 80px;
`