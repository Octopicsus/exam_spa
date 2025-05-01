import styled from "styled-components"


type Event = { onClick?: () => void }

export default function InputButton({ onClick }: Event) {
    return (
        <Button onClick={onClick}>+</Button>
    )
}

const Button = styled.button`
width: 40px;
height: 40px;
border-radius: 50%;
background-color: #ffb700;
color: black;
border: none;
font-size: 28px;
font-weight: bolder;
cursor: pointer;
`