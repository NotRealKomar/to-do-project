import React, { useState, FormEvent } from 'react';
import '../../styles/create.scss';
import { Guid } from 'guid-typescript';
import * as ActionCreators from '../../actions/todoActions';
import { IAction } from '../../actions/todoActions';
import { connect } from 'react-redux';
import ToDo from '../../models/ToDo';
import { Dispatch, bindActionCreators, ActionCreator } from 'redux';

interface IProps {
    addItem: (item: ToDo) => void;
}

const CreateToDo: React.FC<IProps> = (props) => {
  const { addItem } = props;
  const handleOnSubmit: (event: FormEvent) => void = (event) => {
    event.preventDefault();
    if(title && description){
      const item = ({
        id: Guid.create().toString(),
        title: title,
        content: description,
        datePublished: new Date()
      });

      addItem(item);
    }
  };

  const handleOnTitleChange: (event: FormEvent<HTMLInputElement>) => void = (event) => {
    setTitle(event.currentTarget.value);
  };

  const handleOnDescriptionChange: (event: FormEvent<HTMLInputElement>) => void = (event) => {
    setDescription(event.currentTarget.value);
  };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return(
    <form className="create-form" onSubmit={handleOnSubmit}>
      <div className="create-form__header">
        <h4>Create To-Do</h4>
      </div>
      <input placeholder="Title" className="create-form__input" onChange={handleOnTitleChange}></input>
      <input placeholder="Description" className="create-form__input" onChange={handleOnDescriptionChange}></input>
      <button className="create-form__button" type="submit">submit</button>
    </form>
  );
};

const mapDispatchToProps: (dispatch: Dispatch, actions: ActionCreator<IAction>) => IProps = (dispatch, actions) => (
  bindActionCreators(ActionCreators, dispatch)
);

export default connect(null, mapDispatchToProps)(CreateToDo);
