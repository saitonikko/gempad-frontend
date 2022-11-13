import Web3 from "web3";
import erc20ABI from "../contracts/erc20-abi.json";
import lpABI from "../contracts/lp-abi.json";
import presaleFactory from "../contracts/presale-factory.json";
import lock from "../contracts/lock.json";
import airdrop from "../contracts/airdrop.json";
import tokenFactory from "../contracts/token_factory.json";

const web3 = new Web3(window.ethereum);

export const isAddress = (address) => {
    return web3.utils.isAddress(address)
}

const _getContract = async (address, abi) => {
    const _contract = await new web3.eth.Contract(abi, address);
    return _contract;
}

export const getBalanceEth = async (address) => {
    const _balance = await web3.eth.getBalance(address);
    return _balance;
}

export const getERC20Contract = async (address) => {
    const contract = await _getContract(address, erc20ABI);
    return contract;
};

export const getLpContract = async (address) => {
    const contract = await _getContract(address, lpABI);
    return contract;
};

export const getPresaleFactoryContract = async () => {
    const contract = await _getContract(presaleFactory.address, presaleFactory.abi);
    return contract;
}

export const getLockContract = async () => {
    const contract = await _getContract(lock.address, lock.abi);
    return contract;
}

export const getAirdropContract = async () => {
    const contract = await _getContract(airdrop.address, airdrop.abi);
    return contract;
}

export const getTokenFactoryContract = async () => {
    const contract = await _getContract(tokenFactory.address, tokenFactory.abi);
    return contract;
}