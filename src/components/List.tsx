import React from "react";
import "../styles/list.scss";
import Item from "./Item";
import Header from "./Header";
import ToDo from "../models/ToDo";
import Create from "./Create";
import { Guid } from "guid-typescript";
import * as toDoService from "../services/toDoService";

interface IState {
  items: ToDo[];
}

class ToDoList extends React.Component<{}, IState> {
  constructor(props: any){
    super(props);

    toDoService.clearItems();
    for (let i = 0; i < 85; i++) {
      toDoService.addItem(new ToDo(Guid.create().toString(), `test - ${i}`, "Lorem Ipsum blablabla"));
    }

    this.state = {
      items: toDoService.getItems(),
    }
  };

  handleOnCrossClick = (id: string) => {
    this.setState({
      items: toDoService.removeItem(id),
    });
  }

  handleCreateToDo = (item: ToDo) => {
    this.setState({
      items: toDoService.addItem(item)
    });
  }

  render() {
    return (
      <>
        <Header/>
        <Create onSubmit={this.handleCreateToDo}/>
        <div className="list">
          <div className="list__main">
            {this.state.items.map(item => 
              <Item key={item.id} item={item} onClick={this.handleOnCrossClick}/>
            )}
          </div>
          <div className="list__info">
            <ul>
              <h3>To-Do's</h3>
              <hr/>
              <li>
                {this.state.items.length} to-do's
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

export default ToDoList;