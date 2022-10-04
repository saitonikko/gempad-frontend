import React from 'react';
import MenuItem from '../components/MenuItem';
import logo from "../assets/img/icons/logo.svg";
import presales from "../assets/img/icons/presales.svg";
import specialSales from "../assets/img/icons/special-sales.svg";
import launchpad from "../assets/img/icons/launchpad.svg";
import locks from "../assets/img/icons/locks.svg";
import tools from "../assets/img/icons/tools.svg";
import presaleAlerts from "../assets/img/icons/presale-alerts.svg";
import kycAudit from "../assets/img/icons/kyc-audit.svg";
import docs from "../assets/img/icons/docs.svg";

export default function Sidebar({ page }) {
    return (
        <div id="sidebar">
            <div className="top">
                <a href="/" className="logo"><img src={logo} /></a>
                <div className="right">
                    <a className="title" href="/">GemPad</a>
                    <a className="default-btn" href="/">Buy $GEMS</a>
                </div>
            </div>
            <div className="menu">
                <MenuItem
                    page={page}
                    logo={presales}
                    title={"Presales"}
                    subtitles={[
                        {
                            name: "Explore",
                            page: 10,
                            link: "/presales/explore"
                        }, {
                            name: "Quick View",
                            page: 11,
                            link: "/presales/quick_view"
                        }, {
                            name: "My Contributions",
                            page: 12,
                            link: "/presales/my_contributions"
                        }, {
                            name: "My Alarms",
                            page: 13,
                            link: "/presales/my_alarms"
                        }
                    ]}
                />
                <MenuItem
                    page={page}
                    logo={specialSales}
                    title={"Special Sales"}
                    subtitles={[
                        {
                            name: "Explore",
                            page: 20,
                            link: "/special_sales/explore"
                        }, {
                            name: "My Contributions",
                            page: 21,
                            link: "/special_sales/my_contributions"
                        }, {
                            name: "My Alarms",
                            page: 22,
                            link: "/special_sales/my_alarms"
                        }
                    ]}
                />
                <MenuItem
                    page={page}
                    logo={launchpad}
                    title={"Launchpad"}
                    subtitles={[
                        {
                            name: "Create Presale",
                            page: 30,
                            link: "/launchpad/create_presale"
                        }, {
                            name: "Create Hyper Launch",
                            page: 31,
                            link: "/launchpad/create_hyper_launch"
                        }, {
                            name: "Create Fair Launch",
                            page: 32,
                            link: "/launchpad/create_fair_launch"
                        }, {
                            name: "Create Special Sale",
                            page: 33,
                            link: "/launchpad/create_special_sale"
                        }, {
                            name: "Manage Presales",
                            page: 34,
                            link: "/launchpad/manage_presales"
                        }, {
                            name: "Manage Special Sales",
                            page: 35,
                            link: "/launchpad/manage_special_sales"
                        }
                    ]}
                />
                <MenuItem
                    page={page}
                    logo={locks}
                    title={"Locks"}
                    subtitles={[
                        {
                            name: "Create Lock",
                            page: 40,
                            link: "/locks/create_lock"
                        }, {
                            name: "Token Lock",
                            page: 41,
                            link: "/locks/token_lock"
                        }, {
                            name: "Liquidity Lock",
                            page: 42,
                            link: "/locks/liquidity_lock"
                        }
                    ]}
                />
                <MenuItem
                    page={page}
                    logo={tools}
                    title={"Utility & Tools"}
                    subtitles={[
                        {
                            name: "Airdrop",
                            page: 50,
                            link: "/tools/airdrop"
                        }, {
                            name: "Presale Calculator",
                            page: 51,
                            link: "/tools/presale_calculator"
                        }, {
                            name: "Create Token",
                            page: 52,
                            link: "/tools/create_token"
                        }, {
                            name: "Manage Anti-Bot",
                            page: 53,
                            link: "/tools/manage_antibot"
                        }, {
                            name: "Stake",
                            page: 54,
                            link: "/tools/stake"
                        }
                    ]}
                />
                <a className="title" href="/">
                    <div className="logo"><img src={presaleAlerts} /></div>
                    <span>Presale Alerts</span>
                </a>
                <a className="title" href="/">
                    <div className="logo"><img src={kycAudit} /></div>
                    <span>KYC & Audit</span>
                </a>
                <a className="title" href="/">
                    <div className="logo"><img src={docs} /></div>
                    <span>Docs</span>
                </a>
            </div>
            <div className="bottom">

            </div>
        </div>
    )
}
