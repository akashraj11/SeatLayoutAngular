import { Categories } from "./Categories";

export interface Layout {
    movieTitle: String,
    screenNo: number,
    selectVal: number,
    showTimeStamp: string, 
    category:Categories[]
  }