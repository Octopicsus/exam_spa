export default function getCategoryPath(category: string) {
    switch (category) {
        case "Expense":
            return "/expense";
        case "Income":
            return "/income";
        default:
            return "/";
    }
}