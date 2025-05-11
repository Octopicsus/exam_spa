import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import CategoryPresetItem from "./CategoryPresetItem"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import SubTitle from "./SubTitle"

export type CategoryType = {
    title: string
    img: string
}

export type Props = {
    onClick: (title: string, img: string) => void
}

export default function CategoryMoneyList({ onClick }: Props) {
    const category = useSelector((state: RootState) => state.category.category)

    const categoryType = category.toLowerCase()

    const [categories, setCategories] = useState<CategoryType[]>([])

    useEffect(() => {
        const getCategories = async () => {
            try {
                const result = await axios.get("data/categories.json")
                setCategories(result.data[categoryType])
            } catch {
                setCategories([])
            }
        }
        getCategories()
    }, [])

    return (
        <>
            <SubTitle title="Presets" />
            <ListWrapper>
                <ul>
                    {categories.map(cat => (
                        <li key={cat.title}>
                            <CategoryPresetItem
                                title={cat.title}
                                img={cat.img}
                                onClick={onClick}
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

