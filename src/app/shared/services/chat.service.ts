import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {createRequestOption} from "../util/request-util";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) {
  }

  getRoomId() {
    return this.http.get<any>(`${environment.apiUrl}/room`, {
      observe: 'response'
    });
  }
}
