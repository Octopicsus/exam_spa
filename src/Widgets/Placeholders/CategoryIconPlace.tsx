import styled from "styled-components"

type Props = {
    img: string
    size?: string
}

export default function CategoryIconPlace({ img, size = "40px" }: Props) {
    return (
        <IconWrapper $size={size}>
            <Icon src={img} $size={size} />
        </IconWrapper>
    )
}

const IconWrapper = styled.div<{ $size: string }>`
    width: ${({ $size }) => $size};
    height: ${({ $size }) => $size};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: grey;
`

const Icon = styled.img<{ $size: string }>`
    width: calc(${({ $size }) => $size} * 0.65);
    height: calc(${({ $size }) => $size} * 0.65);
    object-fit: contain;
`