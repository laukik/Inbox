pragma solidity ^0.4.17;

contract Lottery{

  address public manager;
  
  address[] public players;

  function Lottery() public {
    manager = msg.sender;
  }
  
  function init() private{
    players = new address[](0);  
  }
  
  function addPlayer() public payable {
    require( msg.value > .01 ether);
    players.push(msg.sender); 
  }
  
  function getPlayers() public view returns (address[]){
    return players ;
  }
  
  function pickWinner() public managerM {
    address winner = players[random() % players.length];
    winner.transfer(this.balance);
    init();
  }
  
  function random() private view returns (uint){
    return uint(keccak256(block.difficulty, now, players)) ;
  }

  modifier managerM(){
      require( manager == msg.sender);
      _;
  }

}
