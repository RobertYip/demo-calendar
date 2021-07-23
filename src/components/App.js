import './app.css';

import React from 'react';
import Calendar from './Calendar';
import Header from './Header';

// const style = {
//     position: "relative",
//     margin: "50px auto",
//     width: "350px"
// }


class App extends React.Component {

    render() {
        return (
            <div className="main-container">   
                <Header />
                <Calendar />
            </div>
        )
    };
}
export default App;