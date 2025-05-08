import styled from "styled-components"

export type Props = {
  title: string
  img: string
  onClick: (title: string, img: string) => void
}

export default function CategoryPresetItem({ title, img, onClick }: Props) {
  return (
    <Button type="button" onClick={() => onClick(title, img)}>
      <Icon src={img} alt={title} />
      <Desc>{title}</Desc>
    </Button>
  )
}

const Icon = styled.img`
width: 34px;
`

const Desc = styled.h5`
font-size: 14px;
font-weight: 300;
`

const Button = styled.button`
background-color: transparent;
border: none;
cursor: pointer;
`