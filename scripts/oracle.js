const utils = require('../utils/getLog.js');
const artifact = require('../artifacts/contracts/VRFCoordinator.sol/VRFCoordinator.json');

const handleLogs = (log) =>{
    console.log(log);
}
async function main(){
    let eventSig =  utils.getEventTopic(artifact.abi, 'RandomRequested');
    console.log(eventSig);
    addressEmitLog = '0xD5B56BF4c24C0CFB10dCD42F3312eB09a7B4B6A4';
    utils.onEvent(eventSig,handleLogs,addressEmitLog);
}
main();