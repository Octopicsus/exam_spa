import { useState } from "react"
import styled from "styled-components";

type BalanceValue = {
  value: number
}


export const Balance = () => {
  const [value, setValue] = useState<BalanceValue>({ value: 0 })

  const addValue = () => {
    setValue({ value: value.value + 1 })
  }

  return (
    <>
      <BalanceValue>{value.value}</BalanceValue>
      <button onClick={addValue}>Add</button>
    </>
  )
}

const BalanceValue = styled.div`
   font-size: 80px;
`

