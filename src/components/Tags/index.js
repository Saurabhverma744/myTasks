import './index.css'

const Tags = props => {
  const {each, isActive, onClickOptionId} = props
  const {displayText, optionId} = each
  const activate = isActive ? 'tag-list btn' : 'tag-list'

  const onClickTags = () => {
    onClickOptionId(optionId)
  }

  return (
    <li className={activate}>
      <button type="button" className="tag-btn" onClick={onClickTags}>
        {displayText}
      </button>
    </li>
  )
}

export default Tags
