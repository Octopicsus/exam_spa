import { MoneyItem } from "../store/features/moneyHistorySlice";

export function searchNames(arr: MoneyItem[], input: string): MoneyItem[] {
    const searchPattern = input
        .toLowerCase()
        .split('')
        .map(char => `.*${char}`)
        .join('') + '.*';
    const regex = new RegExp(searchPattern);

    return arr.filter(item => {
        const searchText = typeof item === 'string' ? item : item.title
        return regex.test(searchText.toLowerCase())
    });
}

