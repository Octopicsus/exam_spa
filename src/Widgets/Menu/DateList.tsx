import { useSelector } from "react-redux"
import styled from "styled-components"
import { RootState } from "../../store/store"
import { moneyAdapter } from "../../store/features/moneyHistorySlice"
import { getSortedList, groupActionsByDate } from "../MoneyList/MoneyList"
import { formatDate } from "../../utils/formatDate"

type Props = {
    onMonthSelect?: (month: string) => void
}

function monthList(groupedByDate: any) {
    const currentYear = new Date().getFullYear();
    const monthsWithActions = Object.keys(groupedByDate).map(dateKey => {
        const date = new Date(dateKey);
        const year = date.getFullYear();

        return year === currentYear
            ? formatDate(dateKey, 'month-only')
            : formatDate(dateKey, 'month-year');
    });
    const monthList = [...new Set(monthsWithActions)];

    return monthList;
}

export default function DateList({ onMonthSelect }: Props) {
    const category = useSelector((state: RootState) => state.category.category)
    const selectAll = moneyAdapter.getSelectors(
        (state: RootState) => state.moneyHistory
    ).selectAll
    const moneyAction = useSelector(selectAll)
    const sortedList = getSortedList(moneyAction, category)
    const groupedByDate = groupActionsByDate(sortedList)
    const months = monthList(groupedByDate)

    const handleMonthClick = (month: string) => {
        if (onMonthSelect) {
            onMonthSelect(month)
        }
    }

    return (
        <Wrapper>
            <List>
                {months.map((month, index) => (
                    <Item key={index} onClick={() => handleMonthClick(month)}>{month}</Item>
                ))}
            </List>
        </Wrapper>
    )
}

const Wrapper = styled.div`
display: flex;
align-items: center;
height: 40px;
width: 100%;
padding: 0 10px;
box-sizing: border-box;
position: sticky;
top: 20px;
z-index: 1000;
`

const List = styled.ul`
display:flex ;
gap: 10px;
overflow-x: scroll;
direction: rtl;
`

const Item = styled.li`
list-style: none;
font-size: small;
font-weight: 400;
padding: 6px 12px;
background-color: #343434;
border-radius: 15px;
white-space: nowrap;
cursor: pointer;

&:hover{
    background-color: gray;
}
`