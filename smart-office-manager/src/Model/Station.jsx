import Element from "./Element";
import Config from "../config";

class Station {
  get uniqueItems() {
    return this._uniqueItems;
  }

  set uniqueItems(value) {
    this._uniqueItems = value;
  }
  get hasWarning() {
    return this._hasWarning;
  }

  set hasWarning(value) {
    this._hasWarning = value;
  }
  get elementsFlat() {
    return this._elementsFlat;
  }

  set elementsFlat(value) {
    this._elementsFlat = value;
  }
  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }
  /**
   *
   * @returns {Array<Element>}
   */
  get elements() {
    return this._elements;
  }

  /**
   *
   * @param {Array<Element>} value
   */
  set elements(value) {
    this._elements = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }
  get image() {
    return this._image;
  }

  set image(value) {
    this._image = value;
  }

  get ID() {
    return this._ID;
  }
  set ID(ID) {
    this._ID = ID;
  }

  get floor() {
    return this._floor;
  }

  set floor(value) {
    this._floor = value;
  }

  constructor(object) {
    if (object === null) return;
    this.ID = object.hasOwnProperty("ID") ? object["ID"] : null;
    this.name = object.hasOwnProperty("name") ? object["name"] : null;
    this.description = object.hasOwnProperty("description") ? object["description"] : null;
    this.floor = object.hasOwnProperty("floor") ? object["floor"] : null;
    this.image = object.hasOwnProperty("image") ? object["image"] : null;
    this.elements = object.hasOwnProperty("elements") ? object["elements"] : null;
    this.elements = (() => {
      let data = [];
      let elements = object.hasOwnProperty("elements") ? object["elements"] : [];
      if (elements && elements.length > 0) for (let i = 0; i < elements.length; i++) data.push(new Element(elements[i]));
      return data;
    })();


    /**
     * Important: Station.elementsFlat will be an object contain a flat mapping of the elements. (ID => element).
     * As it is an Object, you cannot cover it with a for-loop.
     * @type {Object}
     */
    this.elementsFlat = (!Config.isEmpty(this.elements) && this.elements.length > 0) ? Station.flattenElements(this.elements) : {};
    this.hasWarning = this.computeWarning();


    this.uniqueItems = this.computeUniqueItems();


  }

  /**
   * JS plays with references rather than copies of objects. By storing the items/elements
   * in both a TREE and a FLAT array, we can easily
   *  ---> update values in the FLAT array (so as not to always recursively cover the entire tree over and over again)
   *  ---> see changes in both the FLAT array and the TREE
   * @param initial
   * @return {Object} a map of elements  ID => element
   */
  static flattenElements = initial => {
    let flat = {};
    for(let i = 0; i < initial.length; i++){
      flat[String(initial[i].ID)] = initial[i];
      if(!Config.isEmpty(initial[i].elements) && initial[i].elements.length > 0) {

        let flat_children =  this.flattenElements(initial[i].elements);
        Object.keys(flat_children).forEach(function(key) { flat[String(key)] = flat_children[key]; });
      }
    }
    return flat;
  };

  computeWarning = () => {
    let count = 0;
    Object.keys(this.elementsFlat).forEach(key => {
      if (this.elementsFlat[key].type === Config.ELEMENT_TYPE_ITEM) {
        count += (!Config.isEmpty(this.elementsFlat[key].notifications)) ? this.elementsFlat[key].notifications.length : 0
      }
    });
    return count > 0;
  }

  computeUniqueItems = () => {
    let count = 0;
    Object.keys(this.elementsFlat).forEach(key => {
      if (this.elementsFlat[key].type === Config.ELEMENT_TYPE_ITEM) count++;
    });
    return count;
  }
}

export default Station;
