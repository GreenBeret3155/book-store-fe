import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'ngx-view-chart-favorite',
  templateUrl: './view-chart-favorite.component.html',
  styleUrls: ['./view-chart-favorite.component.scss']
})
export class ViewChartFavoriteComponent implements OnInit {
  @Input() chartLists: any[]
  constructor(public ref: NbDialogRef<ViewChartFavoriteComponent>) { }

  ngOnInit() {
  }

}
