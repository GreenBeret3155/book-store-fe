import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {IUser} from './user.model';
import {createRequestOption} from '../../shared/util/request-util';
import {Injectable} from '@angular/core';

type EntityResponseType = HttpResponse<IUser>;

@Injectable({providedIn: 'root'})
export class UserService {
   userMessChange: Subject<any> = new Subject<any>();
  public resourceUrl = `${environment.apiUrl}/users`

  constructor(private http: HttpClient) {}

  create(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.resourceUrl, user);
  }

  update(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.resourceUrl, user);
  }
  updateReadedMess(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/notification-users/saveAll`, data);
  }
  updateStatus(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${environment.apiUrl}/users/updateStatus`, user);
  }
  resetPass(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${environment.apiUrl}/users/resetPass`, user);
  }

  find(login: string): Observable<EntityResponseType> {
    return this.http.get<any>(`${this.resourceUrl}/${login}`, {observe: 'response'});
  }

  query(req?: any, body?: any): Observable<HttpResponse<any[]>> {
    const options = createRequestOption(req);
    return this.http.post<any[]>(this.resourceUrl + '/query', body, { params: options, observe: 'response' });
  }

  delete(login: string): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${login}`);
  }
  getNotifications(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/notification/count-notice-of-user`, { observe: 'response' });
  }
  getUserChat(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any>(`${this.resourceUrl}/notifications`, { params: options , observe: 'response' });
  }
  getMessage(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get(`${environment.apiUrl}/notifications`, { params: options, observe: 'response' });
  }
  downloadFile(downloadLink): Observable<any> {
    return this.http.get(`${environment.apiUrl}/notification/get-file?type=type&&path=${downloadLink}`)
  }
  deleteMessage(data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/notification-users/delete-notification-user`, data);

  }

  authorities(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/users/authorities`);
  }

  updateStatusMultiple(user: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/users/updateStatusMultiple`, user);
  }

  register(body?: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/register`, body, {observe: 'response' });
  }
}
