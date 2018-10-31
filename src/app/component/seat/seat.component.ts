import { Component, OnInit } from '@angular/core';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment as env } from "../../../environments/environment";
import { Layout } from 'src/app/domain/layout';


//Component decorator
@Component({
	selector: 'seat-list',
	templateUrl: './seat.component.html',
	styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit {
	//variable declarations
	defaultValue = 0;
	type: String;
	position: number;
	noOfRows: number;
	noOfColumn: number;
	type2: String;
	position2: number;
	noOfRows2: number;
	noOfColumn2: number;
	ticketPrice: number;
	convFee: number = 30;
	totalPrice: number = 0;
	currency: String = "Rs";
	// rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'].slice(0, this.noOfRows);
	// cols: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].slice(0, this.noOfColumn);
	rows: string[];
	cols: number[];

	rows2: string[];
	cols2: number[];

	reserved: string[] = ['A2', 'A3', 'F5', 'F1', 'F2', 'F6', 'F7', 'F8', 'H1', 'H2', 'H3', 'H4'];
	selected: string[] = [];

	reserved2: string[] = ['A2', 'A3', 'F5', 'F1', 'F2', 'F6', 'F7', 'F8', 'H1', 'H2', 'H3', 'H4'];
	selected2: string[] = [];

	// layout: Layout =
	// 	{
	// 		screenNo: 1,
	// 		movieTitle: "VENOM2",
	// 		selectVal: 2,
	// 		showTimeStamp: "October 30 2018 / FRI, 6:45PM",
	// 		category: []
	// 	}
	// movieTitle: String = this.layout.movieTitle;
	// screen: number = this.layout.screenNo;
	// time: String = this.layout.showTimeStamp;
	layout: Layout;
	movieTitle: String;
	screen: number;
	time: String;

	constructor(private http: HttpClient) { }

	ngOnInit() {
		console.log("ngoninit started");
		this.defaultLoad();
		console.log("ngoninit finished");
		console.log("no of rows finally ", this.noOfRows);
	}

	defaultLoad() {
		console.log("default load started");
		this.http.get(env.api)
			.subscribe((data) => {
				console.log("data is ", data);
				this.layout =
					{
						screenNo: data["screenNo"],
						movieTitle: data["movieTitle"],
						selectVal: data["selectVal"],
						showTimeStamp: data["showTimeStamp"],
						category: data["category"]
					}
				this.movieTitle = this.layout.movieTitle;
				this.screen = this.layout.screenNo;
				this.time = this.layout.showTimeStamp;
				this.type = this.layout.category[0].type;
				this.noOfRows = this.layout.category[0].noOfRows;
				this.noOfColumn = this.layout.category[0].noOfColumn;

				this.type2 = this.layout.category[1].type;
				this.noOfRows2 = this.layout.category[1].noOfRows;
				this.noOfColumn2 = this.layout.category[1].noOfColumn;
				// this.layout.screenNo = data["screenNo"];
				// this.layout.movieTitle = data["movieTitle"];
				// this.layout.selectVal = data["selectVal"];
				// this.layout.showTimeStamp = data["showTimeStamp"];
				// this.layout.category = data["category"];
				// this.ticketPrice = this.layout.category[0].price;
				console.log("data -> no of rows ", this.layout.category[0].noOfRows)
				this.rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'].slice(0, this.noOfRows);
				this.cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].slice(0, this.noOfColumn);


				this.rows2 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'].slice(0, this.noOfRows2);
				this.cols2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].slice(0, this.noOfColumn2);

			});
		console.log("no of rows are ", this.noOfRows);
		console.log("default load finished");
	}

// Functions for Seats Of type Gold

	//return status of each seat
	getStatus = function (seatPos: string) {
		if (this.reserved.indexOf(seatPos) !== -1) {
			return 'reserved';
		} else if (this.selected.indexOf(seatPos) !== -1) {
			return 'selected';
		}
	}
	//click handler
	seatClicked = function (seatPos: string) {
		// console.log("testing the no of columns ", this.noOfColumn)
		// console.log("testing the no of rows ", this.noOfRows)
		var index = this.selected.indexOf(seatPos);
		console.log("index is ", index);
		if (index !== -1) {
			// seat already selected, remove
			this.selected.splice(index, 1)
		} else {
			//push to selected array only if it is not reserved
			if (this.reserved.indexOf(seatPos) === -1)
				this.selected.push(seatPos);
		}
	}


// Functions for Seats Of type Silver

	//return status of each seat
	getStatus2 = function (seatPos: string) {
		if (this.reserved2.indexOf(seatPos) !== -1) {
			return 'reserved';
		} else if (this.selected2.indexOf(seatPos) !== -1) {
			return 'selected';
		}
	}
	//click handler
	seatClicked2 = function (seatPos: string) {
		// console.log("testing the no of columns ", this.noOfColumn2)
		// console.log("testing the no of rows ", this.noOfRows2)
		var index = this.selected2.indexOf(seatPos);
		console.log("index is ", index);
		if (index !== -1) {
			// seat already selected, remove
			this.selected2.splice(index, 1)
		} else {
			//push to selected array only if it is not reserved
			if (this.reserved2.indexOf(seatPos) === -1)
				this.selected2.push(seatPos);
		}
	}

	//clear handler
	clearSelected = function () {
		this.selected = [];
		this.selected2 = [];
	}

	//Buy button handler
	// showSelected = function () {
	// 	if (this.selected.length > 0) {
	// 		alert("Selected Seats: " + this.selected + "\nTotal: " + (this.ticketPrice * this.selected.length + this.convFee));
	// 	} else {
	// 		alert("No seats selected!");
	// 	}\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	// }
}