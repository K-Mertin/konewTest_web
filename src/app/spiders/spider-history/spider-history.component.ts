import { Component, OnInit } from '@angular/core';
import { DemoServiceService } from '../../_service/demoService.service';
import { SpiderRequest } from '../../_model/SpiderRequest';

@Component({
  selector: 'app-spider-history',
  templateUrl: './spider-history.component.html',
  styleUrls: ['./spider-history.component.css']
})
export class SpiderHistoryComponent implements OnInit {

  demoRequest: SpiderRequest[];

  constructor(private service: DemoServiceService) { }

  ngOnInit() {
    this.service.getRequests().subscribe(data => this.demoRequest = data);
  }

  deleteRequest() {
    console.log("delete")
  }

}
