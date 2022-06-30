import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {createRequestOption} from "../../util/request-util";
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { ProductModel } from '../../model/product.model';
import { InitProduct } from '../../../@core/actions/product.actions';
import { ModuleItemModel } from '../../model/module-item.model';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private http: HttpClient,
    private store: Store<AppState>,) {
  }

  public transformToNbItemMenu(input: ModuleItemModel[]){
    const a =  input.map(e => {
      e.link = e.pathUrl;
      e.title = e.name;
      return e;
    })
    console.log(a);
    return a;
  }

  public transformParentChilren(input: ModuleItemModel[]){
    let items = _.clone(input);
    input.forEach(e => {
      if(e.parentId){
        console.log(e);
        
        items = items.map(element => {
          if(element.id == e.parentId){
            element.children = element.children ? [...element.children, e] : [e]
            e.remove = true;
          }
          return element
        })
      }
    })
    
    return items.filter(e => !e.remove)
  }

  public transformModuleItems(input: ModuleItemModel[]){
    return this.transformParentChilren(this.transformToNbItemMenu(input));
  }
  
}
