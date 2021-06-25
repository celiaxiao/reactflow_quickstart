import PropTypes from 'prop-types'
import Button from './Button'

//the header to decide whether to show form
const Form = ({title, onAdd, showAdd}) => {
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button 
            color={showAdd ? 'red' : 'green'}
            text={showAdd ? 'Close' : 'Add'}
            onClick={onAdd}/>
        </header>
    )
}

Form.defaultProps = {
    title: 'Add new node',
}

Form.propTypes = {
    title: PropTypes.string.isRequired,
  }


export default Form