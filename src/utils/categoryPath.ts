import { LinkRoutes } from "../routes"

export default function getCategoryPath(category: string) {
    switch (category) {
        case "Expense":
            return LinkRoutes.EXPENSE
        case "Income":
            return LinkRoutes.INCOME
        default:
            return "/"
    }
}