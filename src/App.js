import React from 'react';
import logo from './logo.svg';
import './App.scss';
import _ from 'lodash';

import MyProgress from './component/progress';

import BTC from './images/BTC.svg';
import imBTC from './images/imBTC.svg';
import HUBTC from './images/HBTC.svg';
import HBTC from './images/HBTC.svg';
import USDx from './images/USDx.svg';
import UUDD from './images/UUDD.svg';
import USDT from './images/USDT.svg';
import WETH from './images/WETH.svg';
import telegram from './images/telegram.svg';
import twitter from './images/twitter.svg';
import medium from './images/medium.svg';
import up from './images/up.svg';
import UUTT from './images/USDT.svg';
import WBTC from './images/WBTC.svg';
import DAI from './images/DAI.svg';
import HUSD from './images/HUSD.svg';
// png
import usdc from './images/usdc.png';
import tusd from './images/tusd.png';
import pax from './images/pax.png';


// add i18n.
import { IntlProvider, FormattedMessage } from 'react-intl';
import en_US from './language/en_US.js';
import zh_CN from './language/zh_CN';




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
        USDx: USDx,
        HUBTC: HUBTC,
        HBTC: HBTC,
        USDC: usdc,
        TUSD: tusd,
        UUTT: UUTT,
        PAX: pax,
        WBTC: WBTC,
        DAI: DAI,
        HUSD: HUSD
      },
      cur_language: navigator.language === 'zh-CN' ? '中文' : 'English',
      arr_token: [
        "0xD96cC7f80C1cb595eBcdC072531e1799B3a2436E", // usdx
        "0xaa74B62f737bbA1D2E520F9ec38Fc23b6E6817df", // usdt
        "0x8a5C1BD4D75e168a4f65eB902c289400B90FD980", // dai
        "0x0D518472330FF1D943881BBBDda03b221A7F9F74", // husd
        "0x7A967421410019044aA829746D65575325082e99", // weth
        "0x5Dc95A046020880b93F15902540Dbfe86489FddA", // imbtc
        "0xcf07906CbCF9824D0caE475E8F958d48AcF1014C", // hbtc
        "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b", // usdc
        "0x722E6238335d89393A42e2cA316A5fb1b8B2EB55", // pax
        "0xe72a3181f69Eb21A19bd4Ce19Eb68FDb333d74c6",// tusd
        "0x7B65B937A0f3764a7a5e29fD696C391233218E91", // wbtc
      ]
    }

    // test
    this.markets_api = 'https://test.lendf.me/v2/info?data=markets';

    // product
    // this.markets_api = 'https://api.lendf.me/v2/info?data=markets';

    this.get_markets_data();

    this.timer = setInterval(() => {
      this.get_markets_data();
    }, 1000 * 15)

  }

  get_markets_data = () => {
    fetch(this.markets_api)
      .then((res) => { return res.text() })
      .then((data) => {
        if (data) {
          var obj_data = JSON.parse(data);
          console.log(obj_data);

          var arr_markets = [];
          var key_arr = Object.keys(obj_data.markets);
          for (var i = 0; i < key_arr.length; i++) {
            arr_markets.push(obj_data.markets[key_arr[i]])
          }
          console.log(arr_markets);
          // return;

          this.setState({
            data: obj_data,
            data_is_ok: true,
            data_markets: arr_markets
          }, () => {
            var supply_array = _.cloneDeep(this.state.data_markets);
            var borrow_array = _.cloneDeep(this.state.data_markets);

            supply_array.sort(this.compare_supply);
            borrow_array.sort(this.compare_borrow);

            for (var i = 0; i < supply_array.length; i++) {
              supply_array[i].persentage_supply = Number((supply_array[i].grossSupplyUSD / this.state.data.totalSupplyBalanceUSD * 100)).toFixed(1);
            }
            for (var j = 0; j < borrow_array.length; j++) {
              borrow_array[j].persentage_borrow = Number((borrow_array[j].totalBorrowUSD / this.state.data.totalBorrowBalanceUSD * 100)).toFixed(1);
            }

            this.setState({
              supply_array: supply_array,
              borrow_array: borrow_array,
              array_is_ok: true
            })
            // console.log(supply_array);
            // console.log(borrow_array);
          })
        }
      })
  }


  compare_supply = (val1, val2) => {
    return val2.grossSupplyUSD - val1.grossSupplyUSD;
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

    if (str_num.indexOf('.') > 0) {
      var aaa = str_num.split('.')[0];
      var bbb = str_num.split('.')[1];
      return str_num = aaa + '.' + bbb.substr(0, 2);
    }

    return str_num;
  }

  format_str_to_persent = (str_num) => {
    // console.log(str_num)
    var index_num = str_num.indexOf('.') + 2;
    var cpmp_str = str_num.replace(/\./, '');
    var res_str = cpmp_str.slice(0, index_num) + '.' + cpmp_str.substr(index_num, 2);
    // console.log(Number(res_str))

    if (Number(res_str) === 0) {
      return '<0.01%'
    } else {
      return Number(res_str) + '%';
    }
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

  clickFAQ = () => {
    // console.log('aaaaa');
    if (this.state.cur_language === '中文') {
      window.open('https://docs.lendf.me/faqcn', '_blank');
    } else {
      window.open('https://docs.lendf.me/faq', '_blank');
    }
  }


  render() {
    return (
      <IntlProvider locale={'en'} messages={this.state.cur_language === '中文' ? zh_CN : en_US} >
        <div className="App">
          <div className="logo">
            <a href='https://www.lendf.me/' target='_blank' rel="noopener noreferrer">
              <img src={logo} alt='' />
            </a>
          </div>


          <div className='header'>
            <div className='header-con'>
              <div className='header-item supply-balance'>
                <span className='item-title'>
                  <FormattedMessage id='Total_Supply_Balance' />
                </span>
                <span className='item-num'>$
                {this.state.data_is_ok ? this.format_str_to_K(this.state.data.totalSupplyBalanceUSD) : '0.00'}
                </span>
              </div>

              <div className='header-item borrow-balance'>
                <span className='item-title'>
                  <FormattedMessage id='Total_Borrow_Balance' />
                </span>
                <span className='item-num item-num-borrow'>$
                {this.state.data_is_ok ? this.format_str_to_K(this.state.data.totalBorrowBalanceUSD) : '0.00'}
                </span>
              </div>

              <div className='header-item collate-rate'>
                <span className='item-title'>
                  <FormattedMessage id='Total_Collateralization_ratio' />
                </span>
                <span className='item-num item-num-ratio'>
                  {this.state.data_is_ok ? this.format_str_to_persent(this.state.data.totalCollateralizationRatio) : '...'}
                </span>
              </div>
            </div>
          </div>


          <div className='h3-wrap'>
            <h3>
              <FormattedMessage id='Market_Overview' />
            </h3>
          </div>


          <div className='total-wrap'>
            <div className='total-wrap-supply'>
              <h4>
                <FormattedMessage id='Total_Supply' />
              </h4>
              <div className='pro_wrap' style={{ width: '100%', margin: '0 auto' }}>
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
              <h4>
                <FormattedMessage id='Total_Borrow' />
              </h4>
              <div className='pro_wrap' style={{ width: '100%', margin: '0 auto' }}>
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
            <h5>
              <FormattedMessage id='All_Markets' />
            </h5>
            <table>
              <thead>
                <tr>
                  <th>
                    <span className={this.state.cur_language === 'English' ? 'linheight45' : 'linheight30'}>
                      <FormattedMessage id='Market' />
                    </span>
                  </th>
                  <th>
                    <span className={this.state.cur_language === 'English' ? 'linheight45' : 'linheight30'}>
                      <FormattedMessage id='Gross_Supply' />
                    </span>
                  </th>
                  <th>
                    <span className={this.state.cur_language === 'English' ? 'linheight45' : 'linheight30'}>
                      <FormattedMessage id='Supply_APR' />
                    </span>
                  </th>
                  <th>
                    <span className={this.state.cur_language === 'English' ? 'linheight45' : 'linheight30'}>
                      <FormattedMessage id='Gross_Borrow' />
                    </span>
                  </th>
                  <th>
                    <span className={this.state.cur_language === 'English' ? 'linheight45' : 'linheight30'}>
                      <FormattedMessage id='Borrow_APR' />
                    </span>
                  </th>
                </tr>
              </thead>
            </table>
            <div className='body-wrap'>
              <table>
                <tbody>
                  {
                    this.state.data_is_ok &&
                    this.state.data_markets.map(item => {
                      if (item.asset.toLowerCase() === this.state.arr_token[0].toLowerCase()) {
                        return (
                          <tr key={item.asset}>
                            <td>
                              <img alt='' src={this.state.token[item.symbol]} />
                              <span className='token-name'>{item.name}</span>
                              <span className='token-name-short'>{item.symbol}</span>
                            </td>
                            <td>${this.format_str_to_kmb(item.grossSupplyUSD)}</td>
                            <td>{this.format_str_to_persent(item.supplyAPR)}</td>
                            <td>${this.format_str_to_kmb(item.totalBorrowUSD)}</td>
                            <td>{this.format_str_to_persent(item.borrowAPR)}</td>
                          </tr>
                        )
                      }
                    })
                  }

                  {
                    this.state.data_is_ok &&
                    this.state.data_markets.map(item => {
                      if (item.asset.toLowerCase() === this.state.arr_token[1].toLowerCase()) {
                        return (
                          <tr key={item.asset}>
                            <td>
                              <img alt='' src={this.state.token[item.symbol]} />
                              <span className='token-name'>{item.name}</span>
                              <span className='token-name-short'>{item.symbol}</span>
                            </td>
                            <td>${this.format_str_to_kmb(item.grossSupplyUSD)}</td>
                            <td>{this.format_str_to_persent(item.supplyAPR)}</td>
                            <td>${this.format_str_to_kmb(item.totalBorrowUSD)}</td>
                            <td>{this.format_str_to_persent(item.borrowAPR)}</td>
                          </tr>
                        )
                      }
                    })
                  }

                  {
                    this.state.data_is_ok &&
                    this.state.data_markets.map(item => {
                      if (item.asset.toLowerCase() === this.state.arr_token[2].toLowerCase()) {
                        return (
                          <tr key={item.asset}>
                            <td>
                              <img alt='' src={this.state.token[item.symbol]} />
                              <span className='token-name'>{item.name}</span>
                              <span className='token-name-short'>{item.symbol}</span>
                            </td>
                            <td>${this.format_str_to_kmb(item.grossSupplyUSD)}</td>
                            <td>{this.format_str_to_persent(item.supplyAPR)}</td>
                            <td>${this.format_str_to_kmb(item.totalBorrowUSD)}</td>
                            <td>{this.format_str_to_persent(item.borrowAPR)}</td>
                          </tr>
                        )
                      }
                    })
                  }

                  {
                    this.state.data_is_ok &&
                    this.state.data_markets.map(item => {
                      if (item.asset.toLowerCase() === this.state.arr_token[3].toLowerCase()) {
                        return (
                          <tr key={item.asset}>
                            <td>
                              <img alt='' src={this.state.token[item.symbol]} />
                              <span className='token-name'>{item.name}</span>
                              <span className='token-name-short'>{item.symbol}</span>
                            </td>
                            <td>${this.format_str_to_kmb(item.grossSupplyUSD)}</td>
                            <td>{this.format_str_to_persent(item.supplyAPR)}</td>
                            <td>${this.format_str_to_kmb(item.totalBorrowUSD)}</td>
                            <td>{this.format_str_to_persent(item.borrowAPR)}</td>
                          </tr>
                        )
                      }
                    })
                  }

                  {
                    this.state.data_is_ok &&
                    this.state.data_markets.map(item => {
                      if (item.asset.toLowerCase() === this.state.arr_token[4].toLowerCase()) {
                        return (
                          <tr key={item.asset}>
                            <td>
                              <img alt='' src={this.state.token[item.symbol]} />
                              <span className='token-name'>{item.name}</span>
                              <span className='token-name-short'>{item.symbol}</span>
                            </td>
                            <td>${this.format_str_to_kmb(item.grossSupplyUSD)}</td>
                            <td>{this.format_str_to_persent(item.supplyAPR)}</td>
                            <td>${this.format_str_to_kmb(item.totalBorrowUSD)}</td>
                            <td>{this.format_str_to_persent(item.borrowAPR)}</td>
                          </tr>
                        )
                      }
                    })
                  }

                  {
                    this.state.data_is_ok &&
                    this.state.data_markets.map(item => {
                      if (item.asset.toLowerCase() === this.state.arr_token[5].toLowerCase()) {
                        return (
                          <tr key={item.asset}>
                            <td>
                              <img alt='' src={this.state.token[item.symbol]} />
                              <span className='token-name'>{item.name}</span>
                              <span className='token-name-short'>{item.symbol}</span>
                            </td>
                            <td>${this.format_str_to_kmb(item.grossSupplyUSD)}</td>
                            <td>{this.format_str_to_persent(item.supplyAPR)}</td>
                            <td>${this.format_str_to_kmb(item.totalBorrowUSD)}</td>
                            <td>{this.format_str_to_persent(item.borrowAPR)}</td>
                          </tr>
                        )
                      }
                    })
                  }

                  {
                    this.state.data_is_ok &&
                    this.state.data_markets.map(item => {
                      if (item.asset.toLowerCase() === this.state.arr_token[6].toLowerCase()) {
                        return (
                          <tr key={item.asset}>
                            <td>
                              <img alt='' src={this.state.token[item.symbol]} />
                              <span className='token-name'>{item.name}</span>
                              <span className='token-name-short'>{item.symbol}</span>
                            </td>
                            <td>${this.format_str_to_kmb(item.grossSupplyUSD)}</td>
                            <td>{this.format_str_to_persent(item.supplyAPR)}</td>
                            <td>${this.format_str_to_kmb(item.totalBorrowUSD)}</td>
                            <td>{this.format_str_to_persent(item.borrowAPR)}</td>
                          </tr>
                        )
                      }
                    })
                  }

                  {
                    this.state.data_is_ok &&
                    this.state.data_markets.map(item => {
                      if (item.asset.toLowerCase() === this.state.arr_token[7].toLowerCase()) {
                        return (
                          <tr key={item.asset}>
                            <td>
                              <img alt='' src={this.state.token[item.symbol]} />
                              <span className='token-name'>{item.name}</span>
                              <span className='token-name-short'>{item.symbol}</span>
                            </td>
                            <td>${this.format_str_to_kmb(item.grossSupplyUSD)}</td>
                            <td>{this.format_str_to_persent(item.supplyAPR)}</td>
                            <td>${this.format_str_to_kmb(item.totalBorrowUSD)}</td>
                            <td>{this.format_str_to_persent(item.borrowAPR)}</td>
                          </tr>
                        )
                      }
                    })
                  }

                  {
                    this.state.data_is_ok &&
                    this.state.data_markets.map(item => {
                      if (item.asset.toLowerCase() === this.state.arr_token[8].toLowerCase()) {
                        return (
                          <tr key={item.asset}>
                            <td>
                              <img alt='' src={this.state.token[item.symbol]} />
                              <span className='token-name'>{item.name}</span>
                              <span className='token-name-short'>{item.symbol}</span>
                            </td>
                            <td>${this.format_str_to_kmb(item.grossSupplyUSD)}</td>
                            <td>{this.format_str_to_persent(item.supplyAPR)}</td>
                            <td>${this.format_str_to_kmb(item.totalBorrowUSD)}</td>
                            <td>{this.format_str_to_persent(item.borrowAPR)}</td>
                          </tr>
                        )
                      }
                    })
                  }

                  {
                    this.state.data_is_ok &&
                    this.state.data_markets.map(item => {
                      if (item.asset.toLowerCase() === this.state.arr_token[9].toLowerCase()) {
                        return (
                          <tr key={item.asset}>
                            <td>
                              <img alt='' src={this.state.token[item.symbol]} />
                              <span className='token-name'>{item.name}</span>
                              <span className='token-name-short'>{item.symbol}</span>
                            </td>
                            <td>${this.format_str_to_kmb(item.grossSupplyUSD)}</td>
                            <td>{this.format_str_to_persent(item.supplyAPR)}</td>
                            <td>${this.format_str_to_kmb(item.totalBorrowUSD)}</td>
                            <td>{this.format_str_to_persent(item.borrowAPR)}</td>
                          </tr>
                        )
                      }
                    })
                  }

                  {
                    this.state.data_is_ok &&
                    this.state.data_markets.map(item => {
                      if (item.asset.toLowerCase() === this.state.arr_token[10].toLowerCase()) {
                        return (
                          <tr key={item.asset}>
                            <td>
                              <img alt='' src={this.state.token[item.symbol]} />
                              <span className='token-name'>{item.name}</span>
                              <span className='token-name-short'>{item.symbol}</span>
                            </td>
                            <td>${this.format_str_to_kmb(item.grossSupplyUSD)}</td>
                            <td>{this.format_str_to_persent(item.supplyAPR)}</td>
                            <td>${this.format_str_to_kmb(item.totalBorrowUSD)}</td>
                            <td>{this.format_str_to_persent(item.borrowAPR)}</td>
                          </tr>
                        )
                      }
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>


          <div className='footer'>
            <div className='footer-left'>
              <div className='footer-left-res'>
                <span className='title'>
                  <FormattedMessage id='Resource' />
                </span>
                <span className='content-new'>
                  <a href='https://github.com/Lendfme/markets' target='_blank' rel="noopener noreferrer">GitHub</a>
                </span>
                <span className='content-new'>
                  <a onClick={() => { this.clickFAQ() }}>FAQ</a>
                </span>
              </div>

              <div className='footer-left-pro'>
                <span className='title mb10'>
                  <FormattedMessage id='Products' />
                </span>
                <span className='content-new'>
                  <a href='https://www.lendf.me/' target='_blank' rel="noopener noreferrer">Lendf.me</a>
                </span>
                <span className='content-new'>
                  <a href='https://monitor.lendf.me/' target='_blank' rel="noopener noreferrer">Monitor</a>
                </span>
              </div>
            </div>

            <div className='footer-right'>
              <a href='https://twitter.com/LendfMe' target='_blank' rel="noopener noreferrer">
                <img src={twitter} alt='' />
              </a>
              <a href='https://medium.com/dforcenet' target='_blank' rel="noopener noreferrer">
                <img src={medium} alt='' />
              </a>
              <a href='https://t.me/dforcenet' target='_blank' rel="noopener noreferrer">
                <img src={telegram} alt='' />
              </a>
              <div className='clear'></div>

              <div className='footer-right-fixed'>
                <div className='fixed1'>
                  {
                    this.state.cur_language
                  }
                </div>
                <span className='fixed-img'>
                  <img src={up} alt='' />
                </span>
                <div className='fixed2'>
                  <ul>
                    <li onClick={() => { this.setState({ cur_language: '中文' }) }}>{'中文'}</li>
                    <li onClick={() => { this.setState({ cur_language: 'English' }) }}>{'English'}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='clear'></div>
          </div>

        </div>
      </IntlProvider>
    )
  }
}
