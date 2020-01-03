import React from "react";
import "../styles/list.scss";
import Item from "./Item";
import Header from "./Header";
import ToDo from "../models/ToDo";
import Create from "./Create";
import { connect } from "react-redux";
import { ToDoState } from "../reducers/todoReducer";
import { getItems, removeItem } from "../actions/todoActions";

interface IProps {
  getItems: Function,
  removeItem: Function,
  items: ToDo[]
}

class ToDoList extends React.Component<IProps> {
  componentDidMount() {
    this.props.getItems();
  }

  handleOnRemove = (id: string) => {
    this.props.removeItem(id);
  }

  render() {
    return (
      <>
        <Header />
        <Create />
        <div className="list">
          <div className="list__main">
            {this.props.items && this.props.items.map(item => 
              <Item key={item.id} item={item} onClick={this.handleOnRemove}/>
            )}
          </div>
          <div className="list__info">
            <ul>
              <h3>To-Do's</h3>
              <hr/>
              <li>
                {(this.props.items) ? (this.props.items.length) : (<span>No</span>)} to-do's
                [<i className="fas fa-thumbs-up"></i>]
              </li>
              <li>
                {new Date().toDateString()}
                [<i className="fas fa-clock"></i>]
              </li>
            </ul>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state: ToDoState) => {
  return {
    items: state.toDo.items,
  }
}

export default connect( mapStateToProps, { getItems, removeItem })(ToDoList);