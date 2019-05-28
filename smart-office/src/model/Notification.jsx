class Notification {

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }

  get content() {
    return this._content;
  }

  set content(value) {
    this._content = value;
  }

  get ID() {
    return this._ID;
  }

  set ID(value) {
    this._ID = value;
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(value) {
    this._createdAt = value;
  }

  get itemID() {
    return this._itemID;
  }

  set itemID(value) {
    this._itemID = value;
  }
  constructor(object) {
    if (object === null) return;
    this.ID = object.hasOwnProperty("ID") ? object["ID"] : null;
    this.type = object.hasOwnProperty("type") ? object["type"] : null;
    this.createdAt = object.hasOwnProperty("createdAt")
      ? object["createdAt"]
      : null;
    this.content = object.hasOwnProperty("content") ? object["content"] : null;
    this.itemID = object.hasOwnProperty("elementId") ? object["elementId"] : null;
  }
}

export default Notification;
