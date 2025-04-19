import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import Tags from '../Tags'
import Tasks from '../Tasks'
import './index.css'

class TaskMaker extends Component {
  state = {
    searchInput: '',
    tagElement: 'Health',
    currentOptionId: 'ALL',
    taskList: [],
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeSelect = event => {
    const {tagsList} = this.props
    const selectedOption = tagsList.find(
      each => each.optionId === event.target.value,
    )
    this.setState({tagElement: selectedOption.displayText})
  }

  onClickOptionId = optionId => {
    this.setState(prevState => ({
      currentOptionId:
        prevState.currentOptionId === optionId ? 'ALL' : optionId,
    }))
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {searchInput, tagElement} = this.state
    if (searchInput && tagElement) {
      const newTask = {
        id: uuid(),
        searchInput,
        tagElement,
      }
      this.setState(prevState => ({
        taskList: [...prevState.taskList, newTask],
        searchInput: '',
        tagElement: 'Health',
        currentOptionId: 'ALL',
      }))
    }
  }

  render() {
    const {tagsList} = this.props
    const {searchInput, tagElement, currentOptionId, taskList} = this.state

    const filteredList =
      currentOptionId === 'ALL'
        ? taskList
        : taskList.filter(
            each => each.tagElement.toUpperCase() === currentOptionId,
          )

    return (
      <div className="container">
        <div className="sub-container">
          <h1 className="task-heading">Create a task!</h1>
          <form className="form" onSubmit={this.onSubmitForm}>
            <label className="label" htmlFor="text">
              Task
            </label>
            <input
              className="input"
              id="text"
              placeholder="Enter the task here"
              onChange={this.onChangeInput}
              value={searchInput}
            />

            <label className="label" htmlFor="task">
              Tags
            </label>
            <select
              id="task"
              className="input"
              onChange={this.onChangeSelect}
              value={
                tagsList.find(tag => tag.displayText === tagElement)?.optionId
              }
            >
              {tagsList.map(each => (
                <option value={each.optionId} key={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>

            <div className="button-container">
              <button type="submit" className="add-button">
                Add Task
              </button>
            </div>
          </form>
        </div>

        <div className="tags-container">
          <h1>Tags</h1>
          <ul className="ul-list">
            {tagsList.map(each => (
              <Tags
                key={each.optionId}
                each={each}
                isActive={each.optionId === currentOptionId}
                onClickOptionId={this.onClickOptionId}
              />
            ))}
          </ul>

          <h1>Tasks</h1>
          <ul className="ul-list new">
            {filteredList.length === 0 ? (
              <p>No Tasks Added Yet</p>
            ) : (
              filteredList.map(each => <Tasks each={each} key={each.id} />)
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default TaskMaker
