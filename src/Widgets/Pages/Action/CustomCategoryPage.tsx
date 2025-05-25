import styled from "styled-components"
import CategoryIconsList from "../../CategoryMoneyList/CategoryIconsList"
import CategoryCustomDemo from "../../CategoryMoneyList/CategoryCustomDemo"
import BackButton from "../../Buttons/BackButton"
import { useNavigate } from "react-router"
import { LINK_ROUTES } from "../../../enums/routes"
import CategoryCustomList from "../../CategoryMoneyList/CategoryCustomList"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { CATEGORY } from "../../../enums/categoryTitles"
import { useState } from "react"


type Props = {}

export default function CustomCategoryPage({ }: Props) {
    const navigate = useNavigate()
    const category = useSelector((state: RootState) => state.category.category)
    const [selectedCategory, setSelectedCategory] = useState(category)
    const [titleItem, setTitleItem] = useState("Title")
    const [selectedIcon, setSelectedIcon] = useState<string>("/public/img/custom_icon.svg")

    const handleCancel = () => {
        navigate(LINK_ROUTES.MONEY_INPUT)
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value)
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleItem(event.target.value)
    }

    const handleIconSelect = (img: string) => {
        setSelectedIcon(img)
    }


    return (
        <>
            <CustomCategoryPageInput>
                <div>Custom Title</div>
                <Form>
                    <InputWrapper>
                        <input type="text" name="categoryTitle" placeholder={titleItem} onChange={handleTitleChange} />
                        <select value={selectedCategory} onChange={handleSelectChange}>
                            <option value={CATEGORY.EXPENSE}>Expense</option>
                            <option value={CATEGORY.INCOME}>Income</option>
                        </select>
                    </InputWrapper>
                    <CategoryIconsList onIconSelect={handleIconSelect} />
                    <CategoryCustomDemo title={titleItem} img={selectedIcon} />
                    <CategoryCustomList />
                    <div>
                        <button type="reset" onClick={handleCancel}>Cancel</button>
                        <button type="submit">Add</button>
                    </div>
                </Form>
            </CustomCategoryPageInput>
        </>
    )
}


const CustomCategoryPageInput = styled.div`
height : 100vh;
position: relative;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const InputWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`

const Form = styled.form`
display: flex;
flex-direction: column;
`
