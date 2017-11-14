import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { XltofirestoreService } from '../services/xltofirestore.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  message = 'Uploading';
  showMessage: boolean = false;

  constructor(private xlservice: XltofirestoreService) { }

  ngOnInit() {
  }

  fileChange(event): void {
    
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      this.showMessage = true;
      this.xlservice.uploadFile(file).then(() => {
        this.message = 'stored';
      })
    }
  }

}
