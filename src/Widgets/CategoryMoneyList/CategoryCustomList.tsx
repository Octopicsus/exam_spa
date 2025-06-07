import styled from "styled-components"
import CategoryPresetItem from "./CategoryPresetItem"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { useLocation } from "react-router"
import { LINK_ROUTES } from "../../enums/routes"
import { removeCustomCategory } from "../../store/features/customCategorySlice"

type Props = {
    onPresetSelect?: (title: string, img: string) => void
    type: string
}

export default function CategoryCustomList({ onPresetSelect, type }: Props) {
    const customCatList = useSelector((state: RootState) => state.customCategory.list)
    const dispatch = useDispatch()
    const location = useLocation()

    const filteredList = customCatList.filter(cat => cat.type === type)

    const isCustomCategoryPage = location.pathname.includes(LINK_ROUTES.CUSTOM_CATEGORY)

const handleClick = (title: string, img: string) => {
    const cat = { title, img, type }
    if (isCustomCategoryPage) {
        dispatch(removeCustomCategory(cat))
    } else if (onPresetSelect) {
        onPresetSelect(title, img)
    }
}

    return (
        <>
            {filteredList.length === 0 && <p>no items</p>}
            <ListWrapper>
                <ul>
                    {filteredList.map((cat, id) => (
                        <li key={id}>
                            <CategoryPresetItem
                                title={cat.title}
                                img={cat.img}
                                onClick={handleClick}
                            />
                        </li>
                    ))}
                </ul>
            </ListWrapper>
        </>
    )
}

const ListWrapper = styled.div`
  margin-top: 20px;
  ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 12px;
  }
`