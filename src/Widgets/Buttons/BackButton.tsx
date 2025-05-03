
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { RootState } from '../../store/store'
import styled from 'styled-components'

type Props = {}

export default function BackButton({ }: Props) {
    const navigate = useNavigate()
    const category = useSelector((state: RootState) => state.category.category)

    const handleBack = () => {
        switch (category) {
            case "Expense":
                navigate("/expense")
                break
            case "Income":
                navigate("/income")
                break
            default:
                navigate("/")
        }
    }

    return (
        <ReturnButton onClick={handleBack}>Back</ReturnButton>
    )
}

const ReturnButton = styled.button`
background-color: transparent;
padding: 10px 15px;
border: none;
color: white;
position: fixed;
top: 40px;
left: 40px;
z-index: 1000;
cursor: pointer;
`