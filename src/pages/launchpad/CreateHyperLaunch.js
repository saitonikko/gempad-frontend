import React, { useEffect, useState } from 'react';
import {notify} from "../../utils/notifyFunctions";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { DateTimeInput, OutlinedInput1, OutlinedInput2, MultilineInput, OutlinedSelect, Switcher } from '../../components/CustomizeMui';

const steps = [
  {
    title: "Approve Token",
    description: "Enter the token address and approve"
  },
  {
    title: "Special Sale Information",
    description: "Enter the Special Sale information, in case of trouble check our ",
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
    description: "Submit your Special Sale"
  },
];

export default function CreateHyperLaunch({setPage}) {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    setPage(31);
  }, [])

  return (
    <div className="create-hyper-launch">
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
          <Switcher label="Launch a Stealth Sale" />
          <OutlinedInput2 label="First Token Release (%)" />
        </div>
      }
      {
        activeStep === 1 &&
        <div className="step-1">
          <OutlinedInput1 label="Sale Title" />
          <OutlinedInput1 label="Total Supply" />
          <OutlinedSelect label="Fund Raising Token" options={["BNB", "BUSD", "Custom"]} value="BNB" />
          <OutlinedInput2 label="Presale Data" helper="If I spend 1 BNB how many tokens will receive?" />
          <OutlinedInput2 label="DEX Listing Rate" />
          <div className="input-container">
            <OutlinedInput2 label="DEX Liquidity (%)" />
            <OutlinedInput2 label="Liquidity Lockup (days)" />
          </div>
          <div className="input-container">
            <OutlinedInput2 label="Soft Cap (BNB)" />
            <OutlinedInput2 label="Hard Cap (BNB)" />
          </div>
          <div className="input-container">
            <OutlinedInput2 label="Minimum Buy (BNB)" />
            <OutlinedInput2 label="Maximum Buy (BNB)" />
          </div>
          <div className="input-container">
            <DateTimeInput label="Start Time (UTC)" />
            <DateTimeInput label="End Time (UTC)" />
          </div>
          <div className="tips">
            <span>Read more about Presale Type here&nbsp;</span><a href="">Docs</a>
          </div>
          <OutlinedSelect label="Fund Raising Token" options={["Tiered Whitelist", "Whitelist", "Public"]} value="Public" />
          <div className="tips">
            <span>Tip: Use another (stealth) wallet for uploading the tokens & finalization.</span>
          </div>
          <OutlinedInput2 label="Stealth Wallet" />
          <div className="title">Optional Features:</div>
          <Switcher label="Anti Sniper Protection" />
          <Switcher label="Add Team Token Vesting" />
          <OutlinedInput2 label="Total Team Vesting Tokens" />
          <div className="input-container">
            <OutlinedInput2 label="First Token Release (%)" />
            <OutlinedInput2 label="First Token Release After Listing (days)" />
          </div>
          <div className="input-container">
            <OutlinedInput2 label="Team Token Release Each Cycle (%)" />
            <OutlinedInput2 label="Vesting Period Each Cycle (days)" />
          </div>
          <Switcher label="Add Presale Vesting" />
          <div className="input-container">
            <OutlinedInput2 label="First Token Release (%)" />
            <OutlinedInput2 label="Cliff (days)" />
          </div>
          <div className="input-container">
            <OutlinedInput2 label="Token Release Each Cycle (%)" />
            <OutlinedInput2 label="Vesting Period Each Cycle (days)" />
          </div>
          <div className="warning">0 $coin needed to create a pool!</div>
          <div className="helper">Estimated Market Cap: 0 $</div>
          <div className="btn-container">
            <div className="default-btn" onClick={() => setActiveStep(activeStep - 1)}>Back</div>
            <div className="default-btn" onClick={() => setActiveStep(activeStep + 1)}>Next</div>
          </div>
        </div>
      }
      {
        activeStep === 2 &&
        <div className="step-2">
          <div className="input-container">
            <OutlinedInput2 label="Preferred Cover Photo (Banner) Size is 1024 * 150" />
            <OutlinedInput2 label="Logo URL" />
          </div>
          <div className="input-container">
            <OutlinedInput2 label="Website" />
            <OutlinedInput2 label="Twitter" />
          </div>
          <div className="input-container">
            <OutlinedInput2 label="Github" />
            <OutlinedInput2 label="Telegram" />
          </div>
          <div className="input-container">
            <OutlinedInput2 label="Discord" />
            <OutlinedInput2 label="Youtube Presentation Video Embed Link" />
          </div>
          <OutlinedInput2 label="Whitelist Link" />
          <MultilineInput label="Stelth Wallet" />
          <div className="title">Select Tier:</div>
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
          </div>
          <div className="btn-container">
            <div className="default-btn" onClick={() => setActiveStep(activeStep - 1)}>Back</div>
            <div className="default-btn" onClick={() => setActiveStep(activeStep + 1)}>Next</div>
          </div>
        </div>
      }
      {
        activeStep === 3 &&
        <div className="step-3">
          <div className="feature-line">
            <span className="key">Total Token</span>
            <span className="value">10 000 000 000</span>
          </div>
          <div className="feature-line">
            <span className="key">Token Name</span>
            <span className="value">BIT DOGE</span>
          </div>
          <div className="feature-line">
            <span className="key">Token Symbol</span>
            <span className="value">BITD</span>
          </div>
          <div className="feature-line">
            <span className="key">Token Decimal</span>
            <span className="value">18</span>
          </div>
          <div className="feature-line">
            <span className="key">Presale Rate</span>
            <span className="value">1000000 BITD</span>
          </div>
          <div className="feature-line">
            <span className="key">Listing Rate</span>
            <span className="value">900000</span>
          </div>
          <div className="feature-line">
            <span className="key">Soft Cap</span>
            <span className="value">100 BNB</span>
          </div>
          <div className="feature-line">
            <span className="key">Hard Cap</span>
            <span className="value">200 BNB</span>
          </div>
          <div className="feature-line">
            <span className="key">Minimum Buy</span>
            <span className="value">1 BNB</span>
          </div>
          <div className="feature-line">
            <span className="key">Maximum Buy</span>
            <span className="value">2 BNB</span>
          </div>
          <div className="feature-line">
            <span className="key">Liquidity</span>
            <span className="value">70 %</span>
          </div>
          <div className="feature-line">
            <span className="key">Start Time</span>
            <span className="value">2022-09-30 23:10</span>
          </div>
          <div className="feature-line">
            <span className="key">End Time</span>
            <span className="value">2022-09-30 23:10</span>
          </div>
          <div className="feature-line">
            <span className="key">Liquidity Lock Time Period</span>
            <span className="value">90</span>
          </div>
          <div className="feature-line">
            <span className="key">Website</span>
            <span className="value">https://gempad.app</span>
          </div>
          <div className="feature-line">
            <span className="key">Twitter</span>
            <span className="value"></span>
          </div>
          <div className="feature-line">
            <span className="key">Telegram</span>
            <span className="value"></span>
          </div>
          <div className="feature-line">
            <span className="key">Github</span>
            <span className="value"></span>
          </div>
          <div className="feature-line">
            <span className="key">Discord</span>
            <span className="value"></span>
          </div>
          <div className="feature-line">
            <span className="key">Youtube</span>
            <span className="value"></span>
          </div>
          <div className="feature-line">
            <span className="key">Whitelist Link</span>
            <span className="value"></span>
          </div>
          <div className="feature-line">
            <span className="key">Reddit</span>
            <span className="value"></span>
          </div>
          <div className="feature-line">
            <span className="key">Description</span>
            <span className="value">description</span>
          </div>
          <div className="feature-line">
            <span className="key">Tier</span>
            <span className="value">gold</span>
          </div>
          <div className="btn-container">
            <div className="default-btn" onClick={(p) => setActiveStep(activeStep - 1)}>Back</div>
            <div className="default-btn" >Complete</div>
          </div>
        </div>
      }
    </div>
  )
}