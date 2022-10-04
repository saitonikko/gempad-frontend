import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { notify } from "../../utils/notifyFunctions";
import Airdrop from './Airdrop';
import PresaleCalculator from './PresaleCalculator';
import CreateToken from './CreateToken';
import ManageAntiBot from './ManageAntiBot';
import Stake from './Stake';

export default function Tools({ setPage }) {
    const { tab } = useParams();

    return (
        <div id="tools">
            <div className="space" />
            {tab === "airdrop" && <Airdrop setPage={setPage} />}
            {tab === "presale_calculator" && <PresaleCalculator setPage={setPage} />}
            {tab === "create_token" && <CreateToken setPage={setPage} />}
            {tab === "manage_antibot" && <ManageAntiBot setPage={setPage} />}
            {tab === "stake" && <Stake setPage={setPage} />}
        </div>
    )
}