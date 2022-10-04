import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { notify } from "../../utils/notifyFunctions";
import Explore from './Explore';
import MyContributions from './MyContributions';
import MyAlarms from './MyAlarms';

import all from "../../assets/img/icons/all.svg";
import mine from "../../assets/img/icons/mine.svg";
import heart from "../../assets/img/icons/heart.svg";
import bell from "../../assets/img/icons/bell.svg";
import launch from "../../assets/img/icons/launchpad.svg";

export default function SpecialSales({ setPage }) {
    const { tab } = useParams();

    return (
        <div id="special-sales">
            <div className="space" />
            <div className="tab-switcher">
                <a className={tab === "explore" ? "tab-active btn" : "tab btn"} href="/special_sales/explore">
                    <img src={all} />
                    <span>All Presales</span>
                </a>
                <a className={tab === "my_contributions" ? "tab-active btn" : "tab btn"} href="/special_sales/my_contributions">
                    <img src={mine} />
                    <span>My Contributions</span>
                </a>
                <a className={tab === "my_favourites" ? "tab-active btn" : "tab btn"} href="/special_sales/my_favourites">
                    <img src={heart} />
                    <span>My Favourites</span>
                </a>
                <a className={tab === "my_alarms" ? "tab-active btn" : "tab btn"} href="/special_sales/my_alarms">
                    <img src={bell} />
                    <span>My Alarms</span>
                </a>
                <a className={tab === "my_created_presales" ? "tab-active btn" : "tab btn"} href="/special_sales/my_created_presales">
                    <img src={launch} />
                    <span>My Created Presales</span>
                </a>
            </div>
            {tab === "explore" && <Explore setPage={setPage} />}
            {tab === "my_contributions" && <MyContributions setPage={setPage} />}
            {tab === "my_alarms" && <MyAlarms setPage={setPage} />}
        </div>
    )
}