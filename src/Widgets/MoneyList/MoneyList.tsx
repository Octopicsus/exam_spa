import { useDispatch, useSelector } from "react-redux"
import { moneyAdapter, MoneyItem } from "../../store/features/moneyHistorySlice"
import { RootState } from "../../store/store"
import MoneyActionItem from "./MoneyActionItem"
import styled from "styled-components"
import { setSelectedMoneyItemId } from "../../store/features/selectedMoneyActionSlice"
import { Link } from "react-router"
import { LINK_ROUTES } from "../../enums/routes"
import { formatDate } from "../../utils/formatDate"

function getDates(moneyActions: MoneyItem[]): string[] {
  const uniqueDates = new Set<string>()

  moneyActions.forEach(action => {
    uniqueDates.add(action.date)
  })

  return Array.from(uniqueDates).sort((a, b) => {
    const dateA = new Date(a)
    const dateB = new Date(b)
    return dateB.getTime() - dateA.getTime()
  })
}

function getActionsByDate(moneyActions: MoneyItem[], Date: string): MoneyItem[] {
  return moneyActions.filter(action => action.date === Date)
}

function getSortedList(moneyActions: MoneyItem[], category: string): MoneyItem[] {
  return moneyActions
    .filter((moneyAction: MoneyItem) => moneyAction.type === category)
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`)
      const dateB = new Date(`${b.date}T${b.time}`)
      return dateB.getTime() - dateA.getTime()
    })
}

function groupActionsByDate(moneyActions: MoneyItem[]): Record<string, MoneyItem[]> {
  const datesList = getDates(moneyActions)
  const result: Record<string, MoneyItem[]> = {}

  datesList.forEach(date => {
    result[date] = getActionsByDate(moneyActions, date)
  })
  return result
}


export default function MoneyList() {
  const category = useSelector((state: RootState) => state.category.category)
  const dispatch = useDispatch()
  const selectAll = moneyAdapter.getSelectors(
    (state: RootState) => state.moneyHistory
  ).selectAll
  const moneyAction = useSelector(selectAll)

  const sortedList = getSortedList(moneyAction, category)
  const groupedByDate = groupActionsByDate(sortedList)

  return (
    <>
      <ul>
        {Object.entries(groupedByDate).map(([date, actions]) => (
          <DateGroup key={date}>
            <DateHeader>{formatDate(date, 'day-month')}</DateHeader>
            {actions.map((moneyAction: MoneyItem, index) => (
              <List key={moneyAction.id}>
                <Link
                  to={LINK_ROUTES.MONEY_ITEM}
                  onClick={() => dispatch(setSelectedMoneyItemId(moneyAction.id))}
                >
                  <MoneyActionItem
                    title={moneyAction.title}
                    amount={moneyAction.amount}
                    date={moneyAction.date}
                    time={moneyAction.time}
                    img={moneyAction.img}
                    isFirst={index === 0}
                    isLast={index === actions.length - 1}
                  />
                </Link>
              </List>
            ))}
          </DateGroup>
        ))}
      </ul>
    </>
  )
}

const List = styled.li`
  display: flex;
  justify-content: center;
`

const DateGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const DateHeader = styled.h3`
  text-align: left;
  width: 300px;
  margin: 10px 0;
  font-size: 16px;
  font-weight: 600;
  color: #9b9b9b;
`



