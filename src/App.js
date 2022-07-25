import './App.css';
import { Fragment, useState } from 'react';
import Header from './components/Header';
import Jumbotron from './components/Jumbotron';
import Wallet from './components/Wallet';
import Minter from './components/Minter';
import { contractAddress } from './contracts/contractData';
import Footer from './components/Footer';

function App() {

  const [currentAccount, setCurrentAccount] = useState(null);

  const accountHandler = (account) => {
    setCurrentAccount(account);
  }

  return (
    <Fragment>
      <Header currentAccount={currentAccount} />
      <div className="app-container">
        <Jumbotron />
        <Wallet currentAccount={currentAccount} accountHandler={accountHandler} />
        {currentAccount && <Minter currentAccount={currentAccount} />}
        <Footer address={contractAddress} />
      </div>

    </Fragment>

  );
}

export default App;
