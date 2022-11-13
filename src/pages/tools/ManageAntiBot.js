import React, { useEffect, useState } from 'react';
import { OutlinedInput1 } from '../../components/CustomizeMui';
import { useAccount } from 'wagmi';
import { notify } from "../../utils/notifyFunctions";
import { getERC20Contract } from '../../utils/contractFunctions';


export default function ManageAntiBot({ setPage }) {

  const { address } = useAccount();
  const [tokenAddress, setTokenAddress] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState("");

  useEffect(() => {
    setPage(53);
  }, [])

  return (
    <div className="manage-antibot">
      <div className="card">
        <div className="title">Manage Anti-Bot</div>
        <OutlinedInput1 label={"Token Address"} />
        <div className="feature-line">
          <span className="key">Name</span>
          <span className="value">{name}</span>
        </div>
        <div className="feature-line">
          <span className="key">Symbol</span>
          <span className="value">{symbol}</span>
        </div>
        <div className="feature-line">
          <span className="key">Decimals</span>
          <span className="value">{decimals}</span>
        </div>
        <div className="tips">
          <span>
            This token is not implement GemAntiBot contract.<br />
            Please try with another token.
          </span>
        </div>
      </div>
    </div>
  )
}