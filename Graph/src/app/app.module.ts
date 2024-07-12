import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './Services/userService';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CustomerChartComponent } from './customer-chart/customer-chart.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    CustomerChartComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CanvasJSAngularChartsModule,
    HttpClientModule 
    
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
