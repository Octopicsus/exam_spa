import { useNavigate } from "react-router"
import InputButton from "../../Buttons/InputButton"
import { RootState } from "../../../store/store"
import { moneyAdapter } from "../../../store/features/moneyHistorySlice"
import { useDispatch, useSelector } from "react-redux"
import { getIncome } from "../../../utils/balanceCalc"
import SubBalance from "../../Balance/SubBalance"
import MoneyList from "../../MoneyList/MoneyList"
import { LinkRoutes } from "../../../enums/routes"
import styled from "styled-components"
import { setCategory } from "../../../store/features/categorySlice"
import { CATEGORY } from "../../../enums/categoryTitles"

export default function IncomePage() {
    const selectAll = moneyAdapter.getSelectors(
        (state: RootState) => state.moneyHistory
    ).selectAll

    const itmes = useSelector(selectAll)
    const income = getIncome(itmes)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleInput = () => {
        dispatch(setCategory(CATEGORY.INCOME))
        navigate(LinkRoutes.MONEY_INPUT)
    }

    return (
        <>
            <div>Income Page</div>
            <SubBalance value={income} />
            <InfoGraph>
                <InputButton
                    onClick={handleInput}
                />
            </InfoGraph>
            <MoneyList />
        </>
    )
}

const InfoGraph = styled.div`
display: flex;
justify-content: center;
margin: 0 auto;
height: 200px;
width: 300px;
background-color: #80808028;
margin-bottom: 30px;
margin-top: 20px;
position: relative;
box-sizing: border-box;
`
