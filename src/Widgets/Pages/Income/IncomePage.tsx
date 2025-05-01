import { useNavigate } from "react-router"
import InputButton from "../../Buttons/InputButton"

type Props = {}

export default function IncomePage({ }: Props) {
    const navigate = useNavigate()

    return (
        <>
            <div>Income Page</div>
            <InputButton
                onClick={() => navigate("/moneyinputpage")}
            />
        </>
    )
}