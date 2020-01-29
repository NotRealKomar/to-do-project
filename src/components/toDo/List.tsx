import React, { useEffect } from 'react';
import '../../styles/list.scss';
import Item from './Item';
import Header from './Header';
import ToDo from '../../models/ToDo';
import CreateToDo from './Create';
import { connect } from 'react-redux';
import { ToDoState } from '../../reducers/todoReducer';
import { getItems, removeItem } from '../../actions/todoActions';

interface IProps {
	getItems: () => Promise<void>,
	removeItem: (item: ToDo) => Promise<void>,
	items: ToDo[],
	isLoading: boolean,
}

const ToDoList: React.FC<IProps> = (props) => {
	const { getItems, removeItem, items, isLoading } = props;

	useEffect(() => {
		getItems();
	}, [ getItems ]);

	const handleOnRemove: (item: ToDo) => void = (item) => {
		removeItem(item);
	};

	return (
		<>
			<Header />
			<CreateToDo />
			<div className="list">
				<div className="list__main">
					{items && items.map(item => 
						<Item key={item.id} item={item} onClick={handleOnRemove}/>
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

const mapStateToProps = (state: ToDoState) => (
	{
		items: state.toDo.items,
		isLoading: state.toDo.isLoading,
	}
);

export default connect( mapStateToProps, { getItems, removeItem })(ToDoList);
