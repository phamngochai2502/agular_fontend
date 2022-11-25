import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

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
  // chart2 = [];
  pie: any;
  doughnut: any;

  oldData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  ngOnInit() {
    socket.on('data1', (res0, res1, res2, res3) => {
      // this.updateChartData(this.chart, res, 0);
      console.log(`res0 = ${res0} | res1 = ${res1} | res2 = ${res2} | res3 = ${res3}`);
      this.addData(this.chart, res0, res1, res2, res3, this.chart1, this.chart2, this.chart3, this.chart4);

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
            label: '# of Nhiet Do',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            borderColor: ['rgba(255, 99, 132, 1)'],
          },
          {
            label: '# of Do Am',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            borderColor: ['rgba(54, 162, 235, 1)'],
          },
          {
            label: '# of Do Bao Hoa',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            borderColor: ['rgba(255, 206, 86, 1)'],
          },
          {
            label: '# of Chat Luong',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            borderColor: ['rgba(75, 192, 192, 1)'],
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
            label: 'Nhiet Do °C',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
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
            label: 'Do Am %',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
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
            label: 'Anh Sang',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: ['rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(255, 206, 86, 1)'],
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
        labels: ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9', 'x10', 'x11', 'x12'],
        datasets: [
          {
            label: '# of Chat Luong',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)'],
          }
        ]
      }
    });



  }

  // Function thay doi data :
  addData(chart, data0, data1, data2, data3, chart1, chart2, chart3, chart4) {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    chart.data.datasets[0].data.shift();
    chart.data.datasets[0].data.push(data0);

    chart.data.datasets[1].data.shift();
    chart.data.datasets[1].data.push(data1);

    chart.data.datasets[2].data.shift();
    chart.data.datasets[2].data.push(data2);

    chart.data.datasets[3].data.shift();
    chart.data.datasets[3].data.push(data3);

    chart1.data.datasets[0].data.shift();
    chart1.data.datasets[0].data.push(data0);

    chart2.data.datasets[0].data.shift();
    chart2.data.datasets[0].data.push(data1);

    chart3.data.datasets[0].data.shift();
    chart3.data.datasets[0].data.push(data2);

    chart4.data.datasets[0].data.shift();
    chart4.data.datasets[0].data.push(data3);


    chart.data.labels.shift();
    chart.data.labels.push(time);

    chart1.data.labels.shift();
    chart1.data.labels.push(time);
    chart2.data.labels.shift();
    chart2.data.labels.push(time);
    chart3.data.labels.shift();
    chart3.data.labels.push(time);
    chart4.data.labels.shift();
    chart4.data.labels.push(time);

    chart.update();
    chart1.update();
    chart2.update();
    chart3.update();
    chart4.update();
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

  updateChartData(chart, data, dataSetIndex) {
    chart.data.datasets[dataSetIndex].data = data;
    chart.update();
    // console.log(data);
  }

}