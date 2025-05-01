
import styled from "styled-components";

type BalanceValue = {
  value: number
}

export default function Balance() {
 

 
  return (
    <>
      <BalanceValue>{0}</BalanceValue>
 
    </>
  )
}

const BalanceValue = styled.div`
   font-size: 80px;
`

