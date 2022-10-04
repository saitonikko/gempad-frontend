import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { notify } from "../../utils/notifyFunctions";
import CreateLock from './CreateLock';
import TokenLock from './TokenLock';
import LiquidityLock from './LiquidityLock';

export default function Locks({ setPage }) {
    const { tab } = useParams();

    return (
        <div id="locks">
            <div className="space" />
            {tab === "create_lock" && <CreateLock setPage={setPage} />}
            {tab === "token_lock" && <TokenLock setPage={setPage} />}
            {tab === "liquidity_lock" && <LiquidityLock setPage={setPage} />}
        </div>
    )
}