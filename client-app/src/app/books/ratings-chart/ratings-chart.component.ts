import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-ratings-chart',
  templateUrl: './ratings-chart.component.html',
  styleUrls: ['./ratings-chart.component.css']
})
export class RatingsChartComponent implements OnInit{

  @Input() formattedRatings: any[]=[];

  constructor(private bookService: BooksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.barChartData[0].data.push(this.formattedRatings[0]);
    this.barChartData[0].data.push(this.formattedRatings[1]);
    this.barChartData[0].data.push(this.formattedRatings[2]);
    this.barChartData[0].data.push(this.formattedRatings[3]);
    this.barChartData[0].data.push(this.formattedRatings[4]);
  }

  barChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {enabled: false},
    scales: { xAxes: [{}], yAxes: [{}] },
    legend: {display: false},
  };

  barChartLabels: Label[] = ['1', '2', '3', '4', '5'];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [
    { data: [], label: 'Company A', backgroundColor: 'rgba(247, 228, 19, 1)', hoverBackgroundColor: 'rgba(247, 228, 19, 1)'}
  ];
}
