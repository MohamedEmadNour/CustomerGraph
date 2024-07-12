import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from './Services/userService';
import { User , Transaction } from 'src/app/interfaces/users';
import { Observable , forkJoin  } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit , OnChanges {

  title = 'Customers';
  transactions : Transaction[] = [];
  customers : User[] = [];
  userdata : any ;
  searchName: any;
  totalAmount : any ;
  selectedCustomerId: number | null | undefined = null;
  customerTransactions: any[] = [];
  customerTransactions$: Observable<any[]>;
  chartOptions: any;
  constructor(private _UserService : UserService)
  {
    this.customerTransactions$ = this._UserService.getSelectedCustomerTransactions();
  }

  ngOnInit(): void {

    this.gettingDataFromApi().subscribe(([customers, transactions]) => {
      this.customers = customers;
      this.transactions = transactions;
      //console.log(this.customers);
      //console.log(this.transactions);
      this.handelDataUser();
    });

   //console.log(this.userdata);
   //this.calcTotlaMountForUser(0 , 0);
    
  }

  ngOnChanges(): void {

      this.GetCustmoerTransaction();
    
  }

  gettingDataFromApi() {
    return forkJoin([
      this._UserService.getUsers(),
      this._UserService.getTransactions()
    ]);
  }

  handelDataUser()
  {
    this.userdata = this._UserService.handlingUserData(this.customers , this.transactions)
    //console.log(this.userdata);
    this.calcTotlaMountForUser(0 , 0);

  }



  GetCustmoerTransaction()
  {
    this.customerTransactions$.subscribe((customerTransactions: any[]) => {
      this.customerTransactions = customerTransactions; 
      //console.log(this.customerTransactions);
      
    });
  }

  
  filteredUserdata() {

    if (!this.searchName) {
      return this.userdata;
    }
    const searchValue = this.searchName.trim();

    if (!isNaN(Number(searchValue))) {
      return this.userdata.filter((user: { amount: number; }) => user.amount === Number(searchValue));
    }

    return this.userdata.filter((user: { userName: string; }) =>
      user.userName.toLowerCase().includes(this.searchName.toLowerCase())
    );
  }


  async calcTotlaMountForUser(Customerid : number , count : number) {
    if (Customerid != 0) {
      this.EmptyChartData()
      //console.log("hi from calc");
      
      this.selectedCustomerId = Customerid;
      //console.log(this.selectedCustomerId);
      //console.log(this.userdata);
      
      //console.log(Customerid);
      const userTransactions = this.userdata.filter((user: { userid: string; }) => user.userid === String(Customerid));
      //console.log(userTransactions);
      this.totalAmount = userTransactions.reduce((total: any, transaction: { amount: any; }) => total + transaction.amount, 0);
      //console.log(totalAmount);
      //this.customerTransactions = userTransactions
      
      //this.chartOptions = null
      //console.log(this.customerTransactions);
      //console.log(this.customerTransactions);
      
      //await this.updateChartData();
      this._UserService.IsselectedCustomerTransactionsChanged(userTransactions);
      this.ngOnChanges()
      //console.log(this.customerTransactions);

      // if (count == 1) 
      // {
      //   this.reCallercalcTotlaMountForUser(Customerid)
      // }
    }
    else{
      this.EmptyChartData()
      //console.log("totalAmount");
      //console.log(this.customerTransactions);
      this.totalAmount = this.userdata.reduce((total: any, transaction: { amount: any; }) => total + transaction.amount, 0);
      //await this.updateChartData();
      this._UserService.IsselectedCustomerTransactionsChanged([]);
      // if (count == 1) 
      // {
      //   this.reCallercalcTotlaMountForUser(Customerid)
      // }
    }
  }


  EmptyChartData()
  {
    //console.log(this.chartOptions);
    //console.log(this.customerTransactions);
    
    this.customerTransactions , this.selectedCustomerId = null
    
    //this.chartOptions = null
  }

  // ChartOpthion()
  // {
  //   return this.customerTransactions
  // }


  // reCallercalcTotlaMountForUser(id: number) {
  //   console.log("hi from recale", id);
  //   this.calcTotlaMountForUser(id , 0);
  //   this.calcTotlaMountForUser(id , 0);
  // }

  // async updateChartData() {
  //   const dataPoints = this.customerTransactions.map(transaction => ({
  //     x: new Date(transaction.date),
  //     y: transaction.amount
  //   }));
  //   //console.log(dataPoints);
    
  //   this.chartOptions = {
  //     animationEnabled: true,
  //     theme: "light1",
  //     title: {
  //       text: "Customer Transactions"
  //     },
  //     axisX: {
  //       title: "Date",
  //       valueFormatString: "DD MMM YYYY"
  //     },
  //     axisY: {
  //       title: "Amount",
  //       prefix: "E.T"
  //     },
  //     data: [{
  //       type: "column",
  //       dataPoints: dataPoints
  //     }]
  //   };
  //   console.log(this.chartOptions);
    
  // }




}
