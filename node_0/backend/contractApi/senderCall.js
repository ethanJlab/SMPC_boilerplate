var contractData = require("./contractData");
var express = require('express');
var router = express.Router();
var ethers = require("ethers");
var bodyParser = require('body-parser')

var env = require("dotenv").config();
const envVariables = process.env;
const {
    PRIVATE_KEY,
    PUBLIC_KEY
} = envVariables;


// create application/json parser
var jsonParser = bodyParser.json();

var provider;
var senderAddress;
var senderAbi;
var wallet;
var contractInstance;

    router.post('/', jsonParser, async function(req, res, next) {
        // format of requests are
        /*
        {
            "msg": "0x",
            "chain": "id",
            "reciever": "0x"
        }
        */
       console.log(req.body)
       // checks to make sure the chainID is an integer before

        var chain = (typeof req.body.chain) !== "integer" ? parseInt(req.body.chain) : req.body.chain;
        var msg = req.body.msg;
        var reciever = req.body.reciever;
        console.log("chain: " + chain);
        console.log("data: " + msg);
        console.log("reciever: " + reciever);

        callSender(msg,chain,reciever);

        res.send("Sender Call Successful");

        async function callSender(msg,chain, reciever){
            switch (chain) {
                case contractData.fantomID:
                    callFantomSender(msg,reciever);
                    break;
                case contractData.binanceID:
                    callBinanceSender(msg,reciever);
                    break;
                case contractData.ethID:
                    callEthSender(msg,reciever);
                    break;
                default:
                    console.log("Invalid Chain ID");
                    break;
            }
        };

        async function callFantomSender(msg,reciever){
            provider = new ethers.providers.JsonRpcProvider(contractData.fantomRPC);
            [senderAddress,senderAbi] = contractData.getSenderContract(contractData.fantomID);
            wallet = new ethers.Wallet(PRIVATE_KEY, provider);
            contractInstance = new ethers.Contract(senderAddress,senderAbi,wallet);

            var tx = await contractInstance.sendMsg(msg,contractData.fantomID ,reciever);
            console.log(tx);
        };

        async function callBinanceSender(msg,reciever){
            provider = new ethers.providers.JsonRpcProvider(contractData.binanceRPC);
            [senderAddress,senderAbi] = contractData.getSenderContract(contractData.binanceID);
            console.log(senderAddress);
            wallet = new ethers.Wallet(PRIVATE_KEY, provider);
            contractInstance = new ethers.Contract(senderAddress,senderAbi,wallet);

            var tx = await contractInstance.sendMsg(msg, contractData.binanceID, reciever);
            console.log(tx);
        };

        async function callEthSender(msg,reciever){
            provider = new ethers.providers.JsonRpcProvider(contractData.ethRPC);
            [senderAddress,senderAbi] = contractData.getSenderContract(contractData.ethID);
            wallet = new ethers.Wallet(PRIVATE_KEY, provider);
            contractInstance = new ethers.Contract(senderAddress,senderAbi,wallet);

            var tx = await contractInstance.sendMsg(msg,contractData.ethID,reciever);
            console.log(tx);
        };

    });

module.exports = router;