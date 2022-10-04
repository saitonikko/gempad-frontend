import React, { useEffect, useState } from 'react';
import { notify } from "../../utils/notifyFunctions";
import { OutlinedInput2 } from '../../components/CustomizeMui';
import logo from "../../assets/img/icons/logo.svg";


export default function LiquidityLock({ setPage }) {

  useEffect(() => {
    setPage(42);
  }, [])

  return (
    <div className="liquidity-lock">
      <div className="card">
        <OutlinedInput2 label="Search By LP Address" />
        <table>
          <tr>
            <th>Token</th>
            <th>Amount</th>
            <th></th>
          </tr>
          <tr>
            <td className="left">
              <img src={logo} />
              <div className="title">
                <div className="name">standard token</div>
                <div className="symbol">$STT</div>
              </div>
            </td>
            <td>100.0</td>
            <td><a href="">View</a></td>
          </tr>
          <tr>
            <td className="left">
              <img src={logo} />
              <div className="title">
                <div className="name">standard token</div>
                <div className="symbol">$STT</div>
              </div>
            </td>
            <td>100.0</td>
            <td><a href="">View</a></td>
          </tr>
          <tr>
            <td className="left">
              <img src={logo} />
              <div className="title">
                <div className="name">standard token</div>
                <div className="symbol">$STT</div>
              </div>
            </td>
            <td>100.0</td>
            <td><a href="">View</a></td>
          </tr>
          <tr>
            <td className="left">
              <img src={logo} />
              <div className="title">
                <div className="name">standard token</div>
                <div className="symbol">$STT</div>
              </div>
            </td>
            <td>100.0</td>
            <td><a href="">View</a></td>
          </tr>
          <tr>
            <td className="left">
              <img src={logo} />
              <div className="title">
                <div className="name">standard token</div>
                <div className="symbol">$STT</div>
              </div>
            </td>
            <td>100.0</td>
            <td><a href="">View</a></td>
          </tr>
        </table>
      </div>
    </div>
  )
}