import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ListItem } from '../../interfaces/list-item';
import { NewItemService } from '../../services/new-item.service';
import { PostResponseObject } from '../../interfaces/response-object';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit, AfterViewInit {
  newItem: ListItem;
  postResponse: string;

  constructor(private _newItemService: NewItemService) { }

  ngOnInit(): void {
    this.newItem = {
      id: null,
      name: ""
    }
  }

  ngAfterViewInit(): void {
    this._newItemService.postResponse.subscribe((res: PostResponseObject) => {
      res.error
        ? this.postResponse = "Something went wrong; please try again."
        : this.postResponse = `${res.itemAdded.name} added successfully!`
      setTimeout(() => this.postResponse = "", 4000);
    })
  }

  addItem(): void {
    this._newItemService.addItem(this.newItem);
    this.newItem = {
      id: null,
      name: ""
    }
  }

}
