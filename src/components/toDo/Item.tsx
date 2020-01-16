import React from "react";
import moment from "moment";
import ToDo from "../../models/ToDo";
import "../../styles/item.scss"
import "../../styles/fontawesome/fontawesome.scss";

interface IProps{
  item: ToDo;
  onClick: any;
}
function ToDoItem(props: IProps){
  return(
    <div className="item">
      <div className="item__header">
        <h4 className="item__title"> 
          {props.item.title}
        </h4>
        <div className="item__logo_close">
          <i className="fas fa-times" onClick={() => props.onClick(props.item)}></i>
        </div>
      </div>
      <div className="item__content">
        {props.item.content}
      </div>
      <small className="item__date-published">
        {moment(props.item.datePublished).fromNow()}
      </small>
    </div>
  )
}
export default ToDoItem;