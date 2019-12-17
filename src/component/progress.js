import React from 'react';
import { Progress } from 'antd';
import 'antd/dist/antd.css';
import './progress.scss';

import BTC from '../images/BTC.svg';
import USDx from '../images/USDx.svg';
import USDT from '../images/USDT.svg';
import WETH from '../images/WETH.svg';


export default class MyProgress extends React.Component {
    render() {
        return (
            <div className='persent-wrap'>
                <div className='persent-top'>
                    <img src={BTC} alt='' />
                    <span className='token'>ETH</span>
                    <span className='persent-num'>40.9%</span>
                </div>
                <div className='persent-bottom'>
                    <Progress percent={50} status="active" showInfo={false} />
                </div>
            </div>
        )
    }
}

