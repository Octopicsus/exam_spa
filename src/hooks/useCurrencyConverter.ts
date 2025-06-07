import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { convertAllCurrencies, moneyAdapter, updateItem } from '../store/features/moneyHistorySlice';
import { getExchangeRatesFromPLN } from '../utils/exchangeRatesFromPLN';

export function useCurrencyConverter() {
    const dispatch = useDispatch();
    const currency = useSelector((state: RootState) => state.currency);
    const selectAll = moneyAdapter.getSelectors(
        (state: RootState) => state.moneyHistory
    ).selectAll;
    const items = useSelector(selectAll);
    
    useEffect(() => {
        const migrateOldItems = () => {
            items.forEach(item => {
                if (!item.originalAmount || !item.originalCurrency) {
                    dispatch(updateItem({
                        ...item,
                        originalAmount: item.amount,
                        originalCurrency: 'PLN'
                    }));
                }
            });
        };

        migrateOldItems();
    }, [items, dispatch]);
    
    useEffect(() => {
        const convertCurrencies = async () => {
            try {
                const rates = await getExchangeRatesFromPLN(currency.to);
                
                dispatch(convertAllCurrencies({
                    targetCurrency: currency.to,
                    rates
                }));
            } catch (error) {
                console.error('Failed to convert currencies:', error);
            }
        };

        if (currency.from !== currency.to) {
            convertCurrencies();
        }
    }, [currency.to, currency.from, dispatch]);
}
