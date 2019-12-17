import React from 'react';
import logo from './logo.svg';
import './App.scss';


import MyProgress from './component/progress';

function App() {
  return (
    <div className="App">
      <div className="logo">
        <img src={logo} alt='' />
      </div>


      <div className='header'>
        <div className='header-con'>
          <div className='header-item supply-balance'>
            <span className='item-title'>Total Supply Balance</span>
            <span className='item-num'>0.00</span>
          </div>

          <div className='header-item borrow-balance'>
            <span className='item-title'>Total Borrow Balance</span>
            <span className='item-num item-num-borrow'>0.00</span>
          </div>

          <div className='header-item collate-rate'>
            <span className='item-title'>Total Collateralization ratio</span>
            <span className='item-num item-num-ratio'>0.00</span>
          </div>
        </div>
      </div>


      <div className='h3-wrap'>
        <h3>Market Overview</h3>
      </div>


      <div className='total-wrap'>
        <div className='total-wrap-supply'>
          <h4>Total Supply</h4>
          <MyProgress />
        </div>

        <div className='total-wrap-borrow'>
          <h4>Total Borrow</h4>
          <MyProgress />
        </div>
        <div className='clear'></div>
      </div>


    </div>
  );
}

export default App;
