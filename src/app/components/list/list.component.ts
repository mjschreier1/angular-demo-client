import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ListItem } from '../../interfaces/list-item';
import { DeleteResponseObject } from '../../interfaces/response-object';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listItems: Array<ListItem>;
  listExists: boolean;

  constructor(private _httpService: HttpService) { }

  ngOnInit(): void {
    this.listExists = false;
    this._httpService.getItems().subscribe((listItems: Array<ListItem>) => {
      this.listItems = listItems;
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
