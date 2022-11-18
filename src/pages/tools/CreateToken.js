import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { getTokenFactoryContract } from '../../utils/contractFunctions';
import { notify } from "../../utils/notifyFunctions";
import { OutlinedInput1, OutlinedSelect, Switcher } from '../../components/CustomizeMui';
import antiBot from "../../contracts/anti_bot.json";
import addresses from "../../contracts/address.json";

export default function CreateToken({ setPage }) {

  const { address } = useAccount();
  const [tokenType, setTokenType] = useState("Simple Token");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [isAntiBot, setIsAntiBot] = useState(false);
  const [maxWallet, setMaxWallet] = useState("");
  const [maxTxAmount, setMaxTxAmount] = useState("");
  const [router, setRouter] = useState("Pancakeswap");
  const [baseToken, setBaseToken] = useState("");
  const [marketingWallet, setMarketingWallet] = useState("");
  const [isMarketingFeeBaseToken, setIsMarketingFeeBaseToken] = useState(false);
  const [sellLiquidityFee, setSellLiquidityFee] = useState("");
  const [sellMarketingFee, setSellMarketingFee] = useState("");
  const [buyLiquidityFee, setBuyLiquidityFee] = useState("");
  const [buyMarketingFee, setBuyMarketingFee] = useState("");
  const [sellRewardFee, setSellRewardFee] = useState("");
  const [buyRewardFee, setBuyRewardFee] = useState("");
  const [tokenForMarketingFee, setTokenForMarketniFee] = useState("Token itself");
  const [reflectionToken, setReflectionToken] = useState("");
  const [minimumTokenBalanceForDividends, setMinimumTokenBalanceForDividends] = useState("");
  const [pending, setPending] = useState(false);

  const createToken = () => {
    if (!address) {
      console.log(address);
      notify(1, "Wallet not connected");
      return;
    }
    switch (tokenType) {
      case "Simple Token": createSimpleToken(); break;
      case "Standard Token": createStandardToken(); break;
      case "Reflection Token": createReflectionToken(); break;
      case "Dividend Token": createDividendToken(); break;
    }
  }

  const createSimpleToken = async () => {
    if (!name || !symbol || !decimals || !totalSupply) {
      notify(1, "Please fill up all fields");
      return;
    }
    setPending(true);
    try {
      const contract = await getTokenFactoryContract();
      if (!isAntiBot) {
        const tx = await contract.methods.createSimpleToken(name, symbol, decimals, '0x' + (totalSupply * 10**(decimals)).toString(16)).send({ from: address, value: '0x' + (0.1 * 1e18).toString(16) });
        console.log(tx.events[0].address);
        notify(0, `create token success - ${tx.events[0].address}`);
      } else {
        const tx = await contract.methods.createSimpleTokenWithAntiBot(name, symbol, decimals, '0x' + (totalSupply * 10**(decimals)).toString(16), antiBot.address).send({ from: address, value: '0x' + (0.1 * 1e18).toString(16) });
        console.log(tx.events[0].address);
        notify(0, `create token success - ${tx.events[0].address}`);
      }
    } catch (err) {
      console.log(err);
      notify(2, "create token failed");
    }
    setPending(false);
  }

  const createStandardToken = async () => {
    if (!name || !symbol || !decimals || !totalSupply || !maxWallet || !maxTxAmount || !baseToken || !marketingWallet || !sellLiquidityFee || !buyLiquidityFee || !sellMarketingFee || !buyMarketingFee) {
      notify(1, "Please fill up all fields");
      return;
    }
    setPending(true);
    try {
      const contract = await getTokenFactoryContract();
      const accounts = [marketingWallet, addresses.pancakeRouter, baseToken];
      const fees = [sellLiquidityFee*10, buyLiquidityFee*10, sellMarketingFee*10, buyMarketingFee*10];
      if (!isAntiBot) {
        const tx = await contract.methods.createStandardToken(name, symbol, decimals, '0x' + (totalSupply * 10**(decimals)).toString(16), '0x' + (maxWallet * 10**(decimals)).toString(16), '0x' + (maxTxAmount * 10**(decimals)).toString(16), accounts, isMarketingFeeBaseToken, fees).send({ from: address, value: '0x' + (0.1 * 1e18).toString(16) });
        console.log(tx.events[0].address);
        notify(0, `create token success - ${tx.events[0].address}`);
      } else {
        const tx = await contract.methods.createStandardTokenWithAntiBot(name, symbol, decimals, '0x' + (totalSupply * 10**(decimals)).toString(16), '0x' + (maxWallet * 10**(decimals)).toString(16), '0x' + (maxTxAmount * 10**(decimals)).toString(16), accounts, isMarketingFeeBaseToken, fees, antiBot.address).send({ from: address, value: '0x' + (0.1 * 1e18).toString(16) });
        console.log(tx.events[0].address);
        notify(0, `create token success - ${tx.events[0].address}`);
      }
    } catch (err) {
      console.log(err);
      notify(2, "create token failed");
    }
    setPending(false);
  }

  const createReflectionToken = async () => {
    if (!name || !symbol || !decimals || !totalSupply || !maxWallet || !maxTxAmount || !baseToken || !marketingWallet || !sellLiquidityFee || !buyLiquidityFee || !sellMarketingFee || !buyMarketingFee || !sellRewardFee || !buyRewardFee) {
      notify(1, "Please fill up all fields");
      return;
    }
    setPending(true);
    try {
      const contract = await getTokenFactoryContract();
      const accounts = [marketingWallet, addresses.pancakeRouter, baseToken];
      const fees = [sellLiquidityFee*10, buyLiquidityFee*10, sellMarketingFee*10, buyMarketingFee*10, sellRewardFee*10, buyRewardFee*10];
      if (!isAntiBot) {
        const tx = await contract.methods.createReflectionToken(name, symbol, decimals, '0x' + (totalSupply * 10**(decimals)).toString(16), '0x' + (maxWallet * 10**(decimals)).toString(16), '0x' + (maxTxAmount * 10**(decimals)).toString(16), accounts, isMarketingFeeBaseToken, fees).send({ from: address, value: '0x' + (0.1 * 1e18).toString(16) });
        console.log(tx.events[0].address);
        notify(0, `create token success - ${tx.events[0].address}`);
      } else {
        const tx = await contract.methods.createReflectionTokenWithAntiBot(name, symbol, decimals, '0x' + (totalSupply * 10**(decimals)).toString(16), '0x' + (maxWallet * 10**(decimals)).toString(16), '0x' + (maxTxAmount * 10**(decimals)).toString(16), accounts, isMarketingFeeBaseToken, fees, antiBot.address).send({ from: address, value: '0x' + (0.1 * 1e18).toString(16) });
        console.log(tx.events[0].address);
        notify(0, `create token success - ${tx.events[0].address}`);
      }
    } catch (err) {
      console.log(err);
      notify(2, "create token failed");
    }
    setPending(false);
  }

  const createDividendToken = async () => {
    if (!name || !symbol || !decimals || !totalSupply || !maxWallet || !maxTxAmount || !baseToken || !marketingWallet || !reflectionToken || !minimumTokenBalanceForDividends || !sellLiquidityFee || !buyLiquidityFee || !sellMarketingFee || !buyMarketingFee || !sellRewardFee || !buyRewardFee) {
      notify(1, "Please fill up all fields");
      return;
    }
    setPending(true);
    try {
      const contract = await getTokenFactoryContract();
      const accounts = [reflectionToken, addresses.pancakeRouter, marketingWallet, addresses.dividendTracker, baseToken];
      const fees = [sellLiquidityFee*10, buyLiquidityFee*10, sellMarketingFee*10, buyMarketingFee*10, sellRewardFee*10, buyRewardFee*10];
      const marketingFeeToken = tokenForMarketingFee === "Token itself"? 0: tokenForMarketingFee === "Base Token"? 1: 2;
      if (!isAntiBot) {
        const tx = await contract.methods.createReflectionToken(name, symbol, decimals, '0x' + (totalSupply * 10**(decimals)).toString(16), '0x' + (maxWallet * 10**(decimals)).toString(16), '0x' + (maxTxAmount * 10**(decimals)).toString(16), accounts, fees, '0x' + (minimumTokenBalanceForDividends * 10**(decimals)).toString(16), marketingFeeToken).send({ from: address, value: '0x' + (0.1 * 1e18).toString(16) });
        console.log(tx.events[0].address);
        notify(0, `create token success - ${tx.events[0].address}`);
      } else {
        const tx = await contract.methods.createReflectionTokenWithAntiBot(name, symbol, decimals, '0x' + (totalSupply * 10**(decimals)).toString(16), '0x' + (maxWallet * 10**(decimals)).toString(16), '0x' + (maxTxAmount * 10**(decimals)).toString(16), accounts, fees, '0x' + (minimumTokenBalanceForDividends * 10**(decimals)).toString(16), marketingFeeToken, antiBot.address).send({ from: address, value: '0x' + (0.1 * 1e18).toString(16) });
        console.log(tx.events[0].address);
        notify(0, `create token success - ${tx.events[0].address}`);
      }
    } catch (err) {
      console.log(err);
      notify(2, "create token failed");
    }
    setPending(false);
  }

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
        <OutlinedSelect label="Token Type" options={["Simple Token", "Standard Token", "Reflection Token", "Dividend Token"]} value={tokenType} setValue={setTokenType} />
        <div className="tips">
          <span>
            Fee: {
              tokenType === "Simple Token"
                ? "0.1 BNB"
                : "0.1 BNB"
            }
          </span>
        </div>
        <div className="input-container">
          <OutlinedInput1 label="Token Name" value={name} setValue={setName} />
          <OutlinedInput1 label="Token Symbol" value={symbol} setValue={setSymbol} />
        </div>
        <div className="input-container">
          <OutlinedInput1 label="Token Decimals" value={decimals} setValue={setDecimals} />
          <OutlinedInput1 label="Total Supply" value={totalSupply} setValue={setTotalSupply} />
        </div>
        {
          (tokenType === "Standard Token" || tokenType === "Reflection Token" || tokenType === "Dividend Token") &&
          <>
            <div className="input-container">
              <OutlinedInput1 label="Max Wallet" value={maxWallet} setValue={setMaxWallet} />
              <OutlinedInput1 label="Max Transaction Amount" value={maxTxAmount} setValue={setMaxTxAmount} />
            </div>
            <div className="input-container">
              <OutlinedSelect label="Router" options={["Pancakeswap"]} value={router} setValue={setRouter} />
              <OutlinedInput1 label="Base Token" value={baseToken} setValue={setBaseToken} />
            </div>
            <div className="input-container">
              <OutlinedInput1 label="Marketing Wallet" value={marketingWallet} setValue={setMarketingWallet} />
              <Switcher label="Marketing fee in tBNB instead of token" value={isMarketingFeeBaseToken} setValue={setIsMarketingFeeBaseToken} />
            </div>
            {
              tokenType === "Dividend Token" &&
              <>
                <OutlinedSelect label="Which token will be token for Marketing Fee?" options={["Token itself", "Base Token", "Reflection Token"]} value={tokenForMarketingFee} setValue={setTokenForMarketniFee} />
                <div className="input-container">
                  <OutlinedInput1 label="Reflection Token" value={reflectionToken} setValue={setReflectionToken} />
                  <OutlinedInput1 label="Minimum token balance for dividends" value={minimumTokenBalanceForDividends} setValue={setMinimumTokenBalanceForDividends} />
                </div>
              </>
            }
            <div className="tips">
              <span>
                Max fee together can't be more than 20%. (Fee decimals is 1.)
              </span>
            </div>
            <div className="input-container">
              <OutlinedInput1 label="Sell Liquidity Fee(%)" value={sellLiquidityFee} setValue={setSellLiquidityFee} />
              <OutlinedInput1 label="Sell Marketing Fee(%)" value={sellMarketingFee} setValue={setSellMarketingFee} />
            </div>
            <div className="input-container">
              <OutlinedInput1 label="Buy Liquidity Fee(%)" value={buyLiquidityFee} setValue={setBuyLiquidityFee} />
              <OutlinedInput1 label="Buy Marketing Fee(%)" value={buyMarketingFee} setValue={setBuyMarketingFee} />
            </div>
          </>
        }
        {
          (tokenType === "Reflection Token" || tokenType === "Dividend Token") &&
          <>
            <div className="input-container">
              <OutlinedInput1 label="Sell Reward Fee(%)" value={sellRewardFee} setValue={setSellRewardFee} />
              <OutlinedInput1 label="Buy Reward Fee(%)" value={buyRewardFee} setValue={setBuyRewardFee} />
            </div>
          </>
        }
        <Switcher label="Implement Ant-Bot" value={isAntiBot} setValue={setIsAntiBot} />
        <div className="btn-container">
          <button className="default-btn" disabled={!address || pending} onClick={createToken}>
            Create Token
          </button>
        </div>
      </div>
    </div>
  )
}