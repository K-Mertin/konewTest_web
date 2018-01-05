import { Component, OnInit } from '@angular/core';
import { DemoServiceService } from '../../_service/demoService.service';
import { DemoModel } from '../../_model/demoModel';
import { SpiderResult } from '../../_model/SpiderResult';

@Component({
  selector: 'app-spider-result',
  templateUrl: './spider-result.component.html',
  styleUrls: ['./spider-result.component.css']
})
export class SpiderResultComponent implements OnInit {
  inputtext: string;
  results: SpiderResult[];

  constructor(private service: DemoServiceService) {}

  ngOnInit() {
  }

  getDemo() {
    this.service.getRequestResult('1514966746.2558856').subscribe(data => (this.results = data));
  }
}
