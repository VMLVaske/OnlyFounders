import './App.css';
import Web3Wrapper from './web3/wrapper/Web3Wrapper';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './pages/Home';

const wrapperConfig = {
  infura: 'b875684882204055bac61ec57a3ea1a1',
  network: 4,
  rpc: 'https://rinkeby.infura.io/v3/b875684882204055bac61ec57a3ea1a1',
  blockexplorer: {
    url: 'https://rinkeby.etherscan.io',
    name: 'etherscan'
  },
}


function App() {
  return (
    <div className="App">
      <Web3Wrapper config={wrapperConfig}>
        <Router>
          <Switch>

            <Route exact path='/projects/moki/'>
              <Home />
            </Route>

          </Switch>
        </Router>
      </Web3Wrapper>
    </div>
  );
}

export default App;
