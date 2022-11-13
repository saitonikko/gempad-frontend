import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useAccount } from 'wagmi';
import { useQuery, useMutation } from "@apollo/client";
import moment from 'moment';
import { Modal } from 'antd';
import { notify } from "../../utils/notifyFunctions";
import { getERC20Contract, getLockContract, getLpContract } from '../../utils/contractFunctions';
import { GET_LOCK_LISTS } from "../../graphql/lock/queries";
import { UPDATE_LOCK_LIST, UNLOCK_LOCK_LIST } from "../../graphql/lock/mutations";
import { DateTimeInput } from '../../components/CustomizeMui';

function LiquidityLockDetail({ setPage }) {
    const { tokenAddress } = useParams();
    const { address } = useAccount();
    const { data, loading, error } = useQuery(GET_LOCK_LISTS, {
        variables: {
            tokenAddress: tokenAddress
        }
    });
    const [updateLockList] = useMutation(UPDATE_LOCK_LIST);
    const [unlockLockList] = useMutation(UNLOCK_LOCK_LIST);
    const [tokenName_0, setTokenName_0] = useState("");
    const [tokenName_1, setTokenName_1] = useState("");
    const [tokenSymbol_0, setTokenSymbol_0] = useState("");
    const [tokenSymbol_1, setTokenSymbol_1] = useState("");
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [lockData, setLockData] = useState(null);
    const [lockId, setLockId] = useState(null);
    const [amount, setAmount] = useState(null);
    const [unlockTime, setUnlockTime] = useState(null);
    const [pending, setPending] = useState(false);

    const getPair = async () => {
        try {
            const contract = await getLpContract(tokenAddress);
            const token_0 = await contract.methods.token0().call();
            const token_1 = await contract.methods.token1().call();
            const contract_0 = await getERC20Contract(token_0);
            const tokenName_0 = await contract_0.methods.name().call();
            const tokenSymbol_0 = await contract_0.methods.symbol().call();
            const contract_1 = await getERC20Contract(token_1);
            const tokenName_1 = await contract_1.methods.name().call();
            const tokenSymbol_1 = await contract_1.methods.symbol().call();
            setTokenName_0(tokenName_0);
            setTokenSymbol_0(tokenSymbol_0);
            setTokenName_1(tokenName_1);
            setTokenSymbol_1(tokenSymbol_1);
        } catch (err) {
            console.log(err)
        }
    }

    const unlock = async (_lockId) => {
        setPending(true);
        try {
            const contract = await getLockContract();
            await contract.methods.unlock(_lockId).send({ from: address });
            unlockLockList({
                variables: {
                    lockId: _lockId
                }
            })
            notify(0, "unlock success");
        } catch (err) {
            console.log(err);
            notify(2, err.message);
        }
        setPending(false);
    }

    const openExtendModal = async (_lockId, _amount) => {
        setLockId(_lockId);
        setAmount(_amount);
        setIsModalOpened(true);
    }

    const extend = async () => {
        setPending(true);
        try {
            const contract = await getLockContract();
            await contract.methods.editLock(lockId, '0x' + (amount * Math.pow(10, lockData.decimals)).toString(16), moment(unlockTime).format('X')).send({ from: address });
            updateLockList({
                variables: {
                    lockId: lockId, unlockTime: moment(unlockTime).format('X')
                }
            })
            notify(0, "extend success");
        } catch (err) {
            console.log(err);
            notify(2, err.message);
        }
        setPending(false);
        setIsModalOpened(false);
    }

    useEffect(() => {
        setLockData(data?.getLockLists[0])
    }, [data])

    useEffect(() => {
        getPair()
    }, [lockData])

    useEffect(() => {
        setPage(41);
    }, [])

    return (
        <div id="locks">
            <div className="space" />
            <div className="lock-detail">
                <div className="card">
                    <div className="title">
                        Lock info
                    </div>
                    <div className="hr" />
                    <div className="feature-line">
                        <div className="key">Total Amount Locked</div>
                        <div className="value">{lockData?.amount.toFixed(1)}</div>
                    </div>
                    <div className="feature-line">
                        <div className="key">Total Value Locked</div>
                        <div className="value">0$</div>
                    </div>
                    <div className="feature-line">
                        <div className="key">LP Address</div>
                        <div className="value">{tokenAddress}</div>
                    </div>
                    <div className="feature-line">
                        <div className="key">Pair Name</div>
                        <div className="value">{tokenName_0} / {tokenName_1}</div>
                    </div>
                    <div className="feature-line">
                        <div className="key">Pair Symbol</div>
                        <div className="value">{tokenSymbol_0} / {tokenSymbol_1}</div>
                    </div>
                    <div className="feature-line">
                        <div className="key">Owner</div>
                        <div className="value">{address.slice(0, 5)}...{address.slice(-3,)}</div>
                    </div>
                </div>
                <div className="card">
                    <div className="title">
                        Lock Records
                    </div>
                    <div className="hr" />
                    <table>
                        <thead>
                            <tr>
                                <th>Amount</th>
                                <th>Lock Time</th>
                                <th>Unlock Time</th>
                                <th>Unlock</th>
                                <th>Extend</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lockData?.lockList?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.amount}</td>
                                    <td>{moment.unix(item.lockTime).format('YYYY-MM-DD HH:mm')}</td>
                                    <td>{moment.unix(item.unlockTime).format('YYYY-MM-DD HH:mm')}</td>
                                    <td>
                                        {
                                            item.isUnlocked
                                                ? "Unlocked"
                                                : <button className="default-btn"
                                                    disabled={item.unlockTime > moment().format('X') || pending}
                                                    onClick={() => unlock(item.lockId)}>
                                                    Unlock
                                                </button>
                                        }
                                    </td>
                                    <td>
                                        {
                                            !item.isUnlocked &&
                                            <button className="default-btn" disabled={pending} onClick={() => openExtendModal(item.lockId, item.amount)}>Extend</button>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal title="Extend Lock" open={isModalOpened} onOk={extend} onCancel={() => setIsModalOpened(false)}>
                <DateTimeInput label="Lock Until" value={unlockTime} setValue={setUnlockTime} />
            </Modal>
        </div>
    )
}

export default LiquidityLockDetail