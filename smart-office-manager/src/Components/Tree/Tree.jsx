import React, { PureComponent } from "react";
import Config from "../../config";
import Category from "./Category";
import Subcategory from "./Subcategory";
import Item from "./Item";



class Tree extends PureComponent{




    render() {
        return (
            <div className={"Tree"}>
                {this.props.elements.map((element,index) => {
                   if(element.type !== Config.ELEMENT_TYPE_ITEM && (!Config.isEmpty(element.parentID))) element.type=Config.ELEMENT_TYPE_SUBCATEGORY;
                   switch (element.type) {
                       case Config.ELEMENT_TYPE_CATEGORY :
                           return <Category key={index} element={element} />;
                       case Config.ELEMENT_TYPE_SUBCATEGORY :
                           return <Subcategory key={index} element={element} />;
                       case Config.ELEMENT_TYPE_ITEM :
                           return <Item key={index} element={element} />;
                       default: return null;
                   }
                })
            }
            </div>
        );
    }


}


export default Tree;