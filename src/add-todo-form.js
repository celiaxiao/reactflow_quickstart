import PropTypes from 'prop-types'
import Button from './Buton'

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
    title: 'Task Tracker',
}

Form.propTypes = {
    title: PropTypes.string.isRequired,
  }


export default Header