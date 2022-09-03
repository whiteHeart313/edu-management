

import { MonthlyMoney , BooksMoney, money, monthlyMoneyWithStudetData } from "../../types"


export interface MoneyDao {
    getMonthlyMoney() : Promise<monthlyMoneyWithStudetData[]  >
    getBooksMoney(): Promise<BooksMoney[] | undefined >
    PutMonthlyMoneyToStudents(monthlyMony : MonthlyMoney): Promise<void>
    PutBooksMoneyToStudets(BooksMony : money): Promise<void>
    getStudentMoneyByMonth(studentId : string , month : string): Promise<MonthlyMoney | undefined>
    getAllMonthlyMoney(): Promise<Number[] >
} 