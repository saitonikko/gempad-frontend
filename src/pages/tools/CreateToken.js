import React, { useEffect, useState } from 'react';
import { notify } from "../../utils/notifyFunctions";
import { OutlinedInput1, OutlinedSelect, Switcher } from '../../components/CustomizeMui';

export default function CreateToken({ setPage }) {

  useEffect(() => {
    setPage(52);
  }, [])

  return (
    <div className="create-token">
      <div className="card">
        <div className="title">Create Token</div>
        <div className="tips">
          <span>
            All created tokens include an Audit.<br />
            Audits can be found <a>here</a>. Created tokens also get Audit badge on GemPad presales automatically.</span>
        </div>
        <OutlinedSelect label="Token Type" options={["BNB", "BUSD", "Custom"]} value="BNB" />
        <div className="input-container">
          <OutlinedInput1 label="Token Name" />
          <OutlinedInput1 label="Token Symbol" />
        </div>
        <div className="input-container">
          <OutlinedInput1 label="Token Decimals" />
          <OutlinedInput1 label="Total Supply" />
        </div>
        <Switcher label="Implement Ant-Bot" />
        <div className="btn-container">
          <div className="default-btn">Create Token</div>
        </div>
      </div>
    </div>
  )
}