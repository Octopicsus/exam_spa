import styled from "styled-components"
import colors from "../../colors/colorsPalette"

type CatValues = {
    value: number
}

export default function SubBalance({ value }: CatValues) {
    return (
        <ShowValue>{value}</ShowValue>
    )
}

const ShowValue = styled.h4`
color: ${colors.brandColor};
width: 300px;
`

