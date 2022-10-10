import React from 'react';
import { Link } from 'react-router-dom';
// import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ConnectWallet } from '../components/ConectButton';

import search from "../assets/img/icons/search.svg";

export default function Header({ page }) {
    return (
        <div id="header">
            <div className="left">
                <img className="btn" src={search} />
            </div>
            <div className="right">
                <div className="header-btn">+ Create</div>
                {/* <div className="header-btn">
                    <img src={bsc} />
                    BSC Testnet
                    </div>
                <div className="header-btn">Connect</div> */}
                {/* <ConnectButton accountStatus="address" showBalance={false} /> */}
                <ConnectWallet />
            </div>
        </div>
    )
}
