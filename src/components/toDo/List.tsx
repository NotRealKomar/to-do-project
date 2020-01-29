import React from 'react';
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

class ToDoList extends React.Component<IProps> {
	componentDidMount() {
		this.props.getItems();
	}

	handleOnRemove = (item: ToDo) => {
		this.props.removeItem(item);
	}

	render() {
		return (
			<>
				<Header />
				<CreateToDo />
				<div className="list">
					<div className="list__main">
						{this.props.items && this.props.items.map(item => 
							<Item key={item.id} item={item} onClick={this.handleOnRemove}/>
						)}
					</div>
					<div className="list__info">
						<ul>
							<h3>To-Do&apos;s</h3>
							<hr />
							<li>
								{(this.props.items) ? (this.props.items.length) : (<span>No</span>)} to-do&apos;s
								[<i className="fas fa-thumbs-up"></i>]
							</li>
							<li>
								{new Date().toDateString()}
								[<i className="fas fa-clock"></i>]
							</li>
							<hr />
							{this.props.isLoading && (<li>Loading...</li>)}
						</ul>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state: ToDoState) => (
	{
		items: state.toDo.items,
		isLoading: state.toDo.isLoading,
	}
);

export default connect( mapStateToProps, { getItems, removeItem })(ToDoList);
