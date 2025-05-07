import styled from "styled-components"
import colors from "../../colors/colorsPalette"

type  Events = {
    onClick: () => void,
}

export default function InputButton({ onClick}:  Events) {
    return (
        <Button
            onClick={onClick}
            type="button"
        >
            +
        </Button>
    )
}

const Button = styled.button`
width: 40px;
height: 40px;
border-radius: 50%;
background-color: ${colors.brandColor};
color: black;
border: none;
font-size: 28px;
font-weight: bolder;
cursor: pointer;
position: absolute;
bottom: 20px;
right: 20px;
`