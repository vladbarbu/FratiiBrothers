import Moment from "moment"

class SNotification {
  get dismissing() {
    return this._dismissing;
  }

  set dismissing(value) {
    this._dismissing = value;
  }
  get createdAtParsed() {
    return this._createdAtParsed;
  }

  set createdAtParsed(value) {
    this._createdAtParsed = value;
  }
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
  get stationID(){
    return this._stationID;
  }
  set stationID(value){
    this._stationID = value;
  }

  constructor(object) {
    if (object === null) return;
    this.ID = object.hasOwnProperty("id") ? object["id"] : null;
    this.type = object.hasOwnProperty("type") ? object["type"] : null;
    this.createdAt = object.hasOwnProperty("createdAt") ? object["createdAt"] : null;
    this.createdAtParsed = SNotification.parseDate(this.createdAt);
    this.content = object.hasOwnProperty("content") ? object["content"] : null;
    this.itemID = object.hasOwnProperty("elementId") ? object["elementId"] : null;
    this.stationID =  object.hasOwnProperty("stationId") ? object["stationId"] : null;

    this.dismissing = false;
  }


  static parseDate = date => {
    try{
      return  Moment(date,Moment.ISO_8601).format('MMMM Do YYYY, h:mm:ss a');
    }catch (e) {
      console.error(e);
    }
    return date;
  };

}

export default SNotification;
