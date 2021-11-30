import serojs from 'serojs'
import seropp from 'sero-pp'
import BigNumber from 'bignumber.js'
import {Toast} from 'antd-mobile'

const config = {
    name: "UBS Foundation V1.5",
    contractAddress: "UBS_Foundation_V15",
    github: "https://github.com/ubsgame/foundation",
    author: "ubsgame",
    url: document.location.href,
    logo: document.location.protocol + '//' + document.location.host + '/logo.png',
    barColor:"#afe2ff",
    navColor:"#afe2ff",
    barMode:"dark",
    navMode:"light"
}

const abi = [{
    "constant": false,
    "inputs": [{"name": "code", "type": "string"}],
    "name": "invest",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "triggerStaticProfit",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "info",
    "outputs": [{"name": "", "type": "uint256"}, {"name": "", "type": "uint256"}, {
        "name": "",
        "type": "uint256"
    }, {"name": "", "type": "uint256"}, {"name": "", "type": "string"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "addr", "type": "address"}],
    "name": "registerNode",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "reinvestValue", "type": "uint256"}],
    "name": "reinvest",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "code", "type": "string"}],
    "name": "details",
    "outputs": [{"name": "json", "type": "string"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "addrs", "type": "address[]"}],
    "name": "setWithdrawAddrs",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "newOwner", "type": "address"}],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"name": "_marketAddrs", "type": "address[]"}, {"name": "_codeServiceAddr", "type": "address"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "previousOwner", "type": "address"}, {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event"
}];

const caddress = "4pxhiT1cw95CZa7u82SEghwtfRVBiYBJXGrDDAzzWfCRXvMNrseStwuPC5HCXTfpgCguDgKb2ER5Kqin7gBAt1mN";
const contract = serojs.callContract(abi, caddress);


const caddressV2 = "4QtkP8JEMoF96YLCmLahar2LSUttJ2iKh2uNvTp633eCaCXdnrhAxCHmXuuCVtsQbYtaqL3dL6f7VBpPRLC1WZJP";
const abiV2 =[{"constant":false,"inputs":[{"name":"_sender","type":"address"},{"name":"_code","type":"string"}],"name":"investProxy","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_code","type":"string"}],"name":"invest","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_sender","type":"address"}],"name":"getState","outputs":[{"name":"eff","type":"uint256"},{"name":"total","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"setMemberUnitSupply","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getMyState","outputs":[{"name":"eff","type":"uint256"},{"name":"total","type":"uint256"},{"name":"pool","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTotalEff","outputs":[{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_sender","type":"address"}],"name":"solid","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_sender","type":"address"}],"name":"getInvestor","outputs":[{"components":[{"name":"id","type":"uint256"},{"name":"parentId","type":"uint256"},{"name":"value","type":"uint256"},{"name":"returnValue","type":"uint256"},{"name":"totalAynamicReward","type":"uint256"},{"name":"staticReward","type":"uint256"},{"name":"staticTimestamp","type":"uint256"},{"name":"dynamicReward","type":"uint256"},{"name":"dynamicTimestamp","type":"uint256"},{"name":"canWithdrawValue","type":"uint256"},{"name":"values","type":"uint256[]"},{"name":"childsCode","type":"string"},{"name":"withdrawAddrs","type":"address[]"}],"name":"ret","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[],"name":"withdrawDev","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getMemberCount","outputs":[{"name":"ret","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_sender","type":"address"}],"name":"getMarked","outputs":[{"components":[{"name":"enable","type":"bool"},{"name":"occupy","type":"bool"},{"name":"lastEffValue","type":"uint256"}],"name":"ret","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getMember","outputs":[{"name":"ret","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_users","type":"address[]"}],"name":"regists","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"resetMemberStartTime","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_data","type":"bytes"}],"name":"update","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"setDevUnitSupply","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_user","type":"address"}],"name":"unregist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_sender","type":"address"}],"name":"getNewValue","outputs":[{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"memberTotal","outputs":[{"name":"total","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_user","type":"address"}],"name":"regist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_ubs","type":"address"},{"name":"_miner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}];

const contractV2 = serojs.callContract(abiV2, caddressV2);

