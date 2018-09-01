import React from 'react';
import NavigationBar from '../components/NavigationBar';
import FlashMessagesList from '../components/flash/FlashMessagesList';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid" style={{padding:0,minHeight:'100vh'}}>
        <NavigationBar />
        <FlashMessagesList />
        {this.props.children}
      </div>
    );
  }
}

export default App;
