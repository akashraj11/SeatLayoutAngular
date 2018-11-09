import { Seat } from "./Seat";

export interface Categories {
        type: String
        price: number,
        noOfColumn: number,
        noOfRows: number,
        seat: Seat[]
}