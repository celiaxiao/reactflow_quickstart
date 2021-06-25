import { isNode } from 'react-flow-renderer'
import { FaTimes } from 'react-icons/fa'

//display single element
const Edges = ({ el, onDelete }) => {
    return (
      <div>
          {!isNode(el) ? (
        <div>
          <h3>
          {el.id}{' '}
          <FaTimes
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={() => onDelete(el.id)}
          />
        </h3>
        <p>{el.source}</p>
        <p>{el.target}</p>
        </div>) : ''}
        
      </div>
    )
  }

  //display list of elements
const DisplayElements = ({ elements, onDelete }) => {
  return (
    <>
      {elements.map((el, id) => (
        <Element key={id} el={el} onDelete={onDelete} />
      ))}
    </>
  )
}

export default DisplayElements