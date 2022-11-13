import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import moment, { isMoment } from 'moment';
import { useMutation } from "@apollo/client";
import { OutlinedInput2, DateTimeInput } from '../../components/CustomizeMui';
import { getLpContract, isAddress } from '../../utils/contractFunctions';
import { isNumber } from '../../utils/calculate';
import { getLockContract, getERC20Contract } from '../../utils/contractFunctions';
import { notify } from "../../utils/notifyFunctions";
import { CREATE_LOCK_LIST } from '../../graphql/lock/mutations';
import lockContract from "../../contracts/lock.json";

export default function CreateLock({ setPage }) {

  const { address } = useAccount();
  const [createLockList] = useMutation(CREATE_LOCK_LIST);
  const [tokenAddress, setTokenAddress] = useState("");
  const [isLpToken, setIsLpToken] = useState(false);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState("");
  const [tokenTotalSupply, setTokenTotalSupply] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [tokenBalance, setTokenBalance] = useState("");
  const [amount, setAmount] = useState("");
  const [unlockTime, setUnlockTime] = useState("");
  const [checkFlags, setCheckFlags] = useState([]);
  const [createFlag, setCreateFlag] = useState([]);
  const [pending, setPending] = useState(false);

  const checkIsLpToken = async () => {
    try {
      const contract = await getLockContract();
      const _isLpToken = await contract.methods.isLpToken(tokenAddress).call();
      setIsLpToken(_isLpToken);
    } catch (err) {
      console.log(err)
    }
  }

  const fetchData = async () => {
    if (!isAddress(tokenAddress) || !address) {
      return;
    }

    if (isLpToken) {
      const contract = await getLpContract(tokenAddress);
      if (!contract) return;
      try {
        const name = await contract.methods.name().call();
        const symbol = await contract.methods.symbol().call();
        const decimals = await contract.methods.decimals().call();
        const totalSupply = await contract.methods.totalSupply().call();
        const balance = await contract.methods.balanceOf(address).call();
        const allowance = await contract.methods.allowance(address, lockContract.address).call();
        setTokenName(name);
        setTokenSymbol(symbol);
        setTokenDecimals(decimals);
        setTokenTotalSupply(totalSupply);
        setTokenBalance(balance);
        if (allowance > 0) setIsApproved(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      const contract = await getERC20Contract(tokenAddress);
      if (!contract) return;
      try {
        const name = await contract.methods.name().call();
        const symbol = await contract.methods.symbol().call();
        const decimals = await contract.methods.decimals().call();
        const totalSupply = await contract.methods.totalSupply().call();
        const balance = await contract.methods.balanceOf(address).call();
        const allowance = await contract.methods.allowance(address, lockContract.address).call();
        setTokenName(name);
        setTokenSymbol(symbol);
        setTokenDecimals(decimals);
        setTokenTotalSupply(totalSupply);
        setTokenBalance(balance);
        if (allowance > 0) setIsApproved(true);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const approve = async () => {
    try {
      if (isLpToken) {
        const contract = await getLpContract(tokenAddress);
        await contract.methods.approve(lockContract.address, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: address });
      } else {
        const contract = await getERC20Contract(tokenAddress);
        await contract.methods.approve(lockContract.address, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: address });
      }
      notify(0, "approve success")
    } catch (err) {
      console.log(err);
      notify(2, err.message);
    }
    fetchData();
  }

  const lock = async () => {
    setPending(true);
    try {
      const contract = await getLockContract();
      const lockId = await contract.methods.getTotalLockCount().call();
      await contract.methods.lock(address, tokenAddress, isLpToken, '0x' + (amount * Math.pow(10, tokenDecimals)).toString(16), moment(unlockTime).format('X')).send({ from: address });
      createLockList({
        variables: {
          tokenAddress: tokenAddress, isLpToken: isLpToken, name: tokenName, symbol: tokenSymbol, decimals: tokenDecimals, owner: address, lockId: lockId, amount: amount, lockTime: moment().format("X"), unlockTime: moment(unlockTime).format('X') - 10
        }
      })
      notify(0, "create lock success");
      setTimeout(() => {
        if (isLpToken) {
          window.location.href = "/locks/liquidity_lock";
        } else {
          window.location.href = "/locks/token_lock";
        }
      }, 3000)
    } catch (err) {
      console.log(err);
      notify(2, err.message);
    }
    setPending(false);
  }

  useEffect(() => {
    let temp = [];
    temp[0] = tokenAddress.length ? 1 : !isAddress(tokenAddress) ? 3 : 0;
    temp[1] = amount.length === 0 ? 1 : !isNumber(amount) ? 2 : Number(amount) <= 0 || Number(amount) > Number(tokenBalance) ? 4 : 0;
    temp[2] = !isMoment(unlockTime) ? 1 : unlockTime.isBefore(moment()) ? 2 : 0;

    setCheckFlags(temp);
    setCreateFlag(!temp[0] * !temp[1] * temp[2]);
  }, [tokenAddress, amount, unlockTime])

  useEffect(() => {
    fetchData();
  }, [tokenAddress, isLpToken])

  useEffect(() => {
    checkIsLpToken();
  }, [tokenAddress])

  useEffect(() => {
    setPage(40);
  }, [])

  return (
    <div class="create-lock">
      <div className="card">
        <div className="title">Create Your Locks for Free</div>
        <OutlinedInput2 label="Token or LP Token Address" value={tokenAddress} setValue={setTokenAddress} />
        {
          tokenName &&
          <>
            <div className="feature-line">
              <span className="key">Name</span>
              <span className="value">{tokenName}</span>
            </div>
            <div className="feature-line">
              <span className="key">Symbol</span>
              <span className="value">{tokenSymbol}</span>
            </div>
            <div className="feature-line">
              <span className="key">Total Supply</span>
              <span className="value">{tokenTotalSupply / Math.pow(10, tokenDecimals)}</span>
            </div>
            <div className="feature-line">
              <span className="key">Decimals</span>
              <span className="value">{tokenDecimals}</span>
            </div>
            <div className="feature-line">
              <span className="key">Balance</span>
              <span className="value">{tokenBalance / Math.pow(10, tokenDecimals)}</span>
            </div>
          </>
        }
        <OutlinedInput2 label="Amount" value={amount} setValue={setAmount} />
        <DateTimeInput label="Lock Until" value={unlockTime} setValue={setUnlockTime} />
        <div className="btn-container">
          {
            isApproved
              ? <button className="default-btn" disabled={createFlag || pending} onClick={lock} >Lock</button>
              : <button className="default-btn" disabled={createFlag || pending} onClick={approve} >Approve</button>
          }
        </div>
      </div>
    </div>
  )
}