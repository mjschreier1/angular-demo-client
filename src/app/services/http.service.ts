import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListItem } from '../interfaces/list-item';
import { DeleteResponseObject, PostResponseObject } from '../interfaces/response-object';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url: string;
  listPath: string;

  constructor(private _http: HttpClient) {
    this.url = "http://localhost:3000";
    this.listPath = "/list";
  }

  getItems(): Observable<Array<ListItem>> {
    return this._http.get<Array<ListItem>>(`${this.url}${this.listPath}`);
  }

  deleteItem(id: number): Observable<DeleteResponseObject> {
    let params = new HttpParams().set("id", id.toString())
    return this._http.delete<DeleteResponseObject>(`${this.url}${this.listPath}`, { params: params });
  }

  addItem(item: ListItem): Observable<PostResponseObject> {
    return this._http.post<PostResponseObject>(`${this.url}${this.listPath}`, item);
  }
}