const caddressV3 = "SQBL1heJavVXycUzPXRFT4T4wa4cLcTg59zUwipdrvXbJX8tMKTYuPpqYWC242VWuePWzppytdxGFvo2nHwQjd7";
const abiV3=[{"constant":true,"inputs":[],"name":"getValues","outputs":[{"name":"ret_start_time","type":"uint256"},{"name":"ret_last_time","type":"uint256"},{"name":"ret_base","type":"uint256"},{"name":"ret_values","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"getState","outputs":[{"name":"free","type":"bool"},{"name":"ori","type":"uint256"},{"name":"eff","type":"uint256"},{"name":"total","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"ori","type":"uint256"}],"name":"ori2value","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"getMyState","outputs":[{"name":"free","type":"bool"},{"name":"ori","type":"uint256"},{"name":"eff","type":"uint256"},{"name":"total","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTotal","outputs":[{"name":"total","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"setFree","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"setMinDeposit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"unsetFree","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"getMarked","outputs":[{"name":"free","type":"bool"},{"name":"ret_last_time","type":"uint256"},{"name":"ret_ori","type":"uint256"},{"name":"ret_eff","type":"uint256"},{"name":"ret_base","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_value","type":"uint256"}],"name":"withdraw_to","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_data","type":"bytes"}],"name":"update","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_addr0","type":"address"},{"name":"_addr1","type":"address"}],"name":"getState2","outputs":[{"name":"ori0","type":"uint256"},{"name":"ori1","type":"uint256"},{"name":"eff0","type":"uint256"},{"name":"eff1","type":"uint256"},{"name":"total","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_fund","type":"address"}],"name":"setFoundation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"changeStart","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"proxyDeposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}];
const contractV3 = serojs.callContract(abiV3, caddressV3);

class Abi {

    constructor() {
        let self = this;
        self.OnInit = new Promise(
            (resolve, reject) => {
                seropp.init(config, function (rest) {
                    if (rest === 'success') {
                        console.log("init success");
                        return resolve()
                    } else {
                        return reject(rest)
                    }
                })
            }
        )
    }

    accountDetails(pk, callback) {
        let self = this;
        seropp.getAccountDetail(pk, function (item) {
            if ("[object Map]" === item.Balance.toString()) {
                callback({pk: item.PK, mainPKr: item.MainPKr, name: item.Name, balance: item.Balance.get("SERO")})
            } else {
                callback({pk: item.PK, mainPKr: item.MainPKr, name: item.Name, balance: item.Balance["SERO"]})
            }
        });
    }

    accountList(callback) {
        seropp.getAccountList(function (data) {
            let accounts = [];
            data.forEach(function (item, index) {
                if ("[object Map]" === item.Balance.toString()) {
                    accounts.push({
                        pk: item.PK,
                        mainPKr: item.MainPKr,
                        name: item.Name,
                        balance: item.Balance.get("SERO")
                    })
                } else {
                    accounts.push({pk: item.PK, mainPKr: item.MainPKr, name: item.Name, balance: item.Balance["SERO"]})
                }
            });
            callback(accounts)
        });
    }

    details(mainPkr, code, callback) {
        this.callMethod('details', mainPkr, [code], function (json) {
            if (!json || json === "0x0") {
                callback({
                    code: "",
                    parentCode: "",
                    value: 0,
                    returnValue: 0,
                    totalAynamicReward: 0,
                    canWithdraw: 0,
                    dynamicReward: 0,
                    staticReward: 0,
                    staticTimestamp: 0,
                    values: [],
                    childsCode: [],
                })
            } else {
                console.log("details", json);
                json = json.replace("\"parentCode\":\"\"\"\",", "");
                callback(JSON.parse(json));
            }
        });
    }

    info(from, callback) {
        this.callMethod('info', from, [], function (vals) {

            if (vals != "0x0") {
                callback({
                    closureTime: vals[0].toNumber(),
                    balance: vals[1],
                    fundAmount: vals[2],
                    investorCount: parseInt(vals[3]),
                    luckyCodes: vals[4].split(" ")
                });
            }

        });
    }

    setWithdrawAddrs(from, mainPKr, addrs, callback) {
        this.executeMethod('setWithdrawAddrs', from, mainPKr, [addrs], 0, callback);
    }

    triggerStaticProfit(from, mainPKr, callback) {
        this.executeMethod('triggerStaticProfit', from, mainPKr, [], 0, callback);
    }

    reinvest(from, mainPKr, value, callback) {
        this.executeMethod('reinvest', from, mainPKr, [value], 0, callback);
    }

    invest(from, mainPKr, value, code, callback) {
        this.executeMethodV2('invest', from, mainPKr, [code], value, callback);
    }

    withdraw(from, mainPKr, callback) {
        this.executeMethod('withdraw', from, mainPKr, [], 0, callback);
    }

    getMyState(from, callback) {
        this.callMethodV2('getMyState', from, [], function (vals) {
            console.log("vals:: ",vals)
            if (vals !== "0x0") {
                callback(vals);
            }
        });
    }

    getMyPosState(from,callback) {
        this.callMethodV3('getMyState', from, [], function (vals) {
            console.log("pos state: ",vals)
            if (vals !== "0x0") {
                callback(vals);
            }
        });
    }
    depositPos(from, mainPKr, value, callback) {
        this.executeMethodV3('deposit', from, mainPKr, [], value, callback);
    }
    withdrawPos(from, mainPKr, value, callback) {
        this.executeMethodV3('withdraw', from, mainPKr, [value], 0, callback);
    }

