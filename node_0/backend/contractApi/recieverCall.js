var contractData = require("./contractData");
var express = require('express');
var router = express.Router();
var ethers = require("ethers");
var bodyParser = require('body-parser');

var env = require("dotenv").config();
const envVariables = process.env;
const {
    PRIVATE_KEY,
    PUBLIC_KEY
} = envVariables;

// create application/json parser
var jsonParser = bodyParser.json();

var provider;
var recieverAddress;
var recieverAbi;
var wallet;
var contractInstance;

    router.post('/', jsonParser, async function(req, res, next) {
        // format of requests are
        /*
        {
            "Chain": "id",
            "Data": "0x"
        }
        */
       console.log("body: "+ req.body);
       // checks to make sure the chainID is an integer before

        var chain = (typeof req.body.chain) !== "integer" ? parseInt(req.body.chain) : req.body.chain;
        var data = req.body.data;
        console.log("chain:5 " + chain);
        console.log("data: " + data);

        callReciever(chain,data);

        res.send("Reciever Call Successful");

        async function callReciever(chain,data){
            switch (chain) {
                case contractData.fantomID:
                    callFantomReciever(data);
                    break;
                case contractData.binanceID:
                    callBinanceReciever(data);
                    break;
                case contractData.ethID:
                    callEthReciever(data);
                    break;
                case contractData.polygonID:
                    callPolygonReciever(data);
                    break;
                case contractData.avalancheID:
                    callAvalancheReciever(data);
                    break;
                default:
                    console.log("Invalid Chain ID6");
                    break;
            }
        };


        async function callFantomReciever(data){

            provider = new ethers.providers.JsonRpcProvider(contractData.fantomRPC);
            [recieverAddress,recieverAbi] = contractData.getRecieverContract(contractData.fantomID);
            wallet = new ethers.Wallet(PRIVATE_KEY, provider);
            contractInstance = new ethers.Contract(recieverAddress,recieverAbi,wallet);
            
            //console.log(contractInstance.estimateGas.executeCall(data, { gasLimit: 3000000 }));
        
            contractInstance.executeCall(data, { gasLimit: 6000000 }).then((tx) => {
                console.log(tx);
            });
            
        };

        async function callBinanceReciever(data){    
                
                provider = new ethers.providers.JsonRpcProvider(contractData.binanceRPC);
                [recieverAddress,recieverAbi] = contractData.getRecieverContract(contractData.binanceID);
                wallet = new ethers.Wallet(PRIVATE_KEY, provider);
                contractInstance = new ethers.Contract(recieverAddress,recieverAbi,wallet);
            
                contractInstance.executeCall(data, { gasLimit: 6000000 }).then((tx) => {
                    console.log(tx);
                });
            
            //console.log(await contractInstance.estimateGas.executeCall(data, { gasLimit: 3000000 }));
        };

        async function callEthReciever(data){        
                    
                    provider = new ethers.providers.JsonRpcProvider(contractData.ethRPC);
                    [recieverAddress,recieverAbi] = contractData.getRecieverContract(contractData.ethID);
                    wallet = new ethers.Wallet(PRIVATE_KEY, provider);
                    contractInstance = new ethers.Contract(recieverAddress,recieverAbi,wallet);
                
                contractInstance.executeCall(data, { gasLimit: 6000000 }).then((tx) => {
                    console.log(tx);
                });
        };

        async function callPolygonReciever(data){
                
                provider = new ethers.providers.JsonRpcProvider(contractData.polygonRPC);
                [recieverAddress,recieverAbi] = contractData.getRecieverContract(contractData.polygonID);
                wallet = new ethers.Wallet(PRIVATE_KEY, provider);
                contractInstance = new ethers.Contract(recieverAddress,recieverAbi,wallet);
            
                contractInstance.executeCall(data, { gasLimit: 6000000 }).then((tx) => {
                    console.log(tx);
                });
        };

        async function callAvalancheReciever(data){
                    
                    provider = new ethers.providers.JsonRpcProvider(contractData.avalancheRPC);
                    [recieverAddress,recieverAbi] = contractData.getRecieverContract(contractData.avalancheID);
                    wallet = new ethers.Wallet(PRIVATE_KEY, provider);
                    contractInstance = new ethers.Contract(recieverAddress,recieverAbi,wallet);
                
                    contractInstance.executeCall(data, { gasLimit: 6000000 }).then((tx) => {
                        console.log(tx);
                    });
        };

    });

module.exports = router;