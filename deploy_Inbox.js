const HdTruffleWallet = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HdTruffleWallet(
    'decade wave soup sibling benefit satisfy rule essence seat face vacuum genuine',
    'https://rinkeby.infura.io/v3/19b607fcb6044ec2b1346f60d118c976'    
);

const web3 = new Web3(provider);


const deploy = async ()=> {
    const accounts = await web3.eth.getAccounts();
    console.log(' Deploying contract via account ; ' + accounts[0]);
    const inbox = await new web3.eth.Contract(JSON.parse(interface)).deploy({ data : '0x' + bytecode, arguments : ['Start']}).send({ from : accounts[0], gas : 2000000});
    const address = inbox.options.address;
    console.log('contract deployed on address ' + address);
};



deploy();














