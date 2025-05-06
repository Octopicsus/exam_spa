import styled from "styled-components"

type CatValues = {
    value: number
}

export default function SubBalance({ value }: CatValues) {
    return (
        <ShowValue>{value}</ShowValue>
    )
}

const ShowValue = styled.h4`
color: #ffb700;
width: 300px;
`

