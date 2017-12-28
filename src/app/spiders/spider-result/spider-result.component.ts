import { Component, OnInit } from '@angular/core';
import { DemoServiceService } from '../../_service/demoService.service';
import { DemoModel } from '../../_model/demoModel';

@Component({
  selector: 'app-spider-result',
  templateUrl: './spider-result.component.html',
  styleUrls: ['./spider-result.component.css']
})
export class SpiderResultComponent implements OnInit {
  inputtext: string;
  demos: DemoModel[];

  constructor(private service: DemoServiceService) {}

  ngOnInit() {
  }

  getDemo() {
    this.service.getDemo().subscribe(data => (this.demos = data));
  }
}
