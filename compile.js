/**
* Solidity Compiler Code....
*/
const path = require('path');
const fs = require('fs');
const solc = require('solc');

//Get to the File to load the source..
const solPath = path.resolve( __dirname, 'contracts', 'Inbox.sol' );
const code = fs.readFileSync(solPath, 'utf8');

// Complie the Solidity file via solc..
// and Export the contract for Inbox
// Contract  to acces the ABI

//console.log(solc.compile(code, 1).contracts[':Inbox']);
module.exports = solc.compile(code, 1).contracts[':Inbox'];
