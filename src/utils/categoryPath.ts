import { LinkRoutes } from "../enums/routes"
import { CATEGORY } from "../enums/categoryTitles"

export default function getCategoryPath(category: string) {
    switch (category) {
        case CATEGORY.EXPENSE:
            return LinkRoutes.EXPENSE
        case CATEGORY.INCOME:
            return LinkRoutes.INCOME
        default:
            return "/"
    }
}