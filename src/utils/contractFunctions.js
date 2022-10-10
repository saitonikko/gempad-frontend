import Web3 from "web3";
import erc20ABI from "../contracts/erc20-abi.json";
import presaleFactory from "../contracts/presale-factory.json";

const web3 = new Web3(window.ethereum);

// export const getDvdContract = async (isConnected) => {
//     if(!isConnected) return;
//     const _dvdContract = await _getContract(contracts.Dvd);
//     return _dvdContract;
// }

export const isAddress = (address) => {
    return web3.utils.isAddress(address)
}

const _getContract = async (address, abi) => {
    const _contract = await new web3.eth.Contract(abi, address);
    return _contract;
}

export const getERC20Contract = async (address) => {
    const contract = await _getContract(address, erc20ABI);
    return contract;
};

export const getPresaleFactoryContract = async () => {
    const contract = await _getContract(presaleFactory.address, presaleFactory.abi);
    return contract;
}

