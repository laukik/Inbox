// imports for libs..
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');



const { interface , bytecode } = require("../compile");

// attach the the provider to web3
// for local it is ganache...
const web3 = new Web3( ganache.provider());

/**********************************************************
* Before Each :: Deploy Contrcat
* it :: manipulate Contract
* it :: Assertion..
***********************************************************/

// ganache local network create dummy accounts
// which can be accessed by the web3..


let accounts;
let inbox;

beforeEach( async () => {
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(JSON.parse(interface)).deploy({ data : bytecode, arguments : ['Start']}).send({ from : accounts[0], gas : 1000000});
});


describe('Inbox', () =>{
  it('deploy check', ()=>{
    assert.ok(inbox.options.address);
  });
  
  
  it('has default msg', async ()=>{
    const message = await inbox.methods.message().call(); 
    assert.equal(message, 'Start', 'Working');
    
  });
  
  it('can update msg', async ()=> {
    
    const hash = await inbox.methods.setMessage("Alpha").send({ from : accounts[0]});
    const message = await inbox.methods.message().call(); 
    assert.equal(message, 'Alpha', 'Working');
    
  });
  
  
});
