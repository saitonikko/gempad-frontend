import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { GET_PRESALE_BY_ADDRESS } from '../../graphql/presale/queries';
import moment from 'moment';

function PresaleDetails() {
    const { saleAddress } = useParams();
    const { data, loading, error } = useQuery(GET_PRESALE_BY_ADDRESS, {
        variables: {
            presaleAddress: saleAddress
        }
    })
    const [details, setDetails] = useState();
    const [status, setStatus] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!data) return;
        const getData = () => {
            setDetails(data.getPresaleByAddress[0]);
        }
        getData();
    }, [data])

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

    return (
        <div id="presales">
            <div className="space" />
            <div className="presale-details">
                <div className="left">
                    <div className="basic-info">
                        <div className="banner-img">
                            <img src={details?.bannerImg} />
                        </div>
                        <div className="profile">
                            <div className="profile-left">
                                <img className="logo-img" src={details?.logoImg} />
                                <span className="title">
                                    {details?.saleTitle}
                                </span>
                                <img src=""></img>
                                <img src=""></img>
                                <img src=""></img>
                                <img src=""></img>
                                <img src=""></img>
                                <img src=""></img>
                            </div>
                            <div className="profile-right">
                                {/* <span className="badge bg-green">KYC</span>
                                <span className="badge bg-blue">Audit</span> */}
                                {
                                    status === 0 &&
                                    <span className="badge bg-yellow">
                                        Upcoming
                                    </span>
                                }
                                {
                                    status === 1 &&
                                    <span className="badge bg-cyan">
                                        Sale Live
                                    </span>
                                }
                                {
                                    status === 2 &&
                                    <span className="badge bg-green">
                                        Sale Finished
                                    </span>
                                }
                                {
                                    status === 3 &&
                                    <span className="badge bg-grey">
                                        Canceled
                                    </span>
                                }
                                {
                                    status === 4 &&
                                    <span className="badge bg-cyan">
                                        Listed on DEX
                                    </span>
                                }
                            </div>
                        </div>
                        <div className="description" dangerouslySetInnerHTML={{ __html: details?.description}}></div>
                        <div className="video">
                            <iframe src={details?.youtube} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div className="info-list">
                            <div className="feature-line">
                                <span className="key">Presale Address</span>
                                <span className="value">{details?.saleAddress}</span>
                            </div>
                            <div className="hl" />
                            <div className="feature-line">
                                <span className="key">Token Name</span>
                                <span className="value">{details?.tokenName}</span>
                            </div>
                            <div className="hl" />
                            <div className="feature-line">
                                <span className="key">Token Symbol</span>
                                <span className="value">{details?.tokenSymbol}</span>
                            </div>
                            <div className="hl" />
                            <div className="feature-line">
                                <span className="key">Token Decimals</span>
                                <span className="value">{details?.tokenDecimals}</span>
                            </div>
                            <div className="hl" />
                            <div className="feature-line">
                                <span className="key">Total Supply</span>
                                <span className="value">{details?.totalSupply / Math.pow(10, details?.tokenDecimals)}</span>
                            </div>
                            <div className="hl" />
                            <div className="feature-line">
                                <span className="key">Tokens For Presale</span>
                                <span className="value">{(details?.totalSupply / Math.pow(10, details?.tokenDecimals)).toFixed(0)}</span>
                            </div>
                            <div className="hl" />
                            <div className="feature-line">
                                <span className="key">Tokens For Liquidity</span>
                                <span className="value">18,900,000</span>
                            </div>
                            <div className="hl" />
                            <div className="feature-line">
                                <span className="key">Soft Cap</span>
                                <span className="value">{details?.softcap / 1e18} BNB</span>
                            </div>
                            <div className="hl" />
                            <div className="feature-line">
                                <span className="key">Hard Cap</span>
                                <span className="value">{details?.hardcap / 1e18} BNB</span>
                            </div>
                            <div className="hl" />
                            <div className="feature-line">
                                <span className="key">Presale Start Time (UTC)</span>
                                <span className="value">{moment(details?.startTime * 1000).format("YYYY-MM-DD HH:mm:ss")}</span>
                            </div>
                            <div className="hl" />
                            <div className="feature-line">
                                <span className="key">Presale End Time (UTC)</span>
                                <span className="value">{moment(details?.endTime * 1000).format("YYYY-MM-DD HH:mm:ss")}</span>
                            </div>
                            <div className="hl" />
                            <div className="feature-line">
                                <span className="key">Unused Tokens</span>
                                <span className="value">{details?.refundType}</span>
                            </div>
                            <div className="hl" />
                            <div className="feature-line">
                                <span className="key">Liquidity Percent</span>
                                <span className="value">{details?.liquidityPercent} %</span>
                            </div>
                            <div className="hl" />
                            <div className="feature-line">
                                <span className="key">Liquidity Unlock Time (UTC)</span>
                                <span className="value">{moment((details?.startTime + details?.lockupTime) * 1000).format("YYYY-MM-DD HH:mm:ss")}</span>
                            </div>
                        </div>
                    </div>
                    <div className="team-vesting">
                        <div className="title">
                            Team Token Vesting Schedule:
                        </div>
                        <div className="feature-line">
                            <span className="key">2022-12-18 20:00 (UTC)</span>
                            <span className="value">2,250,000 ZAH</span>
                        </div>
                        <div className="hl" />
                    </div>
                </div>
                <div className="right">
                    <div className="switch-network">
                        <button className="switch-btn">
                            Switch Network To <span className="font-cyan" style={{ fontWeight: 700 }}>BSC Testnet</span>
                        </button>
                    </div>
                    <div className="buy-section">
                        <div className="progress">

                        </div>
                        <div className="contribute">

                        </div>
                        <div className="feature-line">
                            <span className="key">Sale Title</span>
                            <span className="value"></span>
                        </div>
                        <div className="feature-line">
                            <span className="key">Sale Title</span>
                            <span className="value"></span>
                        </div>
                        <div className="feature-line">
                            <span className="key">Sale Title</span>
                            <span className="value"></span>
                        </div>
                        <div className="feature-line">
                            <span className="key">Sale Title</span>
                            <span className="value"></span>
                        </div>
                        <div className="feature-line">
                            <span className="key">Sale Title</span>
                            <span className="value"></span>
                        </div>
                        <div className="feature-line">
                            <span className="key">Sale Title</span>
                            <span className="value"></span>
                        </div>
                        <div className="feature-line">
                            <span className="key">Sale Title</span>
                            <span className="value"></span>
                        </div>
                    </div>
                    <div className="listing-section">
                        <div className="listing-time">

                        </div>
                        <div className="feature-line">
                            <span className="key">Sale Title</span>
                            <span className="value"></span>
                        </div>
                    </div>
                    <div className="tokenomics-section">
                        <div className="title">
                            Tokenomics - Supply Distribution
                        </div>
                        <div className="chart">
                            <div className="market-cap">
                                Estimated Market Cap: 0 $
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PresaleDetails