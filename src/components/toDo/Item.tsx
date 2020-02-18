import React, { useState } from 'react';
import moment from 'moment';
import ToDo from '../../models/ToDo';
import EditableInput from '../EditableInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface IProps{
  item: ToDo;
  onClick: (item: ToDo) => void;
  onUpdate: (item: ToDo) => void;
}
const ToDoItem: React.FC<IProps> = (props) => {
  const { item, onClick, onUpdate } = props;
  const { datePublished, title = '', content = '' } = item;

  const [ itemTitle, setTitle ] = useState<string>(title);
  const [ itemContent, setContent ] = useState<string>(content);

  const handleOnTitleFocusOut: (value: string) => void = (value) => {
    if(item.title !== value) {
      const itemToUpdate = {...item, title: value};
      onUpdate(itemToUpdate);
    }
  };

  const handleOnContentFocusOut: (value: string) => void = (value) => {
    if(item.content !== value) {
      const itemToUpdate = {...item, content: value};
      onUpdate(itemToUpdate);
    }
  };

  return (
    <div className="item">
      <div className="item__header">
        <h4 className="item__title">
          <EditableInput 
            value={itemTitle} 
            labelClassName="item__title_label"
            inputClassName="item__title_input"
            onChange={(value: string) => setTitle(value)}
            onFocusOut={handleOnTitleFocusOut}
          />
        </h4>
        <div className="item__logo_close">
          <FontAwesomeIcon icon={faTimes} onClick={() => onClick(item)}/>
        </div>
      </div>
      <div className="item__content">
        <EditableInput 
          value={itemContent}
          labelClassName="item__title_label"
          inputClassName="item__title_input"
          onChange={(value: string) => setContent(value)}
          onFocusOut={handleOnContentFocusOut}
        />
      </div>
      <small className="item__date-published">
        {moment(datePublished).fromNow()}
      </small>
    </div>
  );
};

export default ToDoItem;
