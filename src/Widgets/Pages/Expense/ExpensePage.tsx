import { useNavigate } from "react-router"
import InputButton from "../../Buttons/InputButton"

type Props = {}

export default function ExpensePage({ }: Props) {
    const navigate = useNavigate()

    return (
        <>
            <div>Expense Page</div>
            <InputButton
                onClick={() => navigate("/moneyinputpage")}
            />
        </>
    )
}