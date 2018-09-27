// imports for libs..
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3( ganache.provider());
const { interface , bytecode } = require("../compile");



let accounts;
let lottery;


beforeEach( async () => {
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(JSON.parse(interface)).deploy({ data : bytecode}).send({ from : accounts[0], gas : 1000000});
});


describe('Lottery', () =>{
    it('Deploy', ()=>{
        assert.ok(lottery.options.address);
    });
    it('Has Manager', async ()=>{
        const manager = await lottery.methods.manager().call(); 
        assert.ok(manager);
    });
    it('Allow Add Account', async ()=>{
        await lottery.methods.addPlayer().send(
            {
                from : accounts[1],
                gas : 1000000,
                value : web3.utils.toWei('.011','ether')
        });
        
        const player = await lottery.methods.getPlayers().call({
            from : accounts[0]
        });
        
        assert.equal(accounts[1],player);
        
    });
    it('Deny Add Account For Low gas', async ()=>{
        try{
            await lottery.methods.addPlayer().send(
                {
                    from : accounts[2],
                    gas : 1000000,
                    value : web3.utils.toWei('.009','ether')
            });
            assert(false);
        }catch(e){
            assert(e);
        }
    });
    it('Only manager Choose Winnner', async ()=>{
        try{
            await lottery.methods.pickWinner().send({
                from : accounts[1]
            });
            assert(false);
        }catch(err){
            assert(err);
        }
    });
    it('Run Complete Lottery..', async ()=>{
        await lottery.methods.addPlayer().send({
                from : accounts[1],
                gas : 1000000,
                value : web3.utils.toWei('2','ether')
        });
         const initBalance = await web3.eth.getBalance(accounts[1]);
        await lottery.methods.pickWinner().send({
                from : accounts[0]
        });
        const afterWining = await web3.eth.getBalance(accounts[1]);
        
        const diff = afterWining - initBalance;
        assert(diff > web3.utils.toWei('1.8','ether'));
        const players = await lottery.methods.getPlayers().call({ from : accounts[0]});
        assert(players.length == 0);
    });
});
