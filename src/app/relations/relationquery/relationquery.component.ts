import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { RelationService } from '../../_service/relation.service';
import { Relation } from '../../_model/Relation';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import { AlertifyService } from '../../_service/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-relationquery',
  templateUrl: './relationquery.component.html',
  styleUrls: ['./relationquery.component.css']
})
export class RelationqueryComponent implements OnInit {
  @ViewChild('input') input: ElementRef;
  @ViewChild('selected') selected: ElementRef;

  list: string[] = [];
  relations: Relation[];
  queryType = 'idNumber';
  queryKey = '';
  subscription: Subscription[];
  relationEdit: Relation;
  relationHist;
  statusMap;
  networkIdNumber;

  public theBoundCallback: Function;

  constructor(
    private relationService: RelationService,
    private alertify: AlertifyService,
    private element: ElementRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.statusMap = data['status'].map;
    });

    this.theBoundCallback = this.search.bind(this);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.subscription = [this.filterEnterEvent(), this.filterKeyupEvent()];
  }

  search(key?: string, type?: string) {
    if (key) {
      this.queryKey = key;
    }
    if (type) {
      this.queryType = type;
    }

    this.relationService
      .search(this.queryKey, this.queryType)
      .subscribe(relations => (this.relations = relations));
  
    // console.log(this.relations);
  }

  filterEnterEvent() {
    // console.log(this.element.nativeElement);
    // this.list = [];
    return Observable.fromEvent(this.input.nativeElement, 'input')
      .filter(e => e['target'].value.trim().length > 0)
      .do(v => (this.list = []))
      .debounceTime(500)
      .switchMap(e =>
        this.relationService.getAutoComplete(e['target'].value, this.queryType)
      )
      .subscribe(p => {
        this.list = this.list.concat(p);
      });
  }

  // this.service.removeRquest()

  filterKeyupEvent() {
    return Observable.fromEvent(this.input.nativeElement, 'keyup')
      .filter(e => e['target'].value === '')
      .subscribe(() => {
        this.list = [];
      });
  }

  suggestSelected(key: string) {
    // console.log(key);
    this.input.nativeElement.value = key;
    this.list = [];
  }

  setEditRelation(relation: Relation) {
    this.relationEdit = relation;
  }
  getHistRelation(id: string) {
    this.relationService.getHistRelations(id).subscribe(data => {
      this.relationHist = data;
    });
  }

  setNetworkIdNumver(id: string) {
    this.networkIdNumber = id;
  }
}
