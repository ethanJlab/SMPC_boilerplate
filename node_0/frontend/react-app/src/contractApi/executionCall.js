
import axios, * as others from "axios";

export async function callReciever(chain,data){
    let payload = { chain: chain, data: data };
    let request = await axios.post('http://localhost:3030/recieverCall', payload).then(function (result) {
        console.log(result);
        return result;
    });
};

export async function callSender(msg,chain,reciever){
    let payload = { msg: msg, chain: chain, reciever: reciever };
    let request = await axios.post('http://localhost:3030/senderCall', payload).then(function (result) {
        
        console.log(result);
        return result;
    });
};