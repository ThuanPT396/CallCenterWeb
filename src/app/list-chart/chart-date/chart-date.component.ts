import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { Chart } from '../../model/chart.model';
import * as GGChart from "../../../chart.js";
import { FormControl } from '@angular/forms';
import { Moment } from 'node_modules/moment'
import { DatePipe } from '@angular/common';
import { MatDatepicker, MAT_DATE_FORMATS } from '@angular/material';

@Component({
  selector: 'app-chart-date',
  templateUrl: './chart-date.component.html',
  styleUrls: ['./chart-date.component.css'],
  providers: [AppointmentService]
})
export class ChartDateComponent implements OnInit {
  date = new FormControl(new Date());
  pipe = new DatePipe('en-US');
  username = localStorage.getItem('username')
  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    // GGChart.dm(["abc", "cds", "ds"]);
    this.date;
    this.appointmentService
      .postChartByDate(this.username, "2018-06-01", "2018-07-01")
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        var data = [];
        for (var i in tmp.value) {
          var app = tmp.value[i];
          var result = new Chart(app.total, app.present, app.date,0,0);
          data.push(result);
        }
        GGChart.drawChartForDate(data);
      });
  }

  chosenYearHandler(normalizedYear: string) {
    var format = this.pipe.transform(normalizedYear, 'yyyy')
    console.log(format) 
    this.date.setValue(format);
  }
  chosenMonthHandler(normlizedMonth: string, datepicker: MatDatepicker<string>) {
    var format = this.pipe.transform(normlizedMonth, 'MM')
    console.log(format)
    this.date.setValue(format);
    datepicker.close();
  }
}
