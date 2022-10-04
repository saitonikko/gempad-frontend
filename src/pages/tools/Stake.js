import React, { useEffect, useState } from 'react';
import { notify } from "../../utils/notifyFunctions";
import { MultilineInput, OutlinedInput2, Switcher } from '../../components/CustomizeMui';

export default function Stake({ setPage }) {
  const [tab, setTab] = useState(0);

  useEffect(() => {
    setPage(54);
  }, [])

  return (
    <div className="stake">
      <div className="card">
        <div className="title">GemPad's Staking Vault</div>
        <div className="hr" />
        <div className="info">
          <div className="item">
            <div>APY</div>
            <div>383.945 %</div>
          </div>
          <div className="item">
            <div>Total Staked</div>
            <div>28,386,999.507 GEMS</div>
          </div>
          <div className="item">
            <div>Total Rewards</div>
            <div>3,384,266.495 GEMS</div>
          </div>
        </div>
        <div className="hr" />
        <div className="tab-switcher">
          <div className={tab === 0 ? "tab-active btn" : "tab btn"} onClick={() => setTab(0)} >
            <span>Stake</span>
          </div>
          <div className={tab === 1 ? "tab-active btn" : "tab btn"} onClick={() => setTab(1)} >
            <span>Unstake</span>
          </div>
        </div>
        <div className="input">
          <div className="text">
            First time staking Gems?<br />
            Please approve staking contract to use your Gems for staking.
          </div>
          <OutlinedInput2 label="GEMS Amount" />
        </div>
        <div className="btn-container">
          {
            tab === 0
              ? <div className="default-btn">Stake</div>
              : <div className="default-btn">Unstake</div>
          }
        </div>
        <div className="rebase">
          <div className="rebase-btn">Rebase</div>
          <div className="info-line">
            <div className="key">Unstaked balance :</div>
            <div className="value">0 GEMS</div>
          </div>
          <div className="info-line">
            <div className="key">Staked balance :</div>
            <div className="value">0 sGEMS</div>
          </div>
          <div className="info-line">
            <div className="key">Reward Rate Per Block :</div>
            <div className="value">0.000005 %</div>
          </div>
          <div className="info-line">
            <div className="key">ROI (30 - Days Rate) :</div>
            <div className="value">13.837 %</div>
          </div>
          <div className="info-line">
            <div className="key">Last Block Rewarded :</div>
            <div className="value">23,418,706.0</div>
          </div>
        </div>
      </div>
    </div>
  )
}