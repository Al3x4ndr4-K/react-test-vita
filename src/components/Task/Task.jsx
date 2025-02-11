import { formatDistanceToNow } from 'date-fns'
import { Component } from 'react'

import './Task.css'
// eslint-disable-next-line import/extensions
import TaskTimer from '../TaskTimer/TaskTimer.jsx'

class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      newValue: props.value
    }
  }

  handleEdit = (e) => {
    const { id, editTask } = this.props
    const { newValue } = this.state

    if (e.key === 'Enter') {
      editTask(id, newValue)
      this.setState({ isEditing: false })
    }
  }

  toggleEdit = () => {
    this.setState({ isEditing: true })
  }

  handleChange = (e) => {
    this.setState({ newValue: e.target.value })
  }

  render() {
    const { value, id, deleteTask, toggleTask, status, createdAt, initialTime, updateTaskTime } = this.props
    const { isEditing, newValue } = this.state

    if (isEditing) {
      return (
        <li className='task'>
          <input
            className='editing'
            type='text'
            value={newValue}
            onChange={this.handleChange}
            onKeyDown={this.handleEdit}
          />
        </li>
      )
    }

    return (
      <li className='task'>
        <label htmlFor={`task-${id}`}>
          <input
            className='checkbox-toggle'
            type='checkbox'
            id={`task-${id}`}
            onClick={() => toggleTask(id)}
            defaultChecked={status}
          />
          <span
            className={`task-description ${status ? 'done' : ''}`}
            style={status ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}
          >
            {value}
          </span>
          <TaskTimer
            disabled={isEditing}
            initialTime={initialTime}
            updateTaskTime={(time) => updateTaskTime(id, time)}
          />
          <span className='task-created-at'>
            created {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </span>
        </label>
        <button
          className='edit-task-button task-buttons'
          type='button'
          onClick={this.toggleEdit}
          aria-label='Edit task'
        />
        <button
          className='delete-task-button task-buttons'
          type='button'
          onClick={() => deleteTask(id)}
          aria-label='Delete task'
        />
      </li>
    )
  }
}

export default Task
