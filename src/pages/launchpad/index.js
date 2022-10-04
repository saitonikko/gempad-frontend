import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { notify } from "../../utils/notifyFunctions";
import CreatePresale from './CreatePresale';
import CreateHyperLaunch from './CreateHyperLaunch';
import CreateFairLaunch from './CreateFairLaunch';
import CreateSpecialSale from './CreateSpecialSale';
import ManagePresales from './ManagePresales';
import ManageSpcialSales from './ManageSpecialSales';


export default function Launchpad({ setPage }) {
    const {tab} = useParams();

    return (
        <div id="launchpad">
            <div className="space" />
            {tab === "create_presale" && <CreatePresale setPage={setPage} />}
            {tab === "create_hyper_launch" && <CreateHyperLaunch setPage={setPage} />}
            {tab === "create_fair_launch" && <CreateFairLaunch setPage={setPage} />}
            {tab === "create_special_sale" && <CreateSpecialSale setPage={setPage} />}
            {tab === "manage_presales" && <ManagePresales setPage={setPage} />}
            {tab === "manage_special_sales" && <ManageSpcialSales setPage={setPage} />}
        </div>
    )
}