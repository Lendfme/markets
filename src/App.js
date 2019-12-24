import React from 'react';
import logo from './logo.svg';
import './App.scss';
// import Web3 from 'web3';

import MyProgress from './component/progress';

// let address_map = require('./abi/address_map.json');
// let mMarket_abi = require('./abi/moneyMarket.json');
import BTC from './images/BTC.svg';
import USDx from './images/USDx.svg';
import USDT from './images/USDT.svg';
import WETH from './images/WETH.svg';
import telegram from './images/telegram.svg';
import twitter from './images/twitter.svg';





export default class App extends React.Component {
  constructor(porps) {
    super(porps);

    // this.new_web3 = window.new_web3 = new Web3(Web3.givenProvider || null);
    // this.bn = this.new_web3.utils.toBN;

    // this.new_web3.eth.net.getNetworkType().then(
    //   (net_type) => {
    //     let mMarket = new this.new_web3.eth.Contract(mMarket_abi, address_map[net_type]['mMarket']);
    //     this.setState({
    //       net_type: net_type,
    //       mMarket: mMarket
    //     }, () => {
    //       // this.state.mMarket.methods.markets().call().then(res_market => {
    //       //   console.log(res_market);
    //       // })
    //     })
    //   }
    // )

  }

  render() {
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
            <div style={{ width: '90%', margin: '0 auto' }}>
              <MyProgress />
              <MyProgress />
            </div>
          </div>

          <div className='total-wrap-borrow'>
            <h4>Total Borrow</h4>
            <div style={{ width: '90%', margin: '0 auto' }}>
              <MyProgress />
              <MyProgress />
            </div>
          </div>
          <div className='clear'></div>
        </div>


        <div className='all-markets'>
          <h5>All Markets</h5>
          <table>
            <thead>
              <tr>
                <th className='th-1'>Market</th>
                <th className='th-2'>Gross Supply</th>
                <th className='th-3'>Supply APR</th>
                <th className='th-4'>Gross Borrow</th>
                <th className='th-5'>Borrow APR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='td-1'>
                  <img alt='' src={WETH} />
                  <span className='token-name'>Ether</span>
                  <span className='token-name-short'>ETH</span>
                </td>
                <td className='td-2'>$45.89M</td>
                <td className='td-3'>0.05%</td>
                <td className='td-4'>$45.89M</td>
                <td className='td-5'>0.05%</td>
              </tr>

              <tr>
                <td className='td-1'>
                  <img alt='' src={USDx} />
                  <span className='token-name'>dForce USD</span>
                  <span className='token-name-short'>USDx</span>
                </td>
                <td className='td-2'>$45.89M</td>
                <td className='td-3'>0.05%</td>
                <td className='td-4'>$45.89M</td>
                <td className='td-5'>0.05%</td>
              </tr>

              <tr>
                <td className='td-1'>
                  <img alt='' src={USDT} />
                  <span className='token-name'>Tether USD</span>
                  <span className='token-name-short'>USDT</span>
                </td>
                <td className='td-2'>$45.89M</td>
                <td className='td-3'>0.05%</td>
                <td className='td-4'>$45.89M</td>
                <td className='td-5'>0.05%</td>
              </tr>
            </tbody>
          </table>
        </div>


        <div className='footer'>
          <div className='footer-left'>
            <a href='www.abc.com' target='_blank'>GitHub</a>
            <a href='www.abc.com' target='_blank'>Docs</a>
            <a href='www.abc.com' target='_blank'>FAQ</a>
          </div>

          <div className='footer-right'>
            <a href='www.abc.com' target='_blank'><img src={telegram} alt='' /></a>
            <a href='www.abc.com' target='_blank'><img src={twitter} alt='' /></a>
          </div>
          <div className='clear'></div>
        </div>




      </div>
    )
  }

}
