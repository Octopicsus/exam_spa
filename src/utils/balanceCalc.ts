import { MoneyItem } from "../store/features/moneyHistorySlice"

export function getBalance(items: MoneyItem[]) {
    const income = getIncome(items)
    const expense = getExpense(items)
    return income - expense
}

export function getIncome(items: MoneyItem[]) {
    return items.filter(item => item.type === "Income").reduce((acc, item) => acc + item.amount, 0)
}

export function getExpense(items: MoneyItem[]) {
    return items.filter(item => item.type === "Expense").reduce((acc, item) => acc + item.amount, 0)
}