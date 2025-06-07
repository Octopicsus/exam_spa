import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { setCurrency } from '../../store/features/currencySlice'

type Currency = {
    code: string
    sign: string
}

export default function SelectedCurrency() {
    const [currencies, setCurrencies] = useState<Currency[]>([])
    const dispatch = useDispatch()
    const currentCurrency = useSelector((state: RootState) => state.currency.to)
    
    const [selectedCurrency, setSelectedCurrency] = useState<string>(currentCurrency)

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await axios.get('/data/currency.json')
                setCurrencies(response.data.currencies)
            } catch (error) {
                console.error(error)
            }
        }
        fetchCurrencies()
    }, [])

    useEffect(() => {
        dispatch(setCurrency(selectedCurrency))
    }, [selectedCurrency, dispatch])

    return (
        <div>
            <Select
                value={selectedCurrency}
                onChange={(event) => setSelectedCurrency(event.target.value)}
            >
                {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                        {currency.code}
                    </option>
                ))}
            </Select>
        </div>
    )
}

const Select = styled.select`
padding: 8px 12px;
border: none;
border-radius: 4px;
font-size: 14px;
width: 74px;
color: #ffffff3f;
cursor: pointer;
background-color: transparent;
position: absolute;
top: 20px;
right: 25px;

&:focus{
    outline: none;
}
`