    callMethod(_method, from, _args, callback) {
        let that = this;
        let packData = contract.packData(_method, _args);
        let callParams = {
            from: from,
            to: caddress,
            data: packData
        }

        seropp.call(callParams, function (callData) {
            if (callData !== "0x") {
                let res = contract.unPackData(_method, callData);
                if (callback) {
                    callback(res);
                }
            } else {
                callback("0x0");
            }
        });
    }

    callMethodV2(_method, from, _args, callback) {
        let packData = contractV2.packData(_method, _args);
        let callParams = {
            from: from,
            to: caddressV2,
            data: packData
        }

        seropp.call(callParams, function (callData) {
            if (callData !== "0x") {
                let res = contractV2.unPackData(_method, callData);
                if (callback) {
                    callback(res);
                }
            } else {
                callback("0x0");
            }
        });
    }

    callMethodV3(_method, from, _args, callback) {
        let packData = contractV3.packData(_method, _args);
        let callParams = {
            from: from,
            to: caddressV3,
            data: packData
        }

        seropp.call(callParams, function (callData) {
            if (callData !== "0x") {
                let res = contractV3.unPackData(_method, callData);
                if (callback) {
                    callback(res);
                }
            } else {
                callback("0x0");
            }
        });
    }

    executeMethod(_method, from, mainPKr, args, value, callback) {
        let that = this;

        let packData = contract.packData(_method, args);
        let executeData = {
            from: from,
            to: caddress,
            value: "0x" + value.toString(16),
            data: packData,
            gasPrice: "0x" + new BigNumber("1000000000").toString(16),
            cy: "SERO",
        };
        let estimateParam = {
            from: mainPKr,
            to: caddress,
            value: "0x" + value.toString(16),
            data: packData,
            gasPrice: "0x" + new BigNumber("1000000000").toString(16),
            cy: "SERO",
        }
        seropp.estimateGas(estimateParam, function (gas, err) {
            if (err) {
                Toast.fail("Unknow Gas Limit")
            } else {
                let gasNum = new BigNumber(gas);
                executeData["gas"] = "0x" + new BigNumber(gasNum.multipliedBy(1.1).toFixed(0)).toString(16);
                console.log("executeData", executeData);

                seropp.executeContract(executeData, function (res) {
                    if (callback) {
                        callback(res)
                    }
                })
            }
        });
    }

    executeMethodV2(_method, from, mainPKr, args, value, callback) {
        let packData = contractV2.packData(_method, args);
        let executeData = {
            from: from,
            to: caddressV2,
            value: "0x" + value.toString(16),
            data: packData,
            gasPrice: "0x" + new BigNumber("1000000000").toString(16),
            cy: "SERO",
        };
        let estimateParam = {
            from: mainPKr,
            to: caddressV2,
            value: "0x" + value.toString(16),
            data: packData,
            gasPrice: "0x" + new BigNumber("1000000000").toString(16),
            cy: "SERO",
        }
        seropp.estimateGas(estimateParam, function (gas, err) {
            if (err) {
                Toast.fail("Unknow Gas Limit")
            } else {
                let gasNum = new BigNumber(gas);
                executeData["gas"] = "0x" + new BigNumber(gasNum.multipliedBy(1.1).toFixed(0)).toString(16);
                console.log("executeData", executeData);

                seropp.executeContract(executeData, function (res) {
                    if (callback) {
                        callback(res)
                    }
                })
            }
        });
    }

    executeMethodV3(_method, from, mainPKr, args, value, callback) {
        let packData = contractV3.packData(_method, args);
        let executeData = {
            from: from,
            to: caddressV3,
            value: "0x" + value.toString(16),
            data: packData,
            gasPrice: "0x" + new BigNumber("1000000000").toString(16),
            cy: "UCON",
        };
        let estimateParam = {
            from: mainPKr,
            to: caddressV3,
            value: "0x" + value.toString(16),
            data: packData,
            gasPrice: "0x" + new BigNumber("1000000000").toString(16),
            cy: "UCON",
        }
        seropp.estimateGas(estimateParam, function (gas, err) {
            if (err) {
                Toast.fail("Unknow Gas Limit")
            } else {
                let gasNum = new BigNumber(gas);
                executeData["gas"] = "0x" + new BigNumber(gasNum.multipliedBy(1.1).toFixed(0)).toString(16);
                console.log("executeData", executeData);

                seropp.executeContract(executeData, function (res) {
                    if (callback) {
                        callback(res)
                    }
                })
            }
        });
    }
}

const alpha = new Abi();
export default alpha;
