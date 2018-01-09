import { Injectable } from '@angular/core';
import { DemoModel } from '../_model/demoModel';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { SpiderRequest} from '../_model/SpiderRequest';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { SpiderResult } from '../_model/SpiderResult';

@Injectable()
export class DemoServiceService {
  private demoData = '/assets/demoData.json';
  private demoRequest = '/assets/demoRequestData.json';
  constructor(private _http: HttpClient) { }

  private baseUrl = 'http://localhost:5000'

  getDemo(): Observable<DemoModel[]> {
    return this._http
      .get<DemoModel[]>(this.demoData);
  }

  getDemoRequest(): Observable<SpiderRequest[]> {
    return this._http
      .get<SpiderRequest[]>(this.demoRequest);
  }

  getRequestResult(requestId, pageNumber?, pageSize?, userParams?: any): Observable<SpiderResult[]> {
    let params = new HttpParams();

    if (pageNumber != null && pageSize != null) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }

    if (userParams != null) {
      params = params.append('sortBy', userParams.sortBy  );
  }

    return this._http.get<SpiderResult[]>(this.baseUrl + '/documents/'+ requestId, {params});
  }

  getRequests(): Observable<SpiderRequest[]> {
    return this._http.get<SpiderRequest[]>(this.baseUrl + '/requests');
  }

  addRequests(requests: SpiderRequest) {
    return this._http.post(this.baseUrl + '/requests', requests, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  updateReqest(requests:SpiderRequest) {
    return this._http.put(this.baseUrl + '/requests', requests,{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }
}
