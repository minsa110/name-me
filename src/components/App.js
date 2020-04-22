import React from 'react';
import Header from './Header';
// ^ can be read as "this module depends on react and the Header component"

const App = () => {
    return (
        <div className="App"> {/* need to wrap multiple html tags in one div */}
            <Header message="Name me! - by Soojin" />
            <div>
                ...
            </div>
        </div>
    );
};

export default App;
