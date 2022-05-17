import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {createRequestOption} from '../util/request-util';
import {environment} from '../../../environments/environment';
import {IFavorite} from '../model/favorite.model';

type EntityMenuResponseType = HttpResponse<IFavorite>;

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  currentMenuItemId = new BehaviorSubject(null);
  currentMenuItems;

  constructor(protected http: HttpClient) {
  }

  query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<IFavorite[]>(`${environment.apiUrl}/favorite-urls`, {
      params: options,
      observe: 'response'
    });
  }

  findByUrl(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<IFavorite[]>(`${environment.apiUrl}/favorite-urls/find-by-url`, {
      params: options,
      observe: 'response'
    });
  }
  find(id: number, req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any>(`${environment.apiUrl}/favorite-urls/${id}`, {
      params: options,
      observe: 'response'
    });
  }

  delete(id: any) {
    return this.http.delete(`${environment.apiUrl}/favorite-urls/${id}`);
  }

  create(objModel: IFavorite): Observable<EntityMenuResponseType> {
    return this.http.post<IFavorite>(`${environment.apiUrl}/favorite-urls`, objModel, {observe: 'response'});
  }

  update(objModel: IFavorite): Observable<EntityMenuResponseType> {
    return this.http.put<IFavorite>(`${environment.apiUrl}/favorite-urls`, objModel, {observe: 'response'});
  }
}
