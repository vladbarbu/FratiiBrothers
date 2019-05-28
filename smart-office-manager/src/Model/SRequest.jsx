import Moment from "moment"

class SRequest {
  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }
  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }
  get badge() {
    return this._badge;
  }

  set badge(value) {
    this._badge = value;
  }
  get createdAtParsed() {
    return this._createdAtParsed;
  }

  set createdAtParsed(value) {
    this._createdAtParsed = value;
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
  get stationID(){
    return this._stationID;
  }
  set stationID(value){
    this._stationID = value;
  }

  constructor(object) {
    if (object === null) return;
    this.ID = object.hasOwnProperty("id") ? object["id"] : null;
    this.badge = object.hasOwnProperty("badge") ? object["badge"] : null;
    this.name = object.hasOwnProperty("name") ? object["name"] : null;
    this.description = object.hasOwnProperty("description") ? object["description"] : null;

    this.createdAt = object.hasOwnProperty("createdAt") ? object["createdAt"] : null;
    this.createdAtParsed = SRequest.parseDate(this.createdAt);

    this.stationID = object.hasOwnProperty("stationId") ? object["stationId"] : null;
  }


  static parseDate = date => {
    try{
      return  Moment(date,"MM/DD/YYYY hh:mm:ss").format('MMMM Do YYYY, h:mm:ss a');
    }catch (e) {
      console.error(e);
    }
    return date;
  };

}

export default SRequest;
