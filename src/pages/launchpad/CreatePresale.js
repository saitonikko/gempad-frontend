import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi'
import { useMutation } from "@apollo/client";
import { notify } from "../../utils/notifyFunctions";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { DateTimeInput, OutlinedInput1, OutlinedInput2, MultilineInput, OutlinedSelect, Switcher } from '../../components/CustomizeMui';
import { isAddress } from '../../utils/contractFunctions';
import { getPresaleFactoryContract, getERC20Contract } from '../../utils/contractFunctions';
import presaleFactoryData from "../../contracts/presale-factory.json";
import refAddress from "../../contracts/address.json";
import { isNumber } from '../../utils/calculate';
import moment, { isBefore, isAfter, isMoment } from 'moment';
import { CREATE_PRESALE, ADD_WHITELIST } from '../../graphql/presale/mutations';

const steps = [
  {
    title: "Approve Token",
    description: "Enter the token address and approve"
  },
  {
    title: "Presale Information",
    description: "Enter the Presale information, in case of trouble check our ",
    link: {
      name: "Docs",
      url: ""
    }
  },
  {
    title: "Project Information",
    description: "Add project links, description and select tier"
  },
  {
    title: "Submit",
    description: "Submit your presale"
  },
];

export default function CreatePresale({ setPage }) {
  const { address } = useAccount();
  const [createPresale] = useMutation(CREATE_PRESALE);
  const [addWhitelist] = useMutation(ADD_WHITELIST);
  const [activeStep, setActiveStep] = useState(0);

  // =================== Step 1 =====================
  const [approveFlag1, setApproveFlag1] = useState(0);
  const [pending1, setPending1] = useState(false);
  const [checkFlag1, setCheckFlag1] = useState(3);

  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState("");
  const [tokenTotalSupply, setTokenTotalSupply] = useState("");

  // =================== Step 2 =====================
  const [createFlag2, setCreateFlag2] = useState(false);
  const [pending2, setPending2] = useState(false);
  const [checkFlags2, setCheckFlags2] = useState([]);

  const [saleTitle, setSaleTitle] = useState("");
  const [presaleRate, setPresaleRate] = useState("");
  const [presaleType, setPresaleType] = useState("Public");
  const [softcap, setSoftcap] = useState("");
  const [hardcap, setHardcap] = useState("");
  const [minBuy, setMinBuy] = useState("");
  const [maxBuy, setMaxBuy] = useState("");
  const [refundType, setRefundType] = useState("Burn");
  // const [router, setRouter] = useState("Pancakeswap");
  const [liquidity, setLiquidity] = useState("");
  const [listingRate, setListingRate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [estimatedListingTime, setEstimatedListingTime] = useState("");
  const [lockupTime, setLockupTime] = useState("");
  const [isVesting, setIsVesting] = useState(false);
  const [isTeamVesting, setIsTeamVesting] = useState(false);
  const [teamVestingTokens, setTeamVestingTokens] = useState("");
  const [teamFirstPeriod, setTeamFirstPeriod] = useState("");
  const [teamFirstPercent, setTeamFirstPercent] = useState("");
  const [teamCyclePeriod, setTeamCyclePeriod] = useState("");
  const [teamCycleAmount, setTeamCycleAmount] = useState("");
  const [firstRelease, setFirstRelease] = useState("");
  const [vestingCyclePeriod, setVestingCyclePeriod] = useState("");
  const [vestingCycleAmount, setVestingCycleAmount] = useState("");
  const [needAmount, setNeedAmount] = useState("0");

  // =================== Step 3 =====================
  const [createFlag3, setCreateFlag3] = useState(false);
  const [pending3, setPending3] = useState(false);
  const [checkFlags3, setCheckFlags3] = useState([]);

  const [logoImg, setLogoImg] = useState("https://storageapi.fleek.co/21b78ae5-2a0f-442b-bf52-fa2984aebf48-bucket/gempad/logo.png");
  const [bannerImg, setBannerImg] = useState("https://storageapi.fleek.co/21b78ae5-2a0f-442b-bf52-fa2984aebf48-bucket/gempad/banner.png");
  const [website, setWebsite] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const [telegram, setTelegram] = useState("");
  const [reddit, setReddit] = useState("");
  const [discord, setDiscord] = useState("");
  const [youtube, setYoutube] = useState("");
  const [description, setDescription] = useState("");
  const [whitelist, setWhitelist] = useState("");

  // =================== Step 4 =====================

  const [pending4, setPending4] = useState(false);

  // =================== Step 1 =====================

  const fetchData = async () => {
    if (!isAddress(tokenAddress) || !address) {
      setCheckFlag1(3);
      setApproveFlag1(0);
      return;
    }
    const presaleFactory = await getPresaleFactoryContract();
    console.log(presaleFactory);
    const isExisting = await presaleFactory.methods.isExisting(tokenAddress).call();
    if (isExisting) {
      setCheckFlag1(6);
      setApproveFlag1(0);
      return;
    }
    const contract = await getERC20Contract(tokenAddress);
    if (!contract) return;
    try {
      const name = await contract.methods.name().call();
      const symbol = await contract.methods.symbol().call();
      const decimals = await contract.methods.decimals().call();
      console.log(decimals)
      const allowance = await contract.methods.allowance(address, presaleFactoryData.address).call()
      const totalSupply = await contract.methods.totalSupply().call();
      console.log(totalSupply)
      setTokenName(name);
      setTokenSymbol(symbol);
      setTokenDecimals(decimals);
      setTokenTotalSupply(totalSupply);
      console.log(name)
      if (allowance > 0) setApproveFlag1(1);
      else setApproveFlag1(2);
      setCheckFlag1(0);
    } catch (error) {
      console.log(error);
      setCheckFlag1(3);
      setApproveFlag1(0);
    }
  }

  const approveToken = async () => {
    if (!tokenAddress.length || !address) return;
    const contract = await getERC20Contract(tokenAddress, true);
    if (!contract) return;
    try {
      setPending1(true);
      let poolfactoryaddress;
      poolfactoryaddress = presaleFactoryData.address;
      await contract.methods.approve(presaleFactoryData.address, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: address });
      setPending1(false);
      setApproveFlag1(1);
    } catch (error) {
      console.log(error);
      notify(1, "Something went wrong")
      setPending1(false);
      setApproveFlag1(2);
    }
  }

  // =================== Step 2 =====================



  // =================== Step 3 =====================

  // const setImg = async (e) => {
  //   const data = e.target.files[0];
  //   console.log(data);
  //   setImgData(data);
  //   // setImg(URL.createObjectURL(data));
  //   const reader = new window.FileReader();
  //   reader.readAsArrayBuffer(data);
  //   reader.onloadend = () => {
  //     setImgBuffer(Buffer(reader.result));
  //   };
  // };


  const submit = async () => {
    setPending4(true);
    let addrs = [address, tokenAddress, refAddress.pancakeRouter, address];
    const presaleFactory = await getPresaleFactoryContract();
    const rateSetting = ['0x' + (presaleRate * Math.pow(10, tokenDecimals)).toString(16), '0x' + (listingRate * Math.pow(10, tokenDecimals)).toString(16)];
    const contributionSettings = ['0x' + (minBuy * Math.pow(10, 18)).toString(16), '0x' + (maxBuy * Math.pow(10, 18)).toString(16)];
    const capSettings = ['0x' + (softcap * Math.pow(10, 18)).toString(16), '0x' + (hardcap * Math.pow(10, 18)).toString(16)];
    const timeSettings = [Math.ceil(startTime.format("x") / 1000), Math.ceil(endTime.format("x") / 1000), lockupTime * 86400];
    const vestingSettings = !isVesting ? [0, 0, 0] : [firstRelease, vestingCyclePeriod * 86400, vestingCycleAmount];
    const teamVestingSettings = !isTeamVesting ? [0, 0, 0, 0, 0] : ['0x' + (teamVestingTokens * Math.pow(10, tokenDecimals)).toString(16), teamFirstPeriod * 86400, teamFirstPercent, teamCyclePeriod * 86400, teamCycleAmount];
    const urls = logoImg + ' ' + website;
    const _refundType = (refundType === "Refund" ? 0 : 1);
    const _presaleType = (presaleType === "Public" ? 0 : 1);
    console.log(rateSetting, contributionSettings, capSettings, timeSettings, vestingSettings, teamVestingSettings, urls)
    const fee = await presaleFactory.methods.createFee().call();
    console.log(fee);
    try {
      console.log(refAddress.pool, addrs, rateSetting, contributionSettings, capSettings,
        timeSettings, vestingSettings, teamVestingSettings, urls, liquidity, [_refundType, _presaleType], description)
      const pool = await presaleFactory.methods.createPool(refAddress.pool, addrs, rateSetting, contributionSettings, capSettings,
        timeSettings, vestingSettings, teamVestingSettings, urls, liquidity, [_refundType, _presaleType], description).send({ from: address, value: fee });
      const saleAddress = pool.events.CreatePool.returnValues.pool;
      console.log(saleAddress);
      createPresale({
        variables: {
          saleTitle: saleTitle,
          saleAddress: saleAddress,
          owner: address,
          tokenAddress: tokenAddress,
          tokenName: tokenName,
          tokenSymbol: tokenSymbol,
          tokenDecimals: tokenDecimals,
          totalSupply: tokenTotalSupply,
          presaleRate: presaleRate * Math.pow(10, tokenDecimals),
          listingRate: listingRate * Math.pow(10, tokenDecimals),
          liquidityPercent: liquidity,
          lockupTime: lockupTime * 86400,
          softcap: softcap * Math.pow(10, 18),
          hardcap: hardcap * Math.pow(10, 18),
          maxBuy: maxBuy * Math.pow(10, 18),
          minBuy: minBuy * Math.pow(10, 18),
          startTime: Math.ceil(startTime.format("x") / 1000),
          endTime: Math.ceil(endTime.format("x") / 1000),
          estimatedListingTime: Math.ceil(estimatedListingTime.format("x") / 1000),
          refundType: refundType,
          presaleType: presaleType,
          isTeamVesting: isTeamVesting,
          teamVestingTokens: teamVestingTokens * Math.pow(10, tokenDecimals),
          teamFirstPeriod: teamFirstPeriod * 86400,
          teamFirstPercent: teamFirstPercent,
          teamCyclePeriod: teamCyclePeriod * 86400,
          teamCycleAmount: teamCycleAmount,
          isVesting: isVesting,
          firstRelease: firstRelease,
          vestingCyclePeriod: vestingCyclePeriod * 86400,
          vestingCycleAmount: vestingCycleAmount,
          needAmount: needAmount * Math.pow(10, tokenDecimals),
          logoImg: logoImg,
          bannerImg: bannerImg,
          website: website,
          facebook: facebook,
          twitter: twitter,
          github: github,
          telegram: telegram,
          discord: discord,
          reddit: reddit,
          youtube: youtube,
          description: description
        }
      });
      if (presaleType === "Whitelist") {
        const listedAddresses = whitelist.split(/\r?\n/);
        addWhitelist({
          variables: {
            saleAddress: saleAddress,
            listedAddresses: listedAddresses
          }
        })
      }
      setPending4(false);
    }
    catch (error) {
      console.log(error);
      setPending4(false);
    }

  }

  // useEffect(() => {
  //   uploadToIpfs(imgBuffer);
  // }, [imgBuffer]);

  // const uploadToIpfs = async (_imgBuffer) => {
  //   try {
  //     console.log(_imgBuffer);
  //     const uploadedFile = await fleekStorage.upload({
  //       apiKey: "AUziS4MzbUmatlBv6v/xaA==",
  //       apiSecret: "QFKD836p6DcfY4oqFpDcRH3cODUBkP7d9YPjQmxawwo=",
  //       key: imgData.name,
  //       data: _imgBuffer,
  //       bucket: "21b78ae5-2a0f-442b-bf52-fa2984aebf48-bucket/Metaapp/presale",
  //       httpUploadProgressCallback: (e) => {
  //         console.log(e);
  //       }
  //     })
  //     console.log(uploadedFile);
  //     const url = `https://ipfs.fleek.co/ipfs/${uploadedFile.hash}`;
  //     console.log("image url: ", url);
  //     setLogoImage(url);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  useEffect(() => {
    fetchData();
  }, [address, tokenAddress])

  useEffect(() => {
    async function verify() {
      let temp = [];
      temp[0] = presaleRate.length === 0 ? 1 : !isNumber(presaleRate) ? 2 : Number(presaleRate) < 0 || Number(presaleRate) < Number(listingRate) ? 4 : 0;
      temp[1] = softcap.length === 0 ? 1 : !isNumber(softcap) ? 2 : Number(softcap) <= 0 || Number(softcap) < Number(hardcap) / 2 || Number(softcap) > Number(hardcap) ? 4 : 0;
      temp[2] = hardcap.length === 0 ? 1 : !isNumber(hardcap) ? 2 : Number(hardcap) <= 0 || Number(softcap) < Number(hardcap) / 2 || Number(softcap) > Number(hardcap) ? 4 : 0;
      temp[3] = minBuy.length === 0 ? 1 : !isNumber(minBuy) ? 2 : Number(minBuy) <= 0 || Number(minBuy) > Number(maxBuy) < 0 ? 4 : 0;
      temp[4] = maxBuy.length === 0 ? 1 : !isNumber(maxBuy) ? 2 : Number(maxBuy) <= 0 || Number(minBuy) > Number(maxBuy) < 0 ? 4 : 0;
      temp[5] = liquidity.length === 0 ? 1 : !isNumber(liquidity) ? 2 : Number(liquidity) <= 50 ? 4 : 0;
      temp[6] = listingRate.length === 0 ? 1 : !isNumber(listingRate) ? 2 : Number(listingRate) <= 0 ? 4 : 0;
      temp[7] = !isMoment(startTime) ? 1 : startTime.isBefore(moment()) ? 2 : startTime.isAfter(endTime) ? 3 : 0;
      temp[8] = !isMoment(endTime) ? 1 : endTime.isBefore(moment()) ? 2 : startTime.isAfter(endTime) ? 3 : 0;
      temp[9] = lockupTime.length === 0 ? 1 : !isNumber(lockupTime) ? 2 : Number(lockupTime) < 5 ? 4 : 0;
      temp[10] = firstRelease.length === 0 ? 1 : !isNumber(firstRelease) ? 2 : Number(firstRelease) <= 0 || Number(firstRelease) >= 100 || Number(firstRelease) + Number(vestingCycleAmount) > 100 ? 4 : 0;
      temp[11] = vestingCyclePeriod.length === 0 ? 1 : !isNumber(vestingCyclePeriod) ? 2 : Number(vestingCyclePeriod) <= 0 ? 4 : 0;
      temp[12] = vestingCycleAmount.length === 0 ? 1 : !isNumber(vestingCycleAmount) ? 2 : Number(vestingCycleAmount) >= 100 || Number(vestingCycleAmount) <= 0 || Number(firstRelease) + Number(vestingCycleAmount) > 100 ? 4 : 0;
      temp[13] = teamVestingTokens.length === 0 ? 1 : !isNumber(teamVestingTokens) ? 2 : Number(teamVestingTokens) <= 0 ? 4 : 0;
      temp[14] = teamFirstPeriod.length === 0 ? 1 : !isNumber(teamFirstPeriod) ? 2 : Number(teamFirstPeriod) <= 0 ? 4 : 0;
      temp[15] = teamFirstPercent.length === 0 ? 1 : !isNumber(teamFirstPercent) ? 2 : Number(teamFirstPercent) <= 0 || Number(teamFirstPercent) >= 100 || Number(teamFirstPercent) + Number(teamCycleAmount) > 100 ? 4 : 0;
      temp[16] = teamCyclePeriod.length === 0 ? 1 : !isNumber(teamCyclePeriod) ? 2 : Number(teamCyclePeriod) <= 0 ? 4 : 0;
      temp[17] = teamCycleAmount.length === 0 ? 1 : !isNumber(teamCycleAmount) ? 2 : Number(teamCycleAmount) >= 100 || Number(teamCycleAmount) <= 0 || Number(teamFirstPercent) + Number(teamCycleAmount) > 100 ? 4 : 0;
      temp[18] = saleTitle.length === 0 ? 1 : 0;
      temp[19] = !isMoment(estimatedListingTime) ? 1 : estimatedListingTime.isBefore(moment()) ? 2 : endTime.isAfter(estimatedListingTime) ? 3 : 0;
      const poolFactoryContract = await getPresaleFactoryContract(presaleFactoryData.address, true);
      console.log(poolFactoryContract);
      if (temp[0] === 0 && temp[1] === 0 && temp[2] === 0 && temp[5] === 0 && temp[6] === 0) {
        const rateSetting = ['0x' + (presaleRate * Math.pow(10, tokenDecimals)).toString(16), '0x' + (listingRate * Math.pow(10, tokenDecimals)).toString(16)];
        const capSettings = ['0x' + (softcap * Math.pow(10, 18)).toString(16), '0x' + (hardcap * Math.pow(10, 18)).toString(16)];
        const _needAmount = await poolFactoryContract.methods.estimateTokenAmount(rateSetting, capSettings, liquidity, teamVestingTokens === "" ? 0 : '0x' + (teamVestingTokens * Math.pow(10, tokenDecimals)).toString(16)).call();
        setNeedAmount(Number(_needAmount) / Math.pow(10, tokenDecimals));
      }

      if (!isVesting) {
        temp[10] = 0;
        temp[11] = 0;
        temp[12] = 0;
      }
      if (!isTeamVesting) {
        temp[13] = 0;
        temp[14] = 0;
        temp[15] = 0;
        temp[16] = 0;
        temp[17] = 0;
      }

      setCheckFlags2(temp);
      setCreateFlag2(!temp[0] * !temp[1] * !temp[2] * !temp[3] * !temp[4] * !temp[5] * !temp[6] * !temp[7] * !temp[8] * !temp[9] * !temp[10] * !temp[11] * !temp[12] * !temp[13] * !temp[14] * !temp[15] * !temp[16] * !temp[17] * !temp[18] * !temp[19]);
    }
    verify();
  }, [presaleRate, hardcap, softcap, minBuy, maxBuy, liquidity, listingRate, startTime, endTime, lockupTime, firstRelease, vestingCyclePeriod, vestingCyclePeriod, isVesting, isTeamVesting, teamVestingTokens, teamFirstPeriod, teamFirstPercent, teamCyclePeriod, teamCycleAmount, saleTitle, estimatedListingTime])

  useEffect(() => {
    let temp = [];
    temp[0] = !logoImg ? 1 : 0;
    temp[1] = website.length === 0 ? 1 : 0;
    setCheckFlags3(temp);
    setCreateFlag3(!temp[0] * !temp[1]);
    console.log(description);
  }, [logoImg, website])

  useEffect(() => {
    setPage(30);
  }, [])

  return (
    <div className="create-presale">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>
              <div className="title">{label.title}</div>
              <div className="description">
                {label.description}
                {
                  label?.link &&
                  <a href={label.link.url}>{label.link.name}</a>
                }
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {
        activeStep === 0 &&
        <div className="step-0">
          {/* <Switcher label="Launch a Stealth Sale" /> */}
          <OutlinedInput2 label="Token Address" value={tokenAddress} setValue={setTokenAddress} />
          {
            !checkFlag1 &&
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
                <span className="key">Decimals</span>
                <span className="value">{tokenDecimals}</span>
              </div>
              <div className="feature-line">
                <span className="key">Total Supply</span>
                <span className="value">{(tokenTotalSupply / Math.pow(10, tokenDecimals)).toFixed(2)}</span>
              </div>
              <div className="btn-container">
                {
                  approveFlag1 !== 2 &&
                  <button className="default-btn" disabled={!approveFlag1} onClick={() => setActiveStep(prev => prev + 1)}>Next</button>
                }
                {
                  approveFlag1 === 2 &&
                  <button className="default-btn" disabled={checkFlag1 || pending1} onClick={() => approveToken()}>Approve</button>
                }
              </div>
            </>

          }

        </div>
      }
      {
        activeStep === 1 &&
        <div className="step-1">
          <OutlinedInput1 label="Sale Title" value={saleTitle} setValue={setSaleTitle} />
          <OutlinedInput1 label="Total Supply" value={tokenTotalSupply / Math.pow(10, tokenDecimals)} />
          {/* <OutlinedSelect label="Fund Raising Token" options={["BNB", "BUSD", "Custom"]} value="BNB" /> */}
          <OutlinedInput2 label="Presale Rate" value={presaleRate} setValue={setPresaleRate} helper="If I spend 1 BNB how many tokens will receive?" />
          <OutlinedInput2 label="DEX Listing Rate" value={listingRate} setValue={setListingRate} />
          <div className="input-container">
            <OutlinedInput2 label="DEX Liquidity (%)" value={liquidity} setValue={setLiquidity} />
            <OutlinedInput2 label="Liquidity Lockup (days)" value={lockupTime} setValue={setLockupTime} />
          </div>
          <div className="input-container">
            <OutlinedInput2 label="Soft Cap (BNB)" value={softcap} setValue={setSoftcap} />
            <OutlinedInput2 label="Hard Cap (BNB)" value={hardcap} setValue={setHardcap} />
          </div>
          <div className="input-container">
            <OutlinedInput2 label="Minimum Buy (BNB)" value={minBuy} setValue={setMinBuy} />
            <OutlinedInput2 label="Maximum Buy (BNB)" value={maxBuy} setValue={setMaxBuy} />
          </div>
          <div className="input-container">
            <DateTimeInput label="Start Time (UTC)" value={startTime} setValue={setStartTime} />
            <DateTimeInput label="End Time (UTC)" value={endTime} setValue={setEndTime} />
          </div>
          <div className="input-container">
            <DateTimeInput label="Estimated Dex Listing Time (UTC)" value={estimatedListingTime} setValue={setEstimatedListingTime} />
            <OutlinedSelect label="Select what happens to Unsold Tokens" options={["Burn", "Refund"]} value={refundType} setValue={setRefundType} />
          </div>
          <div className="tips">
            <span>Read more about Presale Type here&nbsp;</span><a href="">Docs</a>
          </div>
          <OutlinedSelect label="Presale Type" options={["Whitelist", "Public"]} value={presaleType} setValue={setPresaleType} />
          {/* <div className="tips">
            <span>Tip: Use another (stealth) wallet for uploading the tokens & finalization.</span>
          </div> */}
          {/* <OutlinedInput2 label="Stealth Wallet" /> */}
          {/* <div className="title">Optional Features:</div> */}
          {/* <Switcher label="Anti Sniper Protection" /> */}
          <Switcher label="Add Team Token Vesting" value={isTeamVesting} setValue={setIsTeamVesting} />
          {
            isTeamVesting &&
            <>
              <OutlinedInput2 label="Total Team Vesting Tokens" value={teamVestingTokens} setValue={setTeamVestingTokens} />
              <div className="input-container">
                <OutlinedInput2 label="First Token Release (%)" value={teamFirstPercent} setValue={setTeamFirstPercent} />
                <OutlinedInput2 label="First Token Release After Listing (days)" value={teamFirstPeriod} setValue={setTeamFirstPeriod} />
              </div>
              <div className="input-container">
                <OutlinedInput2 label="Team Token Release Each Cycle (%)" value={teamCycleAmount} setValue={setTeamCycleAmount} />
                <OutlinedInput2 label="Vesting Period Each Cycle (days)" value={teamCyclePeriod} setValue={setTeamCyclePeriod} />
              </div>
            </>

          }
          <Switcher label="Add Presale Vesting" value={isVesting} setValue={setIsVesting} />
          {
            isVesting &&
            <>
              <OutlinedInput2 label="First Token Release (%)" value={firstRelease} setValue={setFirstRelease} />
              {/* <OutlinedInput2 label="Cliff (days)" /> */}
              <div className="input-container">
                <OutlinedInput2 label="Token Release Each Cycle (%)" value={vestingCycleAmount} setValue={setVestingCycleAmount} />
                <OutlinedInput2 label="Vesting Period Each Cycle (days)" value={vestingCyclePeriod} setValue={setVestingCyclePeriod} />
              </div>
            </>
          }
          <div className="font-cyan">{needAmount} {tokenSymbol} needed to create a pool</div>
          <div className="btn-container">
            <button className="default-btn" onClick={() => setActiveStep(activeStep - 1)}>Back</button>
            <button className="default-btn" disabled={!createFlag2 || pending2} onClick={() => setActiveStep(activeStep + 1)}>Next</button>
          </div>
        </div>
      }
      {
        activeStep === 2 &&
        <div className="step-2">
          <div className="input-container">
            <OutlinedInput2 label="Logo URL" value={logoImg} setValue={setLogoImg} helper={"URL must end with a supported image extension png, jpg, jpeg or gif. You can upload your image on <a class='font-red' href='https://postimages.org/' target='_blank'>https://postimages.org/</a>"} />
            <OutlinedInput2 label="Preferred Cover Photo (Banner) Size is 1024 * 150" value={bannerImg} setValue={setBannerImg} helper={"URL must end with a supported image extension png, jpg, jpeg or gif. You can upload your image on <a class='font-red' href='https://postimages.org/' target='_blank'>https://postimages.org/</a>"} />
            {/* <OutlinedInput2 label="Logo URL" value={logoImage} setValue={logoImage} /> */}
            {/* <div className="input-item"> */}
            {/* <label className="text-white"><div>Logo Image<span>*</span></div></label> */}
            {/* <input type="file" id="logo-img" accept="image/png, image/gif, image/jpeg" onChange={setImg} style={{ display: "none" }}></input>
              <label htmlFor="logo-img" className="text-input">Logo Image, Click to upload</label>
              {checkFlags3[0] ? <div className="warning-text">This field is required</div> : null}
              {logoImage && <div className="tips-text">Uploaded to IPFS</div>} */}
            {/* </div> */}
          </div>
          <div className="input-container">
            <OutlinedInput2 label="Website" value={website} setValue={setWebsite} placeholder={"https://..."} />
            <OutlinedInput2 label="Twitter" value={twitter} setValue={setTwitter} placeholder={"https://twitter.com/..."} />
          </div>
          <div className="input-container">
            <OutlinedInput2 label="Github" value={github} setValue={setGithub} placeholder={"https://github.com/..."} />
            <OutlinedInput2 label="Telegram" value={telegram} setValue={setTelegram} placeholder={"https://t.me/..."} />
          </div>
          <div className="input-container">
            <OutlinedInput2 label="Facebook" value={facebook} setValue={setFacebook} placeholder={"https://facebook.com/..."} />
            <OutlinedInput2 label="Reddit" value={reddit} setValue={setReddit} placeholder={"https://reddit.com/..."} />
          </div>
          <div className="input-container">
            <OutlinedInput2 label="Discord" value={discord} setValue={setDiscord} placeholder={"https://discord.com/..."} />
            <OutlinedInput2 label="Youtube Presentation Video Embed Link" value={youtube} setValue={setYoutube} placeholder={"https://www.youtube.com/embed/..."} />
          </div>
          {
            presaleType === "Whitelist" &&
            <MultilineInput label="Whitelist" value={whitelist} setValue={setWhitelist} />
          }
          <MultilineInput label="Description" value={description} setValue={setDescription} />
          {/* <div className="title">Select Tier:</div>
          <div className="tier-list">
            <div className="common">
              <div className="label">COMMON</div>
              <div className="tier-card">
                <div className="features">
                  Common tier without any special perks
                </div>
                <div className="fee">FEE: 0 BNB</div>
              </div>
            </div>
            <div className="gold">
              <div className="label">GOLD</div>
              <div className="tier-card">
                <div className="features">
                  - Gold Border<br />
                  - Audit Option<br />
                  - KYC Option
                </div>
                <div className="fee">FEE: 0 BNB</div>
              </div>
            </div>
            <div className="platinum">
              <div className="label">PLATINUM</div>
              <div className="tier-card">
                <div className="features">
                  - Platinum Border<br />
                  - KYC included<br />
                  - Gempad AMA included<br />
                  - Audit Option<br />
                  & More!
                </div>
                <div className="fee">FEE: CONTACT US</div>
              </div>
            </div>
            <div className="diamond">
              <div className="label">DIAMOND</div>
              <div className="tier-card">
                <div className="features">
                  - Diamond Border<br />
                  - KYC included<br />
                  - Gempad AMA included<br />
                  - Cheap Audit Rate<br />
                  - CMC & CG Listing<br />
                  - Calls By Partners<br />
                  & More!
                </div>
                <div className="fee">FEE: CONTACT US</div>
              </div>
            </div>
          </div> */}
          <div className="btn-container">
            <button className="default-btn" onClick={() => setActiveStep(activeStep - 1)}>Back</button>
            <button className="default-btn" disabled={!createFlag3 || pending3} onClick={() => setActiveStep(activeStep + 1)}>Next</button>
          </div>
        </div>
      }
      {
        activeStep === 3 &&
        <div className="step-3">
          <div className="text-center font-cyan bold">Basic Features</div>
          <div className="feature-line">
            <span className="key">Sale Title</span>
            <span className="value">{saleTitle}</span>
          </div>
          <div className="feature-line">
            <span className="key">Token Address</span>
            <span className="value">{tokenAddress}</span>
          </div>
          <div className="feature-line">
            <span className="key">Token Name</span>
            <span className="value">{tokenName}</span>
          </div>
          <div className="feature-line">
            <span className="key">Token Symbol</span>
            <span className="value">{tokenSymbol}</span>
          </div>
          <div className="feature-line">
            <span className="key">Token Decimal</span>
            <span className="value">{tokenDecimals}</span>
          </div>
          <div className="feature-line">
            <span className="key">Total Token</span>
            <span className="value">{(tokenTotalSupply / Math.pow(10, tokenDecimals)).toFixed(2)}</span>
          </div>
          <div className="feature-line">
            <span className="key">Presale Rate</span>
            <span className="value">{presaleRate} {tokenSymbol}</span>
          </div>
          <div className="feature-line">
            <span className="key">Listing Rate</span>
            <span className="value">{listingRate} {tokenSymbol}</span>
          </div>
          <div className="feature-line">
            <span className="key">Soft Cap</span>
            <span className="value">{softcap} BNB</span>
          </div>
          <div className="feature-line">
            <span className="key">Hard Cap</span>
            <span className="value">{hardcap} BNB</span>
          </div>
          <div className="feature-line">
            <span className="key">Minimum Buy</span>
            <span className="value">{minBuy} BNB</span>
          </div>
          <div className="feature-line">
            <span className="key">Maximum Buy</span>
            <span className="value">{maxBuy} BNB</span>
          </div>
          <div className="feature-line">
            <span className="key">Liquidity</span>
            <span className="value">{liquidity} %</span>
          </div>
          <div className="feature-line">
            <span className="key">Start Time</span>
            <span className="value">{moment(startTime).format("YYYY-MM-DD HH:mm:ss")}</span>
          </div>
          <div className="feature-line">
            <span className="key">End Time</span>
            <span className="value">{moment(endTime).format("YYYY-MM-DD HH:mm:ss")}</span>
          </div>
          <div className="feature-line">
            <span className="key">Liquidity Lock Time Period</span>
            <span className="value">{lockupTime} days</span>
          </div>
          <div className="feature-line">
            <span className="key">Estimated Listing Time</span>
            <span className="value">{moment(estimatedListingTime).format("YYYY-MM-DD HH:mm:ss")}</span>
          </div>
          <div className="feature-line">
            <span className="key">Refund Type</span>
            <span className="value">{refundType}</span>
          </div>
          <div className="feature-line">
            <span className="key">Presale Type</span>
            <span className="value">{presaleType}</span>
          </div>

          {/* Vestings */}
          {
            isTeamVesting &&
            <>
              <div className="text-center font-cyan bold">Team Vesting</div>
              <div className="feature-line">
                <span className="key">Total Team Vesting Tokens</span>
                <span className="value">{teamVestingTokens} {tokenSymbol}</span>
              </div>
              <div className="feature-line">
                <span className="key">First Token Release</span>
                <span className="value">{teamFirstPercent} %</span>
              </div>
              <div className="feature-line">
                <span className="key">First Token Release After Listing</span>
                <span className="value">{teamFirstPeriod} days</span>
              </div>
              <div className="feature-line">
                <span className="key">Team Token Release Each Cycle</span>
                <span className="value">{teamCycleAmount} %</span>
              </div>
              <div className="feature-line">
                <span className="key">Vesting Period Each Cycle</span>
                <span className="value">{teamCyclePeriod} days</span>
              </div>
            </>
          }
          {
            isVesting &&
            <>
              <div className="text-center font-cyan bold">Vesting</div>
              <div className="feature-line">
                <span className="key">First Token Release</span>
                <span className="value">{firstRelease} %</span>
              </div>
              <div className="feature-line">
                <span className="key">Token Release Each Cycle</span>
                <span className="value">{vestingCycleAmount} %</span>
              </div>
              <div className="feature-line">
                <span className="key">Vesting Period Each Cycle</span>
                <span className="value">{vestingCyclePeriod} days</span>
              </div>
            </>
          }
          <div className="text-center font-cyan bold">Links</div>
          <div className="feature-line">
            <span className="key">Website</span>
            <span className="value">{website}</span>
          </div>
          <div className="feature-line">
            <span className="key">Twitter</span>
            <span className="value">{twitter}</span>
          </div>
          <div className="feature-line">
            <span className="key">Github</span>
            <span className="value">{github}</span>
          </div>
          <div className="feature-line">
            <span className="key">Telegram</span>
            <span className="value">{telegram}</span>
          </div>
          <div className="feature-line">
            <span className="key">Facebook</span>
            <span className="value">{facebook}</span>
          </div>
          <div className="feature-line">
            <span className="key">Reddit</span>
            <span className="value">{reddit}</span>
          </div>
          <div className="feature-line">
            <span className="key">Discord</span>
            <span className="value">{discord}</span>
          </div>
          <div className="feature-line">
            <span className="key">Youtube</span>
            <span className="value">{youtube}</span>
          </div>
          <div className="feature-line">
            <span className="key">Reddit</span>
            <span className="value">{reddit}</span>
          </div>
          <div className="feature-line">
            <span className="key">Whitelist</span>
            <span className="value">{whitelist}</span>
          </div>
          <div className="feature-line">
            <span className="key">Description</span>
            <span className="value">{description}</span>
          </div>
          {/* <div className="feature-line">
            <span className="key">Tier</span>
            <span className="value">gold</span>
          </div> */}
          <div className="feature-line">
            <span className="key">Token Needed</span>
            <span className="value">{needAmount} {tokenSymbol}</span>
          </div>
          <div className="btn-container">
            <button className="default-btn" onClick={(p) => setActiveStep(activeStep - 1)}>Back</button>
            <button className="default-btn" disabled={pending4} onClick={submit} >Complete</button>
          </div>
        </div>
      }
    </div>
  )
}