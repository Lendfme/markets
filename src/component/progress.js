import React from 'react';
import { Progress } from 'antd';
import 'antd/dist/antd.css';
import './progress.scss';

import BTC from '../images/BTC.svg';
import imBTC from '../images/imBTC.svg';
import HUBTC from '../images/HBTC.svg';
import HBTC from '../images/HBTC.svg';
import USDx from '../images/USDx.svg';
import UUDD from '../images/UUDD.svg';
import USDT from '../images/USDT.svg';
import WETH from '../images/WETH.svg';
import telegram from '../images/telegram.svg';
import twitter from '../images/twitter.svg';


export default class MyProgress extends React.Component {
    constructor(porps) {
        super(porps);

        this.state = {
            token: {
                WETH: WETH,
                UUDD: UUDD,
                imBTC: imBTC,
                USDT: USDT,
                USDx: USDx,
                HBTC: HBTC,
                HUBTC: HUBTC
            }
        }
    }


    render() {
        return (
            <div className='persent-wrap'>
                <div className='persent-top'>
                    <img src={this.state.token[this.props.symbol]} alt='' />
                    <span className='token'>{this.props.symbol}</span>
                    <span className='persent-num'>
                        {
                            this.props.type === 'supply' ?
                                this.props.persentage_supply : this.props.persentage_borrow
                        }
                        %</span>
                </div>
                <div className='persent-bottom'>
                    <Progress
                        percent={this.props.type === 'supply' ? this.props.persentage_supply : this.props.persentage_borrow}
                        status="active"
                        showInfo={false}
                    />
                </div>
            </div>
        )
    }
}

