import styled from "styled-components"
import CategoryPresetItem from "./CategoryPresetItem"
import SubTitle from "./SubTitle"
import { useState } from "react"



type Props = {
    onPresetSelect?: (title: string, img: string) => void
}

export default function CategoryCustomList({ onPresetSelect }: Props) {
    const [customCatList, setCustomCatList] = useState<string[]>([])

    return (
        <>
            {<p>no items</p>}
            <WrapperList>
                {customCatList.map((cat, id) => (
                    <CategoryPresetItem
                        key={id}
                        title={cat}
                        img="/img/taxes_category.svg"
                        onClick={onPresetSelect}
                    />
                ))}
            </WrapperList>
        </>
    )
}



const WrapperList = styled.div`
margin: 20px 0px;
display: flex;
justify-content: space-between;
`