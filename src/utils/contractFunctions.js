import Web3 from "web3";
import contracts from "../contracts/contracts.json";

const web3 = new Web3(window.ethereum);

export const getDvdContract = async (isConnected) => {
    if(!isConnected) return;
    const _dvdContract = await _getContract(contracts.Dvd);
    return _dvdContract;
}

const _getContract = async ({address, abi}) => {
    const _contract = await new web3.eth.Contract(abi, address);
    return _contract;
}