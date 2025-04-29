
import styled from "styled-components";
import { setCategory } from "../../store/features/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";


export const Header = () => {
    const dispatch = useDispatch()
    const category = useSelector((state: RootState) => state.category.category)

    return (
        <HeaderWrapper>
            <CategoryButton
                type="button"
                active={category === "Expense"}
                onClick={() => dispatch(setCategory("Expense"))}
            >
                Expenses
            </CategoryButton>

            <CategoryButton
                type="button"
                active={category === "Income"}
                onClick={() => dispatch(setCategory("Income"))}
            >
                Income
            </CategoryButton>
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.header`
  display: flex;
  width: 30%;
  justify-content: space-between;
  margin: 0 auto;
`;

const CategoryButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border: none;
  background: ${({ active }) => (active ? "#ffffff" : "#787878")};
  color: ${({ active }) => (active ? "#2f2f2f" : "#ffffff")};
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
`;





