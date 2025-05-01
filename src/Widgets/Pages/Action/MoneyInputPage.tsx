
import { useSelector } from "react-redux"
import BackButton from "../../Buttons/BackButton"
import { RootState } from "../../../store/store"
import styled from "styled-components"

type Props = {}

export default function MoneyInputPage({ }: Props) {

  const category = useSelector((state: RootState) => state.category.category)
  const pageTitle = category

  return (
    <MoneyPageInput>
      <div>
        <h2>{pageTitle}</h2>
        <input type="number" name="moneyInput" />
        <h4>Category: ...</h4>
        <h4>Date: ...</h4>
        <SubmitButton>Add</SubmitButton>
      </div>

      <BackButton />
    </MoneyPageInput>
  )
}

const MoneyPageInput = styled.div`
 height : 100vh;
 position: relative;
`

const SubmitButton = styled.button`
background-color: transparent;
color:  #ffb700;
border: solid 1px  #ffb700;
padding: 8px 20px;
font-weight: bolder;
border-radius: 20px;
cursor: pointer;
margin-top: 30px;
`