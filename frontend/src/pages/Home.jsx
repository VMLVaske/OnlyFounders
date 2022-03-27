import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useCallContract, useConnectedAccount, useConnectedWeb3, useErc20BalanceOf, useEthBalanceOf } from '../web3/hooks';
import Token from '../data/contracts/Token.json'
import { fromWeiToFixed, toWei } from '../web3/utils/func';
import { TransactionButton, ConnectButton } from '../web3/components';
let regex = /^(?:[0-9]\d+|\d)(?:\.\d{0,2})?$/;
const onlyFounders = '0xc944eE998b6793Fa7511605A0577e245B1EEBc5a'

const Home = () => {
  const { account, } = useConnectedAccount();
  const balance = useErc20BalanceOf(onlyFounders, account, 2); // dai address
  const tokenUser = useErc20BalanceOf(Token.address, account, 2); // exchange token address
  const [errorMessage, setErrorMessage] = useState('')
  const [inputValue, setInputValue] = useState("");
  const [inputAddress, setInputAddress] = useState('')
  const [owner, setOwner] = useState("");
  const [minter, setMinter] = useState('')
  // const { web3, }  = useConnectedWeb3()

  const onChangeHandler = (e) => {
    let newValue = e.target.value;

    if (e.target.value.includes(',')) {
      newValue = e.target.value.replace(',', '.');
    }
    if (regex.test(newValue) && newValue > 0.00) {
      setErrorMessage('')
    } else {
      setErrorMessage('Eingabefehler');
    }
    if (newValue == '') setErrorMessage('')
    setInputValue(newValue);
  }

  const onChangeOwner = (e) => {
    let newValue = e.target.value;
    setOwner(newValue);
  }

  const onChangeMinter = (e) => {
    let newValue = e.target.value;
    setMinter(newValue);
  }

  const onChangeAddress = (e) => {
    let newValue = e.target.value;

    setInputAddress(newValue);
  }

  return ( 
    <>
    <Container fluid style={{ padding: '20px' }}>
      <Row style={{ width: '100%' }}>
        <Col style={{ maxWidth: '300px', marginRight: '50px' }}>
          <ConnectButton language='de' />
        </Col>
      </Row>
      <Container style={{ width: '100%', padding: '20px' }}>
        <div style={{ width: '100%', padding: '20px', marginTop: '50px' }}>
        <div>
            Contract Address 
          </div>
          <div>
            <input placeholder='0.x1234...' onChange={onchangeAddress} value={inputValue} className='input-std ml-1' />
          </div>
          <div>
            {errorMessage}
          </div>
          <div>
            Wert:
          </div>
          <div>
            <input placeholder='0.00' onChange={onChangeHandler} value={inputValue} className='input-std ml-1' />
          </div>
          <div>
            {errorMessage}
          </div>
          <div>
            <br />
          </div>
          <div>
            Empfänger:
          </div>
          <div>
            <input placeholder='0x1234...' onChange={onChangeAddress} value={inputAddress} className='input-std ml-1' />
          </div>
        </div>
        <div style={{ width: '100%', padding: '20px'}}>
          <center>
            <TransactionButton
              address={onlyFounders}
              abi={Token}
              method={'mint'}
              args={[inputAddress, toWei(inputValue)]}
              confirmations={1} //optional
              language={'de'} //optional
              text={'Mint'}
            />
          </center>
        </div>

        <div style={{ width: '100%', padding: '20px', marginTop: '50px' }}>
          <div>
            Add new minter (only owner):
          </div>
          <div>
            <input placeholder='0x1234...' onChange={onChangeMinter} value={minter} className='input-std ml-1' />
          </div>
        </div>
        <div style={{ width: '100%', padding: '20px', }}>
          <center>
            <TransactionButton
              address={onlyFounders}
              abi={Token}
              method={'setMinter'}
              args={[minter, "true"]}
              confirmations={1} //optional
              language={'de'} //optional
              text={'Set minter'}
            />
          </center>
        </div>

        <div style={{ width: '100%', padding: '20px', marginTop: '50px' }}>
          <div>
            Transfer Ownership:
          </div>
          <div>
            <input placeholder='0x1234...' onChange={onChangeOwner} value={owner} className='input-std ml-1' />
          </div>
        </div>
        <div style={{ width: '100%', padding: '20px' }}>
          <center>
            <TransactionButton
              address={onlyFounders}
              abi={Token}
              method={'transferOwnership'}
              args={[owner]}
              confirmations={1} //optional
              language={'de'} //optional
              text={'Set owner'}
            />
          </center>
        </div>


      </Container>
      {/* {web3} */}
    </Container>
  </>
  );
}

export default Home;