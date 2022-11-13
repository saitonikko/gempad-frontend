import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { notify } from "../../utils/notifyFunctions";
import { MultilineInput, OutlinedInput2, Switcher } from '../../components/CustomizeMui';
import { isAddress } from '../../utils/contractFunctions';
import { getBalanceEth, getAirdropContract, getERC20Contract } from '../../utils/contractFunctions';
import airdrop from "../../contracts/airdrop.json";

export default function Airdrop({ setPage }) {

  const { address } = useAccount();
  const [tab, setTab] = useState(0);
  const [tokenAddress, setTokenAddress] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [balance, setBalance] = useState("");
  const [decimals, setDecimals] = useState("");
  const [allowance, setAllowance] = useState("");
  const [ethBalance, setEthBalance] = useState("");
  const [checkFlag, setCheckFlag] = useState(false);
  const [isSameAmount, setIsSameAmount] = useState(true);
  const [amount, setAmount] = useState(0);
  const [addressList, setAddressList] = useState("");

  const fetchData = async () => {
    if(!address) {
      setCheckFlag(false);
      return;
    }
    try {
      const _ethBalance = await getBalanceEth(address);
      setEthBalance(_ethBalance);
    } catch (err) {
      console.log(err);
      setCheckFlag(false);
    }
    if (!isAddress(tokenAddress)) {
      setCheckFlag(false);
      return;
    }
    const contract = await getERC20Contract(tokenAddress);
    if (!contract) return;
    try {
      const _name = await contract.methods.name().call();
      const _symbol = await contract.methods.symbol().call();
      const _balance = await contract.methods.balanceOf(address).call();
      const _decimals = await contract.methods.decimals().call();
      const _allowance = await contract.methods.allowance(address, airdrop.address).call()
      setName(_name);
      setSymbol(_symbol);
      setBalance(_balance);
      setDecimals(_decimals);
      setAllowance(_allowance);
      setCheckFlag(true);
    } catch (err) {
      console.log(err);
      setCheckFlag(false);
    }
  }

  const airdropToken = async () => {
    if (!(amount > 0) || !addressList) {
      notify(1, "");
      return;
    }
    const recipients = addressList.split(/\r?\n/);
    // verify address list
    for (let i = 0; i < recipients.length; i++) {
      if (!isAddress(recipients[i])) return;
    }
    console.log(recipients);
    if(allowance < amount * Math.pow(10, decimals)) {
      const contract = await getERC20Contract(tokenAddress);
      await contract.methods.approve(airdrop.address, '0x' + (amount * Math.pow(10, decimals)).toString(16)).send({from: address});
    }
    try {
      const contract = getAirdropContract();
      await (await contract).methods.airdropToken(tokenAddress, recipients, '0x' + (amount * Math.pow(10, decimals)).toString(16)).send({ from: address});
      notify(0, "airdrop success");
    } catch (err) {
      console.log(err);
      notify(2, "airdrop failed");
    }
  }

  const airdropETH = async () => {
    if (!(amount > 0) || !addressList) {
      notify(1, "");
      return;
    }
    const recipients = addressList.split(/\r?\n/);
    // verify address list
    for (let i = 0; i < recipients.length; i++) {
      if (!isAddress(recipients[i])) return;
    }
    console.log(recipients);
    try {
      const contract = getAirdropContract();
      await (await contract).methods.airdropEth(recipients, '0x' + (amount * Math.pow(10, 18)).toString(16)).send({ from: address, value: '0x' + (amount * Math.pow(10, 18)).toString(16) });
      notify(0, "airdrop success");
    } catch (err) {
      console.log(err);
      notify(2, "airdrop failed");
    }
  }

  useEffect(() => {
    fetchData();
  }, [address, tokenAddress])

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
          <OutlinedInput2 label="Token Address" value={tokenAddress} setValue={setTokenAddress} />
          {
            checkFlag &&
            <>
              <div className="feature-line">
                <span className="key">Name</span>
                <span className="value">{name}</span>
              </div>
              <div className="feature-line">
                <span className="key">Symbol</span>
                <span className="value">{symbol}</span>
              </div>
              <div className="feature-line">
                <span className="key">Balance</span>
                <span className="value">{(balance / Math.pow(10, decimals)).toFixed(2)}</span>
              </div>
              <div className="feature-line">
                <span className="key">Allowance</span>
                <span className="value">{(allowance / Math.pow(10, decimals)).toFixed(2)}</span>
              </div>
              <Switcher label="Some Amounts for each address" value={isSameAmount} setValue={setIsSameAmount} />
              <OutlinedInput2 label="Token Amount for Airdrop" value={amount} setValue={setAmount} />
              <MultilineInput label="Address List" value={addressList} setValue={setAddressList} />
              <div className="btn-container">
                <div className="default-btn" onClick={airdropToken}>OK</div>
              </div>
            </>
          }
        </div>
      }
      {
        tab === 1 &&
        <div className="content">
          <div className="balance">You have {(ethBalance / Math.pow(10, 18)).toFixed(3)} tBNB</div>
          <Switcher label="Some Amounts for each address" value={isSameAmount} setValue={setIsSameAmount} />
          <OutlinedInput2 label="Token Amount for Airdrop" value={amount} setValue={setAmount} />
          <MultilineInput label="Address List" value={addressList} setValue={setAddressList} />
          <div className="btn-container">
            <div className="default-btn" onClick={airdropETH}>OK</div>
          </div>
        </div>
      }
    </div>
  )
}