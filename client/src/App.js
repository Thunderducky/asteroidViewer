import React from 'react';
import axios from 'axios'
import Viewer from './components/Viewer';

class App extends React.Component {
  render(){
    return (
      <div>
        <Viewer />
      </div>
    );
  }
}

export default App;
