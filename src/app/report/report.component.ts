import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  reportData: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getReportData().subscribe(
      (response: any) => {
        this.reportData = response;
      },
      (error) => {
        console.error('Error fetching report data', error);
      }
    );
  }
}
