import { ListItem } from "./list-item";

interface ResponseObject {
  error: boolean
}

export interface DeleteResponseObject extends ResponseObject {
  itemDeleted: ListItem
}

export interface PostResponseObject extends ResponseObject {
  itemAdded: ListItem
}
