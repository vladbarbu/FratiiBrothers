class StationNotification {
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

    constructor(object, stationID) {
        if (object === null) return;
        this.ID = object.hasOwnProperty("ID") ? object["ID"] : null;
        this.type = object.hasOwnProperty("type") ? object["type"] : null;
        this.createdAt = object.hasOwnProperty("createdAt")
          ? object["createdAt"]
          : null;
        this.content = object.hasOwnProperty("content") ? object["content"] : null;
        this.itemID = object.hasOwnProperty("itemID") ? object["itemID"] : null;
      this.stationID = stationID;
    }
  }
  
  export default StationNotification;
  