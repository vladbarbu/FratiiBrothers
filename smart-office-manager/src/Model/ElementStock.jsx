import Moment from "moment";

class ElementStock{
    get expirationDateParsed() {
        return this._expirationDateParsed;
    }

    set expirationDateParsed(value) {
        this._expirationDateParsed = value;
    }
    get expirationDate() {
        return this._expirationDate;
    }

    set expirationDate(value) {
        this._expirationDate = value;
    }
    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }
    get ID() {
        return this._ID;
    }

    set ID(value) {
        this._ID = value;
    }



    constructor(object){
        this.ID = object.hasOwnProperty("id") ? object["id"] : null;
        this.quantity = object.hasOwnProperty("quantity") ? object["quantity"] : null;
        this.expirationDate =  object.hasOwnProperty("expirationDate") ? object["expirationDate"] : null;
        this.expirationDateParsed = ElementStock.parseDate(this.expirationDate);
        return this;
    }


    static parseDate = date => {
        try{
            return  Moment(date,Moment.ISO_8601).format('YYYY-MM-DD');
        }catch (e) {
            console.error(e);
        }
        return date;
    };



}


export default ElementStock;