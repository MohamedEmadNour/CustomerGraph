import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from '../Services/userService'

@Component({
  selector: 'app-customer-chart',
  templateUrl: './customer-chart.component.html',
  styleUrls: ['./customer-chart.component.css']
})
export class CustomerChartComponent implements OnChanges {
  @Input() customerTransactions: any[] = [];
  chartOptions: any;

  constructor(private _userService: UserService) {
    this._userService.getSelectedCustomerTransactions().subscribe( (customerTransactions: any[]) => {
      this.customerTransactions = customerTransactions;
      //console.log(this.customerTransactions);
      
      //this.updateChartData();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customerTransactions']) {
      this._userService.getSelectedCustomerTransactions().subscribe( (customerTransactions: any[]) => {
        this.customerTransactions = customerTransactions;
      });
      this.updateChartData();
    }
  }

  updateChartData() {
    const dataPoints = this.customerTransactions.map(transaction => ({
      x: new Date(transaction.date),
      y: transaction.amount
    }));
    //console.log(dataPoints);
    
    this.chartOptions = {
      animationEnabled: true,
      theme: 'light2',
      title: {
        text: 'Customer Transactions'
      },
      axisX: {
        title: 'Date',
        valueFormatString: 'DD MMM YYYY'
      },
      axisY: {
        title: 'Amount',
        prefix: 'E.T'
      },
      data: [{
        type: 'column',
        dataPoints: dataPoints
      }]
    };
    //console.log(this.chartOptions);
  }
  
}
