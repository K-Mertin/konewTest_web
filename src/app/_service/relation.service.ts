import { Injectable } from '@angular/core';
import { Relation, RELATIONS, Party } from '../_model/Relation';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Injectable()
export class RelationService {
  constructor() {}

  getall(): Relation[] {
    return RELATIONS;
  }

  getAutoComplete(key: string, type: string): Observable<any[]> {
    if (type === 'id') {
        return Observable.of(RELATIONS)
        .map(relations =>
          relations.map(relation =>
            relation.objects
              .map(object => object.idNumber)
              .concat(relation.subjects.map(subject => subject.idNumber))
          )
        )
        .mergeMap(val => val)
        .map(ids => ids.filter(id => id.toLowerCase().startsWith(key.toLowerCase())))
        .filter(f => f.length > 0);
    }    else if (type === 'name') {
        return Observable.of(RELATIONS)
        .map(relations =>
          relations.map(relation =>
            relation.objects
              .map(object => object.name)
              .concat(relation.subjects.map(subject => subject.name))
          )
        )
        .mergeMap(val => val)
        .map(names => names.filter(name => name.toLowerCase().startsWith(key.toLowerCase())))
        .filter(f => f.length > 0);
    } else if (type === 'reason') {
        return Observable.of(RELATIONS).map(relations =>
            relations.map(relation => relation.reason).filter(reason => reason.toLowerCase().startsWith(key.toLowerCase()))
        );
    }
  }

  search(key: string, type: string) {
    // return Observable.of(RELATIONS).filter(relation=>relation.filter());
    // return RELATIONS.filter(relations => relations.objects.filter(object=>object.idNumber===key));
  }
}
