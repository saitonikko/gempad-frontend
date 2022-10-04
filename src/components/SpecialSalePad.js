import React from 'react';
import gold from "../assets/img/tiers/gold.svg";
import platinum from "../assets/img/tiers/platinum.svg";
import diamond from "../assets/img/tiers/diamond.svg";
import bsc from "../assets/img/chains/bsc.png";
import bell from "../assets/img/icons/bell.svg";
import heart from "../assets/img/icons/heart-outlined.svg";

function SpecialSalePad() {
    return (
        <div className="special-sale-pad">
            <div className="tier">
                <img src={platinum} />
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
                    <div className="upcoming">
                        Upcoming
                    </div>
                </div>
            </div>
            <div className="section-2">
                <div className="left">
                    <div className="title">Vemate</div>
                    <div className="type">Max Contribution : 25.0 BNB</div>
                </div>
                <div className="right">
                    <img src={bsc} />
                </div>
            </div>
            <div className="progress"></div>
            <div className="cap">
                <span className="key">Hard Cap:</span>
                <span className="value">1800.0 BNB</span>
            </div>
            <div className="cap">
                <span className="key">Soft Cap:</span>
                <span className="value">900.0 BNB</span>
            </div>
            <div className="hr" />
            <div className="bottom">
                <div className="time">
                    <span>Sale Starts In:</span><br />
                    <span>00:08:54:22</span>
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

export default SpecialSalePad;