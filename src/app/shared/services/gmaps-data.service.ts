import {Injectable} from '@angular/core';
import {ICatItem} from '../../@core/model/cat-item.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {createRequestOption} from '../util/request-util';
import {IAreaAlarm} from '../../@core/model/area-alarm.model';

@Injectable({
  providedIn: 'root'
})
export class GmapsDataService {

  constructor(private http: HttpClient) {
  }

  getAreaData(req: any) {
    const options = createRequestOption(req);
    return this.http.get<IAreaAlarm[]>(`${environment.apiUrl}/area-gmap-data/getAreaAlarm`, {
      params: options,
      observe: 'response'
    });
  }
}
