import './index.css'

const Tasks = props => {
  const {each} = props
  const {searchInput, tagElement} = each

  return (
    <li className="tasks-list">
      <p>{searchInput}</p>
      <p className="tag-element">{tagElement}</p>
    </li>
  )
}

export default Tasks
