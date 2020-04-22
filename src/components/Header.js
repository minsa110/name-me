import React from 'react'; // need to import because of the <h2> (which is a React component)
import PropTypes from 'prop-types';

const Header = ({ message }) => {
    return (
        <h2 className="Header text-center">
            {message}
        </h2>
    );
};

Header.propTypes = {
    message: PropTypes.string
};

export default Header; // for other modules to use this Header module
