import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Subject } from 'rxjs';
import { ListItem } from '../interfaces/list-item';
import { PostResponseObject } from '../interfaces/response-object';

@Injectable({
  providedIn: 'root'
})
export class NewItemService {
  newItem: Subject<ListItem>;
  postResponse: Subject<PostResponseObject>;
  maxId: number;

  constructor(private _http: HttpService) {
    this.newItem = new Subject();
    this.postResponse = new Subject();
    this._http.getItems().subscribe((items: Array<ListItem>) => {
      this.maxId = items[items.length - 1].id;
    })
  }

  addItem(item: ListItem): void {
    item.id = ++this.maxId;
    this._http.addItem(item).subscribe((res: PostResponseObject) => {
      this.postResponse.next(res);
      this.newItem.next(item);
    })
  }
}
