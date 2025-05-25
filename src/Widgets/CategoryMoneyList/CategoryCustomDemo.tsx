
import styled from "styled-components"


type Props = {
    title: string
    img?: string
}

export default function CategoryCustomDemo({ title, img }: Props) {
   

    return (
        <DemoWrapper>
            <Content>
                <IconWrapper>
                    <ICON src={img} />
                </IconWrapper>
                <Title>{title}</Title>
            </Content>
        </DemoWrapper>
    )
}

const DemoWrapper = styled.div`
background-color: #555555;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const IconWrapper = styled.div`
margin-top: 20px;
margin-bottom: 5px;
display: flex;
justify-content: center;
align-items: center;
width: 64px;
height: 64px;
background-color: #7f7f7f;
border-radius: 50%;

`

const ICON = styled.img`
width: 42px;
`

const Title = styled.div`
    font-size: 20px;
    margin-bottom: 20px;
`