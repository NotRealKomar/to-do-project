import React, { useEffect } from 'react';
import '../../styles/list.scss';
import Item from '../../components/toDo/Item';
import Header from './Header';
import ToDo from '../../models/ToDo';
import CreateToDo from './Create';
import { connect } from 'react-redux';
import { ToDoState } from '../../reducers/todoReducer';
import * as ActionCreators from '../../actions/todoActions';
import { IAction } from '../../actions/todoActions';
import { Dispatch, bindActionCreators, ActionCreator } from 'redux';

interface IDispatchProps {
  getItems: () => void;
  removeItem: (item: ToDo) => void;
  updateItem: (item: ToDo) => void;
}

interface IStateProps {
  items: ToDo[];
  isLoading: boolean;
}

type Props = IStateProps & IDispatchProps

const ToDoList: React.FC<Props> = (props) => {
  const { getItems, removeItem, updateItem, items, isLoading } = props;

  useEffect(() => {
    getItems();
  }, [ getItems ]);

  const handleOnRemove: (item: ToDo) => void = (item) => {
    removeItem(item);
  };

  const handleOnUpdate: (item: ToDo) => void = (item) => {
    updateItem(item);
  };
  
  return (
    <>
      <Header />
      <CreateToDo />
      <div className="list">
        <div className="list__main">
          {items && items.map(item => 
            <Item 
              key={item.id} 
              item={item} 
              onClick={handleOnRemove}
              onUpdate={handleOnUpdate}
            />
          )}
        </div>
        <div className="list__info">
          <ul>
            <h3>To-Do&apos;s</h3>
            <hr />
            <li>
              {(items) ? (items.length) : (<span>No</span>)} to-do&apos;s
              [<i className="fas fa-thumbs-up"></i>]
            </li>
            <li>
              {new Date().toDateString()}
              [<i className="fas fa-clock"></i>]
            </li>
            <hr />
            {isLoading && (<li>Loading...</li>)}
          </ul>
        </div>
      </div>
    </>
  );
};

const mapStateToProps: (state: ToDoState) => IStateProps = (state) => (
  {
    items: state.toDo.items,
    isLoading: state.toDo.isLoading
  }
);

const mapDispatchToProps: (dispatch: Dispatch, actions: ActionCreator<IAction>) => IDispatchProps = (dispatch, actions) => (
  bindActionCreators(ActionCreators, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);
