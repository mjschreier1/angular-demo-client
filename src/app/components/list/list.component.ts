import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ListItem } from '../../interfaces/list-item';
import { DeleteResponseObject } from '../../interfaces/response-object';
import { NewItemService } from '../../services/new-item.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {
  listItems: Array<ListItem>;
  listExists: boolean;

  constructor(private _httpService: HttpService, private _newItemService: NewItemService) { }

  ngOnInit(): void {
    this.listExists = false;
    this._httpService.getItems().subscribe((listItems: Array<ListItem>) => {
      this.listItems = listItems;
      this.evaluateList();
    })
  }

  ngAfterViewInit(): void {
    this._newItemService.newItem.subscribe((item: ListItem) => {
      this.listItems.push(item);
      this.evaluateList();
    })
  }

  evaluateList(): void {
    this.listItems[0] ? this.listExists = true : this.listExists = false;
  }

  deleteItem(id: number): void {
    this._httpService.deleteItem(id).subscribe((res: DeleteResponseObject) => {
      res.error ? console.error(res.error) : this.listItems = this.listItems.filter((item: ListItem) => item.id !== res.itemDeleted.id);
      this.evaluateList();
    })
  }

}
