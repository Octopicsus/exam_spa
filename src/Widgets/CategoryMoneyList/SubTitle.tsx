import styled from "styled-components"


type Props = {
    title: string
}

export default function SubTitle({ title }: Props) {
    return (
        <Title>{title}</Title>
    )
}

const Title = styled.h3`
    margin-top: 16px;
    font-size: 14px;
    text-align: left;
    font-weight: 700;
`