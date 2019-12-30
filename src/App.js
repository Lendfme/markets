import React from 'react';
import logo from './logo.svg';
import './App.scss';
import _ from 'lodash';

import MyProgress from './component/progress';

import BTC from './images/BTC.svg';
import imBTC from './images/imBTC.svg';
import USDx from './images/USDx.svg';
import UUDD from './images/UUDD.svg';
import USDT from './images/USDT.svg';
import WETH from './images/WETH.svg';
import telegram from './images/telegram.svg';
import twitter from './images/twitter.svg';
import medium from './images/medium.svg';





export default class App extends React.Component {
  constructor(porps) {
    super(porps);

    this.state = {
      data_is_ok: false,
      token: {
        WETH: WETH,
        UUDD: UUDD,
        imBTC: imBTC,
        USDT: USDT,
        USDx: USDx
      }
    }

    // this.markets_api = 'https://test.lendf.me/info?data=markets';
    this.markets_api = 'https://api.lendf.me/v1/info?data=markets';
    fetch(this.markets_api)
      .then((res) => { return res.text() })
      .then((data) => {
        if (data) {
          var obj_data = JSON.parse(data);
          console.log(obj_data);

          this.setState({ data: obj_data, data_is_ok: true }, () => {
            // return false;
            var supply_array = _.cloneDeep(this.state.data.markets);
            var borrow_array = _.cloneDeep(this.state.data.markets);

            supply_array.sort(this.compare_supply);
            borrow_array.sort(this.compare_borrow);

            for (var i = 0; i < supply_array.length; i++) {
              supply_array[i].persentage_supply = Number((supply_array[i].totalSupplyUSD / this.state.data.totalSupplyBalanceUSD * 100).toFixed(1));
            }
            for (var j = 0; j < borrow_array.length; j++) {
              borrow_array[j].persentage_borrow = Number((borrow_array[j].totalBorrowUSD / this.state.data.totalBorrowBalanceUSD * 100).toFixed(1));
            }

            this.setState({
              supply_array: supply_array,
              borrow_array: borrow_array,
              array_is_ok: true
            })

            console.log(supply_array);
            console.log(borrow_array);
          })
        }
      })

  }


  compare_supply = (val1, val2) => {
    return val2.totalSupplyUSD - val1.totalSupplyUSD;
  };

  compare_borrow = (val1, val2) => {
    return val2.totalBorrowUSD - val1.totalBorrowUSD;
  };

  format_str_to_kmb = (str_num) => {
    var t_num = Number(str_num);
    var out_a, out_b, t_index;

    if (t_num >= 1E9) {
      out_a = Math.floor(t_num / 1E9);
      if ((t_num % 1E9 / 1E9).toString().indexOf('.') > 0) {
        t_index = (t_num % 1E9 / 1E9).toString().indexOf('.') + 1;
        out_b = (t_num % 1E9 / 1E9).toString().substr(t_index, 2);
      } else {
        out_b = '00';
      }
      return out_a + '.' + out_b + 'G';
    }
    if (t_num >= 1E6) {
      out_a = Math.floor(t_num / 1E6);
      if ((t_num % 1E6 / 1E6).toString().indexOf('.') > 0) {
        t_index = (t_num % 1E6 / 1E6).toString().indexOf('.') + 1;
        out_b = (t_num % 1E6 / 1E6).toString().substr(t_index, 2);
      } else {
        out_b = '00';
      }
      return out_a + '.' + out_b + 'M';
    }
    if (t_num >= 1E3) {
      out_a = Math.floor(t_num / 1E3);
      if ((t_num % 1E3 / 1E3).toString().indexOf('.') > 0) {
        t_index = (t_num % 1E3 / 1E3).toString().indexOf('.') + 1;
        out_b = (t_num % 1E3 / 1E3).toString().substr(t_index, 2);
      } else {
        out_b = '00';
      }
      return out_a + '.' + out_b + 'K';
    }

    return str_num;
  }

  format_str_to_persent = (str_num) => {
    return (Number(str_num) * 100).toFixed(2) + '%';
  }

  format_str_to_K = (str_num) => {
    var reg = /\d{1,3}(?=(\d{3})+$)/g;

    if (str_num.indexOf('.') > 0) {
      str_num = str_num.slice(0, str_num.indexOf('.') + 3);
    }

    if (str_num.indexOf('.') > 0) {
      var part_a = str_num.split('.')[0];
      var part_b = str_num.split('.')[1];

      part_a = (part_a + '').replace(reg, '$&,');

      return part_a + '.' + part_b;
    } else {
      str_num = (str_num + '').replace(reg, '$&,');
      return str_num;
    }
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
              <span className='item-num'>$
                {this.state.data_is_ok ? this.format_str_to_K(this.state.data.totalSupplyBalanceUSD) : '0.00'}
              </span>
            </div>

            <div className='header-item borrow-balance'>
              <span className='item-title'>Total Borrow Balance</span>
              <span className='item-num item-num-borrow'>$
                {this.state.data_is_ok ? this.format_str_to_K(this.state.data.totalBorrowBalanceUSD) : '0.00'}
              </span>
            </div>

            <div className='header-item collate-rate'>
              <span className='item-title'>Total Collateralization ratio</span>
              <span className='item-num item-num-ratio'>
                {this.state.data_is_ok ? this.format_str_to_persent(this.state.data.totalCollateralizationRatio) : '...'}
              </span>
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
              {
                this.state.array_is_ok &&
                this.state.supply_array.map(supply_item => {
                  return (
                    <MyProgress {...supply_item} key={supply_item.symbol} type={'supply'} />
                  )
                })
              }
            </div>
          </div>

          <div className='total-wrap-borrow'>
            <h4>Total Borrow</h4>
            <div style={{ width: '90%', margin: '0 auto' }}>
              {
                this.state.array_is_ok &&
                this.state.borrow_array.map(borrow_item => {
                  return (
                    <MyProgress {...borrow_item} key={borrow_item.symbol} type={'borrow'} />
                  )
                })
              }
            </div>
          </div>
          <div className='clear'></div>
        </div>


        <div className='all-markets'>
          <h5>All Markets</h5>
          <table>
            <thead>
              <tr>
                <th>Market</th>
                <th>Gross Supply</th>
                <th>Supply APR</th>
                <th>Gross Borrow</th>
                <th>Borrow APR</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.data_is_ok &&
                this.state.data.markets.map(item => {
                  return (
                    <tr key={item.asset}>
                      <td>
                        <img alt='' src={this.state.token[item.symbol]} />
                        <span className='token-name'>{item.name}</span>
                        <span className='token-name-short'>{item.symbol}</span>
                      </td>
                      <td>${this.format_str_to_kmb(item.totalSupplyUSD)}</td>
                      <td>{this.format_str_to_persent(item.supplyAPR)}</td>
                      <td>${this.format_str_to_kmb(item.totalBorrowUSD)}</td>
                      <td>{this.format_str_to_persent(item.borrowAPR)}</td>
                    </tr>
                  )
                })
              }
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
            <a href='https://twitter.com/LendfMe' target='_blank'><img src={twitter} alt='' /></a>
            <a href='https://medium.com/dforcenet' target='_blank'><img src={medium} alt='' /></a>
            <a href='https://t.me/dforcenet' target='_blank'><img src={telegram} alt='' /></a>
          </div>
          <div className='clear'></div>
        </div>




      </div>
    )
  }

}