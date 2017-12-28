import { Injectable } from '@angular/core';
import { DemoModel } from '../_model/demoModel';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { SpiderRequest } from '../_model/SpiderRequest';

@Injectable()
export class DemoServiceService {
  private demoData = '/assets/demoData.json';
  private demoRequest = '/assets/demoRequestData.json';
  constructor(private _http: Http) {}

  getDemo() {
    return this._http
      .get(this.demoData)
      .map((response: Response) => <DemoModel[]>response.json());
  }

  getDemoRequest() {
    return this._http
      .get(this.demoRequest)
      .map((response: Response) => <SpiderRequest[]>response.json());
  }
}
