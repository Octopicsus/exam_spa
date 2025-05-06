import { useDispatch, useSelector } from "react-redux"
import BackButton from "../../Buttons/BackButton"
import { RootState } from "../../../store/store"
import { deleteItem, moneyAdapter } from "../../../store/features/moneyHistorySlice"
import { useNavigate } from "react-router"
import getCategoryPath from "../../../utils/categoryPath"
import EditButton from "../../Buttons/EditButton"
import { LINK_ROUTES } from "../../../enums/routes"

export default function MoneyItemPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useSelector((state: RootState) => state.selectedMoneyItem.id)

  const selectedById = moneyAdapter.getSelectors(
    (state: RootState) => state.moneyHistory
  ).selectById

  const item = useSelector((state: RootState) => (id !== null ? selectedById(state, id) : null))

  const handleDelete = () => {
    if (id !== null && item) {
      dispatch(deleteItem(id))
      navigate(getCategoryPath(item.type))
    }
  }

  const handleMoveToEditPage = () => {
    navigate(LINK_ROUTES.MONEY_INPUT, { state: { item } })
  }

  return (
    <>
      <h3>{item?.title}</h3>
      <div>
        <div>
          <p>Amount: {item?.amount}</p>
        </div>
        <div>
          <p>Type: {item?.type}</p>
        </div>
        <div>
          <p>Comments</p>
        </div>
        <div>
          <p>Date: {item?.date}</p>
        </div>
        <div>
          <p>Time: {item?.time}</p>
        </div>
      </div>
      <button onClick={handleDelete}>Delete</button>
      <BackButton />
      <EditButton onClick={handleMoveToEditPage} />
    </>
  )
}