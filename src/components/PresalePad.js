import React from 'react';
import gold from "../assets/img/tiers/gold.svg";
import platinum from "../assets/img/tiers/platinum.svg";
import diamond from "../assets/img/tiers/diamond.svg";
import bsc from "../assets/img/chains/bsc.png";
import bell from "../assets/img/icons/bell.svg";
import heart from "../assets/img/icons/heart-outlined.svg";

function PresalePad() {
    return (
        <div className="presale-pad">
            <div className="tier">
                <img src={gold} />
            </div>
            <div className="section-1">
                <div className="avatar">
                    <img src="https://www.greenlifeenergygle.com/wp-content/uploads/2022/05/gleicon.png" />
                </div>
                <div className="status">
                    <div className="kyc">
                        KYC
                    </div>
                    <div className="audit">
                        Audit
                    </div>
                    <div className="vetted">
                        VETTED
                    </div>
                    <div className="listed">
                        Listed on DEX
                    </div>
                </div>
            </div>
            <div className="section-2">
                <div className="left">
                    <div className="title">Federal Reserve 3.0</div>
                    <div className="type">Hyper Launch - Max Spots : 125</div>
                </div>
                <div className="right">
                    <img src={bsc} />
                </div>
            </div>
            <div className="progress"></div>
            <div className="cap">
                <span className="key">Soft Cap:</span>
                <span className="value">50.0 BNB</span>
            </div>
            <div className="liquidity">
                <span className="key">Liquidity:</span>
                <span className="value">100 %</span>
            </div>
            <div className="lock-time">
                <span className="key">Lock Time:</span>
                <span className="value">365 days</span>
            </div>
            <div className="hr" />
            <div className="bottom">
                <div className="time">
                    <span>Listing Time:</span><br />
                    <span>2022-09-30</span>
                </div>
                <div className="right">
                    <div className="default-btn">Whitelist</div>
                    <img className="btn" src={bell} />
                    <img className="btn" src={heart} />
                </div>
            </div>
        </div>
    )
}

export default PresalePad;