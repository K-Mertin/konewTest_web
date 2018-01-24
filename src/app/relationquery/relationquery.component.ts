import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { RelationService } from '../_service/relation.service';
import { Relation, RELATIONS } from '../_model/Relation';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';

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
  subscription: Subscription[];

  constructor(
    private relationService: RelationService,
    private element: ElementRef
  ) {}

  ngOnInit() {
    console.log( );
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.subscription = [this.filterEnterEvent(), this.filterKeyupEvent()];
  }

  search(key, type) {
    this.relationService.search(key, type).subscribe(relations => this.relations = relations) ;
    console.log(this.relations);
  }

  filterEnterEvent() {
    // console.log(this.element.nativeElement);
    // this.list = [];

    return Observable.fromEvent(this.input.nativeElement, 'input')
      .filter(e => e['target'].value.length > 0)
      .do(v => (this.list = []))
      .debounceTime(500)
      .switchMap(e =>
        this.relationService.getAutoComplete(e['target'].value, this.queryType)
      )
      .subscribe(p => {
        this.list = this.list.concat(p);
      });
  }

  filterKeyupEvent() {
    return Observable.fromEvent(this.input.nativeElement, 'keyup').filter(
      e => e['target'].value === ''
    )
    .subscribe(() => { this.list = []; });
  }

  suggestSelected(key: string) {
    // console.log(key);
    this.input.nativeElement.value = key;
    this.list = [];
  }
}
