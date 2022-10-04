import React, { useEffect, useState } from 'react';
import { notify } from "../../utils/notifyFunctions";
import { MultilineInput, OutlinedInput2, Switcher } from '../../components/CustomizeMui';

export default function Airdrop({ setPage }) {
  const [tab, setTab] = useState(0);

  useEffect(() => {
    setPage(50);
  }, [])

  return (
    <div className="airdrop">
      <div className="tab-switcher">
        <div className={tab === 0 ? "tab-active btn" : "tab btn"} onClick={() => setTab(0)} >
          <span>Tokens</span>
        </div>
        <div className={tab === 1 ? "tab-active btn" : "tab btn"} onClick={() => setTab(1)} >
          <span>TBNB</span>
        </div>
      </div>
      {
        tab === 0 &&
        <div className="content">
          <OutlinedInput2 label="Token Address" />
        </div>
      }
      {
        tab === 1 &&
        <div className="content">
          <div className="balance">You have 1.248 tBNB</div>
          <Switcher label="Some Amounts for each address" />
          <OutlinedInput2 label="Token Amount for Airdrop" value={0} />
          <MultilineInput label="Address List" />
          <div className="btn-container">
            <div className="default-btn">OK</div>
          </div>
        </div>
      }
    </div>
  )
}