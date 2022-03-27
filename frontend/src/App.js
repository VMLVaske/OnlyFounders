import './App.css';
import Web3Wrapper from './web3/wrapper/Web3Wrapper';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './pages/Home';

const wrapperConfig = {
  infura: '',
  network: 80001,
  rpc: 'https://polygon-mumbai.g.alchemy.com/v2/0NNPYrUw2G92VSsJG-bezGptnY5g4Dlt',
  blockexplorer: {
    url: 'https://mumbai.polygonscan.com/',
    name: 'mumbaiscan'
  },
}


function App() {
  return (
    <div className="App">
      <Web3Wrapper config={wrapperConfig}>
        <Router>
          <Switch>

            <Route exact path='/'>
              <Home />
            </Route>

          </Switch>
        </Router>
      </Web3Wrapper>
    </div>
  );
}

export default App;
