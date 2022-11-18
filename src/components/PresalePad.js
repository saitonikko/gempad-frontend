import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gold from "../assets/img/tiers/gold.svg";
import platinum from "../assets/img/tiers/platinum.svg";
import diamond from "../assets/img/tiers/diamond.svg";
import bsc from "../assets/img/chains/bsc.png";
import bell from "../assets/img/icons/bell.svg";
import heart from "../assets/img/icons/heart-outlined.svg";
import moment from 'moment';
import { convertTime } from '../utils/calculate';

function PresalePad({ data, index }) {
    const [status, setStatus] = useState(null);
    const [progress, setProgress] = useState(0);
    const [timingText, setTimingText] = useState("");
    const [timer, setTimer] = useState("");

    useEffect(() => {
        if (!data) return;
        console.log(data);
        const getStatus = () => {
            let _status = 0;
            const now = moment().format("X");
            if (now > data.startTime) _status = 1;
            if (now > data.endTime) _status = 2;
            if (data.isCanceled) _status = 3;
            if (data.isListed) _status = 4;
            setStatus(_status);
            setProgress(data.soldAmount / data.hardcap);
        }
        getStatus();
        const interval = setInterval(() => {
            getStatus();
        }, 10000);
        return () => clearInterval(interval);
    }, [data])

    useEffect(() => {
        if (status === null) return;
        const interval = setInterval(() => {
            console.log("first")
            const now = moment().format("X");
            switch (status) {
                case 0: {
                    setTimingText("Sale Starts In:");
                    setTimer(convertTime(data.startTime - now));
                    break;
                }
                case 1: {
                    setTimingText("Sale Ends In:");
                    setTimer(convertTime(data.endTime - now));
                    break;
                }
                case 2: {
                    setTimingText("Listing Time:");
                    setTimer(moment(data.estimatedListingTime * 1000).format("YYYY-MM-DD"));
                    break;
                }
                case 3: {
                    setTimingText("Sale Canceled");
                    setTimer("");
                    break;
                }
                case 4: {
                    setTimingText("Listing Time:");
                    setTimer(moment(data.estimatedListingTime * 1000).format("YYYY-MM-DD"));
                    break;
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [status])

    return (
        <Link className="presale-pad" key={index} to={`/presale/${data.saleAddress}`}>
            {/* <div className="tier">
                <img src={gold} />
            </div> */}
            <div className="section-1">
                <div className="avatar">
                    <img src={data.logoImg} />
                </div>
                <div className="status">
                    {/* <div className="kyc">
                        KYC
                    </div>
                    <div className="audit">
                        Audit
                    </div>
                    <div className="vetted">
                        VETTED
                    </div> */}
                    {
                        status === 0 &&
                        <div className="upcoming">
                            Upcoming
                        </div>
                    }
                    {
                        status === 1 &&
                        <div className="live">
                            Sale Live
                        </div>
                    }
                    {
                        status === 2 &&
                        <div className="finished">
                            Sale Finished
                        </div>
                    }
                    {
                        status === 3 &&
                        <div className="canceled">
                            Canceled
                        </div>
                    }
                    {
                        status === 4 &&
                        <div className="listed">
                            Listed on DEX
                        </div>
                    }
                </div>
            </div>
            <div className="section-2">
                <div className="left">
                    <div className="title">{data.saleTitle}</div>
                    <div className="type">Max Contribution : {(data.maxBuy / 1e18).toFixed(0)} BNB</div>
                </div>
                <div className="right">
                    <img src={bsc} />
                </div>
            </div>
            <div className="progress">
                <div className="progress-value">
                    Progress({progress}%)
                </div>
                <div className="progress-bar">
                    <div className="active" style={{width: `${progress}%`}}></div>
                </div>
                <div className="cap">
                    <span>{data.soldAmount / 1e18} BNB</span>
                    <span>{data.hardcap / 1e18} BNB</span>
                </div>
            </div>
            <div className="cap">
                <span className="key">Hard Cap:</span>
                <span className="value">{(data.hardcap / 1e18).toFixed(1)} BNB</span>
            </div>
            <div className="liquidity">
                <span className="key">Liquidity:</span>
                <span className="value">{data.liquidityPercent} %</span>
            </div>
            <div className="lock-time">
                <span className="key">Lock Time:</span>
                <span className="value">{data.lockupTime / 86400} days</span>
            </div>
            <div className="hr" />
            <div className="bottom">
                <div className="time">
                    <span>{timingText}</span><br />
                    <span>{timer}</span>
                </div>
                <div className="right">
                    {/* <div className="default-btn">Whitelist</div> */}
                    <img className="btn" src={bell} />
                    <img className="btn" src={heart} />
                </div>
            </div>
        </Link>
    )
}

export default PresalePad;