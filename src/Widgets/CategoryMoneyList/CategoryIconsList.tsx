import { useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components"
import SubTitle from "./SubTitle"

type CategoryIcon = {
  img: string
}

type Props = {
  onIconSelect?: (img: string) => void
}

export default function CategoryIconsList({ onIconSelect }: Props) {
  const [icons, setIcons] = useState<CategoryIcon[]>([])


  useEffect(() => {
    const getIcons = async () => {
      try {
        const res = await axios.get("/data/iconsCategories.json")
        setIcons(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    getIcons()
  }, [])

  return (
    <div>
      <SubTitle title="Style" />
      <WrapperList>
        {icons.map((icon, id) => (
          <Wrapper key={id} onClick={() => onIconSelect?.(icon.img)}>
            <Icon src={icon.img} />
          </Wrapper>
        ))}
      </WrapperList>
    </div>
  )
}

const WrapperList = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
margin-bottom: 30px;
`

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 34px;
height: 34px;
border-radius: 50%;
background-color: #636363;
cursor: pointer;
`

const Icon = styled.img`
background-position: center;
width: 20px;
height: 20px;

`