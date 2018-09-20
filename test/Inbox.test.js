// imports for libs..
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const mocha = require('mocha');

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


beforeEach( () => {
  web3.eth.getAccounts().then( accounts => {
    console.log(accounts);
  });
});


describe('Inbox', () =>{
  it('deploy check', ()=>{

  });
});
