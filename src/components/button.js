//import React from 'react'
import PropTypes from 'prop-types'

const button = ({color,text, onChick}) => {
    
    return (
        <button onClick ={onChick} style={{backgroundColor: color}} className='btn'>
            {text}
        </button>
    )
}

//defaultProps:
button.defaulProps={
    color : 'steelblue'
}

//proptypes:
button.propTypes={
    text: PropTypes.string,
    color: PropTypes.string,
    onChick: PropTypes.func,
    
}

export default button
