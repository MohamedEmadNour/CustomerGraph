import { Injectable } from '@angular/core';
import { User, Transaction } from 'src/app/interfaces/users';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000';
  ///// api 
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/customers`);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`);
  }



  /// Graph TransAction ob 
  private _selectedCustomerTransactions = new BehaviorSubject<any[]>([]);
  selectedCustomerTransactions$ = this._selectedCustomerTransactions.asObservable();

  IsselectedCustomerTransactionsChanged(userTransactions: any[]): void {
    //console.log(this._selectedCustomerTransactions);
    this._selectedCustomerTransactions.next(userTransactions);
  }

  getSelectedCustomerTransactions(): Observable<any[]> {
    //console.log(this._selectedCustomerTransactions);
    return this._selectedCustomerTransactions.asObservable();
  }



  /// merge the user data with his transaction to disPlay it
  handlingUserData(users: User[], transactions: Transaction[]): any[] {
    //console.log(users, transactions);

    const userDataArray: any[] = [];
    users.forEach(user => {
      const userTransactions = transactions.filter(transaction => transaction.customer_id === Number(user.id));
      userTransactions.forEach(transaction => {
        const userData = {
          userid: user.id,
          userName: user.name,
          date: transaction.date,
          amount: transaction.amount
        };
        userDataArray.push(userData);
      });
    });

    //console.log(userDataArray);
    return userDataArray;
  }


}
