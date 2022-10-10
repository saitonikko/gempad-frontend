import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { notify } from "../../utils/notifyFunctions";
import Explore from './Explore';
import QuickView from './QuickView';
import MyContributions from './MyContributions';
import MyAlarms from './MyAlarms';

import view from "../../assets/img/icons/view.svg";
import all from "../../assets/img/icons/all.svg";
import mine from "../../assets/img/icons/mine.svg";
import heart from "../../assets/img/icons/heart.svg";
import bell from "../../assets/img/icons/bell.svg";
import launch from "../../assets/img/icons/launchpad.svg";

export default function Presales({ setPage }) {
    const { tab } = useParams();

    return (
        <div id="presales">
            <div className="space" />
            <div className="tab-switcher">
                <Link className={tab === "quick_view"? "tab-active btn": "tab btn"} to="/presales/quick_view">
                    <img src={view} />
                    <span>Quick View</span>
                </Link>
                <Link className={tab === "explore"? "tab-active btn": "tab btn"} to="/presales/explore">
                    <img src={all} />
                    <span>All Presales</span>
                </Link>
                <Link className={tab === "my_contributions"? "tab-active btn": "tab btn"} to="/presales/my_contributions">
                    <img src={mine} />
                    <span>My Contributions</span>
                </Link>
                <Link className={tab === "my_favourites"? "tab-active btn": "tab btn"} to="/presales/my_favourites">
                    <img src={heart} />
                    <span>My Favourites</span>
                </Link>
                <Link className={tab === "my_alarms"? "tab-active btn": "tab btn"} to="/presales/my_alarms">
                    <img src={bell} />
                    <span>My Alarms</span>
                </Link>
                <Link className={tab === "my_created_presales"? "tab-active btn": "tab btn"} to="/presales/my_created_presales">
                    <img src={launch} />
                    <span>My Created Presales</span>
                </Link>
            </div>
            {tab === "explore" && <Explore setPage={setPage} />}
            {tab === "quick_view" && <QuickView setPage={setPage} />}
            {tab === "my_contributions" && <MyContributions setPage={setPage} />}
            {tab === "my_alarms" && <MyAlarms setPage={setPage} />}
        </div>
    )
}