import { Component, OnInit } from '@angular/core';
import { DemoServiceService } from '../../_service/demoService.service';
import { DemoModel } from '../../_model/demoModel';
import { SpiderResult } from '../../_model/SpiderResult';
import { Router, ActivatedRoute } from '@angular/router'
import { Pagination } from '../../_model/pagination';

@Component({
  selector: 'app-spider-result',
  templateUrl: './spider-result.component.html',
  styleUrls: ['./spider-result.component.css']
})
export class SpiderResultComponent implements OnInit {
  inputtext: string;
  results: SpiderResult[];
  pagination: Pagination;

  constructor(private service: DemoServiceService, private route: ActivatedRoute) {}

  ngOnInit() {
    let requestId = this.route.snapshot.paramMap.get('requestId');
    this.service.getRequestResult(requestId).subscribe(data => (this.results = data));
  }

  getDemo() {
    console.log('no use');
  }
}
