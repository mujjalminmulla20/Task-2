import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  data: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getDashboardData().subscribe(
      (response: any) => {
        this.data = response;
      },
      (error) => {
        console.error('Error fetching dashboard data', error);
      }
    );
  }
}
