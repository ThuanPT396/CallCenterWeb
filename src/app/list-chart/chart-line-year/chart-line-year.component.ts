import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { FormControl } from '@angular/forms';
import { ToasterService } from '../../service/toast/toaster.service';
import { MatDatepicker } from '@angular/material';
import * as moment from 'moment'
import * as GGChart from "../../../chart.js";
import { Chart } from '../../model/chart.model';
@Component({
  selector: 'app-chart-line-year',
  templateUrl: './chart-line-year.component.html',
  styleUrls: ['./chart-line-year.component.css'],
  providers: [AppointmentService]
})
export class ChartLineYearComponent implements OnInit {
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2030, 0, 1);
  startPicker = new FormControl(new Date());
  endPicker = new FormControl(new Date());
  selectedYear = new Date();
  constructor(private appointmentService: AppointmentService, private toastService: ToasterService) { }

  ngOnInit() {
    this.loadDataToChart(this.selectedYear, this.selectedYear)
  }
  chosenYearStartHandler(year: Date, datepicker: MatDatepicker<string>) {

    if (this.minDate > year || this.maxDate < year) {
      this.toastService.Error("Năm bắt đầu phải nằm trong vùng cho phép")
      datepicker.close();
      return;
    }
    if (year > this.endPicker.value) {
      this.toastService.Error("Năm bắt đầu phải nhỏ hơn năm kết thúc")
      datepicker.close();
      return;
    }
    this.startPicker.setValue(year);
    datepicker.close();
    this.loadDataToChart(this.startPicker.value, this.endPicker.value);
  }

  chosenYearEndHandler(year: Date, datepicker: MatDatepicker<string>) {
    if (this.minDate > year || this.maxDate < year) {
      this.toastService.Error("Năm kết thúc phải nằm trong vùng cho phép")
      datepicker.close();
      return;
    }
    if (this.startPicker.value > year) {
      this.toastService.Error("Năm kết thúc phải lớn hơn năm bắt đầu")
      datepicker.close();
      return;
    }
    this.endPicker.setValue(year);
    datepicker.close();
    this.loadDataToChart(this.startPicker.value, this.endPicker.value);
  }

  loadDataToChart(startDate: Date, endDate: Date) {
    var mStart = moment(startDate).startOf("year");
    var mEnd = moment(endDate).endOf("year");
    this.appointmentService
      .postChartByMonth('hoanghoa', mStart.format("YYYY-MM-DD"), mEnd.format("YYYY-MM-DD"))
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        console.log(tmp);
        var data = [];
        for (var i in tmp.value) {
          var app = tmp.value[i];
          var result = new Chart(app.total, app.present, null, app.month, app.year);
          data.push(result);
          console.log(result)
        }
        GGChart.drawChartLineForYear(data, mStart.year(), mEnd.year());
      })
  }
}