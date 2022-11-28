import { SocketService } from './socket.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';


Chart.register(...registerables);

const io = require("socket.io-client");
const socket = io("http://localhost:3000", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'dashboard';
  chart;
  chart1;
  chart2;
  chart3;
  chart4;
  option: any;
  // chart2 = [];
  pie: any;
  doughnut: any;

  oldData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  oldData1;
  oldData2;
  oldData3;
  oldLabel = ['n-10', 'n-9', 'n-8', 'n-7', 'n-6', 'n-5', 'n-4', 'n-3', 'n-2', 'n-1'];
  constructor(private http: HttpClient) {

  }
  onName(names: { pName: string }) {
    console.log(names.pName);
    this.option = names.pName;
    socket.on('data2', (res00, res11, res22) => {
      console.log(`res00 = ${res00} | res11 = ${res11} | res22 = ${res22} `);
      this.oldData1 = res00;
      this.oldData2 = res11;
      this.oldData3 = res22;

    });
    if (this.option === 'nhiet do') {
      this.updateChartData(this.chart4, this.oldData1, this.oldLabel, this.option, 0);
    };
    if (this.option === 'do am') {
      this.updateChartData(this.chart4, this.oldData2, this.oldLabel, this.option, 0);
    };
    if (this.option === 'anh sang') {
      this.updateChartData(this.chart4, this.oldData3, this.oldLabel, this.option, 0);
    };
  }




  ngOnInit() {
    socket.on('data1', (res0, res1, res2) => {
      // this.updateChartData(this.chart, res, 0);
      console.log(`res0 = ${res0} | res1 = ${res1} | res2 = ${res2} `);
      this.addData(this.chart, res0, res1, res2, this.chart1, this.chart2, this.chart3);

    });


    // const ctx = document.getElementById('myChart').getContext('2d');
    this.chart = new Chart('bar', {
      type: 'line',
      options: {
        responsive: true,
      },
      data: {
        labels: ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12'],
        datasets: [
          {
            label: 'Nhiệt Độ °C',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            borderColor: ['rgba(255, 99, 132)'],
          },
          {
            label: 'Độ Ẩm %',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            borderColor: ['rgba(54, 162, 235)'],
          },
          {
            label: 'Ánh Sáng',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            borderColor: ['rgba(255, 206, 86)'],
          }
        ]
      }
    });

    this.chart1 = new Chart('bar1', {
      type: 'bar',
      options: {
        responsive: true,
      },
      data: {
        labels: ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12'],
        datasets: [
          {
            label: 'Nhiệt Độ °C',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: ['rgb(255, 99, 132)'],
            borderColor: ['rgb(255, 99, 132)'],
          }
        ]
      }
    });
    this.chart2 = new Chart('bar2', {
      type: 'bar',
      options: {
        responsive: true,
      },
      data: {
        labels: ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12'],
        datasets: [
          {
            label: 'Độ Ẩm %',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: ['rgb(54, 162, 235)'],
            borderColor: ['rgb(54, 162, 235)'],
          }
        ]
      }
    });

    this.chart3 = new Chart('bar3', {
      type: 'bar',
      options: {
        responsive: true,
      },
      data: {
        labels: ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12'],
        datasets: [
          {
            label: 'Ánh Sáng',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: ['rgba(255, 206, 86)'],
            borderColor: ['rgba(255, 206, 86)'],
          }
        ]
      }
    });

    this.chart4 = new Chart('bar4', {
      type: 'bar',
      options: {
        responsive: true,
      },
      data: {
        labels: ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10'],
        datasets: [
          {
            label: '10 ngày gần nhất',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: ['rgba(255, 206, 86)'],
            borderColor: ['rgba(255, 206, 86)'],
          }
        ]
      }
    });

  }

  // Function thay doi data :
  addData(chart, data0, data1, data2, chart1, chart2, chart3) {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    chart.data.datasets[0].data.shift();
    chart.data.datasets[0].data.push(data0);

    chart.data.datasets[1].data.shift();
    chart.data.datasets[1].data.push(data1);

    chart.data.datasets[2].data.shift();
    chart.data.datasets[2].data.push(data2);



    chart1.data.datasets[0].data.shift();
    chart1.data.datasets[0].data.push(data0);

    chart2.data.datasets[0].data.shift();
    chart2.data.datasets[0].data.push(data1);

    chart3.data.datasets[0].data.shift();
    chart3.data.datasets[0].data.push(data2);




    chart.data.labels.shift();
    chart.data.labels.push(time);

    chart1.data.labels.shift();
    chart1.data.labels.push(time);
    chart2.data.labels.shift();
    chart2.data.labels.push(time);
    chart3.data.labels.shift();
    chart3.data.labels.push(time);


    chart.update();
    chart1.update();
    chart2.update();
    chart3.update();

    // console.log(`dataSetIndex = ${dataSetIndex} +  data = ${data}`);
  }

  addDataDetail(chartX, dataX) {
    var todayX = new Date();
    var timeX = todayX.getHours() + ":" + todayX.getMinutes() + ":" + todayX.getSeconds();

    chartX.data.datasets.data.shift();
    chartX.data.datasets.data.push(dataX);

    chartX.data.labels.shift();
    chartX.data.labels.push(timeX);
    chartX.update();
  }

  removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    chart.update();
  }

  updateChartData(chart, data, label, type, dataSetIndex) {
    chart.data.datasets[dataSetIndex].data = data;
    chart.data.datasets.labels = label;
    if (type === 'nhiet do') {
      chart.data.datasets[dataSetIndex].label = "Nhiệt đô cao nhất trong 10 ngày";
    }
    if (type === 'do am') {
      chart.data.datasets[dataSetIndex].label = "Độ ẩm cao nhất trong 10 ngày";
    }
    if (type === 'anh sang') {
      chart.data.datasets[dataSetIndex].label = "Ánh sáng cao nhất trong 10 ngày";
    }
    chart.update();
    // console.log(data);
  }

}