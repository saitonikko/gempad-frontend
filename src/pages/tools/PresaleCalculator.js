import React, { useEffect, useState } from 'react';
import { notify } from "../../utils/notifyFunctions";
import { OutlinedInput1, OutlinedSelect } from '../../components/CustomizeMui';

export default function PresaleCalculator({ setPage }) {

  useEffect(() => {
    setPage(51);
  }, [])

  return (
    <div className="presale-calculator">
      <div className="card">
        <div className="title">Presale Calculator</div>
        <OutlinedSelect label="Fund Raising Token" options={["BNB", "BUSD", "Custom"]} value="BNB" />
        <div className="input-container">
          <OutlinedInput1 label="Hard Cap" />
          <OutlinedInput1 label="Total Raised Expectation" />
        </div>
        <div className="input-container">
          <OutlinedInput1 label="Total Supply" />
          <OutlinedInput1 label="Pool Vesting Amount" />
        </div>
        <div className="input-container">
          <OutlinedInput1 label="Presale Rate" />
          <OutlinedInput1 label="Dex Listing Rate" />
        </div>
        <div className="input-container">
          <OutlinedInput1 label="Liquidity Percentage on Dex" />
        </div>
        <hr />
        <div className="input-container">
          <OutlinedInput1 label="Tokens needed for your presale" />
          <OutlinedInput1 label="% of total supply you will use" />
        </div>
        <div className="input-container">
          <OutlinedInput1 label="Tokens for Presale" />
          <OutlinedInput1 label="Raise Token for Liquidity" />
        </div>
        <div className="input-container">
          <OutlinedInput1 label="Tokens for Liquidity:" />
          <OutlinedInput1 label="Total Raise Token you'll get to your wallet:" />
        </div>
        <div className="input-container">
          <OutlinedInput1 label="Estimated Market Cap" />
        </div>
      </div>
    </div>
  )
}