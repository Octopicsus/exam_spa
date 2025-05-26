import { useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components"
import SubTitle from "./SubTitle"
import CategoryIconPlace from "../Placeholders/CategoryIconPlace"

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
            <CategoryIconPlace img={icon.img} />
          </Wrapper>
        ))}
      </WrapperList>
    </div>
  )
}

const WrapperList = styled.div`
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 10px;
list-style: none;
padding: 0;
margin: 20px 0;
border: 1px darkgray solid;
padding: 20px 8px ;
`

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;


cursor: pointer;
`

