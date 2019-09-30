# Blockchain Voting DAPP :link: :inbox_tray:
This is a Voting DAPP powered by ethereum smart contract.

This DAPP introduces to the very basic understanding of how Smart Contracts work, how they can be deployed on a local blockchain.

## What is a Blockchain?
A blockchain, is a growing list of records, called blocks, that are linked using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data. By design, a blockchain is resistant to modification of the data. 

## What is a Smart Contract?
A smart contract is a computer protocol intended to digitally facilitate, verify, or enforce the negotiation or performance of a contract. Smart contracts allow the performance of credible transactions without third parties. These transactions are trackable and irreversible. 

## What does this DAPP do?
1. There are two candidates who are participating for the election.
2. Voter can vote any one of the candidate through his/her digital wallet i.e [Metamask](https://metamask.io).
3. This application runs on a local blockchain i.e [Ganache](https://www.trufflesuite.com/ganache).
4. Ganache comes bundled with 10 dummy accounts with each having a 100 fake ethers in it already.
5. Ganache is connected to the metamask wallet using **web3.js** library.
6. Voter casts the vote using any one of his 10 accounts from the ganache using the private key(which is not recommended to be used on the real network) of that particular account.
7. Every time a transaction is made i.e voting in this case, a new block is added to the blockchain which contains all the details of the transactions happened from the begining.

# Dependencies
* npm (https://nodejs.org)
* Truffle ( https://github.com/trufflesuite/truffle)
* Ganache (http://truffleframework.com/ganache/)
* Metamask (https://metamask.io/)

# Steps

## 1. Clone the repo
```
    git clone https://github.com/devpavan04/blockchain_election.git

```
## 2. Install dependencies
```
    cd blockchain_election
    npm install
```
### 3. Start Ganache
* Open the Ganache GUI client. This will start our local blockchain instance. 

### 4. Compile, Test and Deploy Election Smart Contract
```
    truffle compile
    truffle test
    truffle migrate --reset
```

### 5. Setup Metamask
* Open metamask extension provided by chrome
* Connect metamask to the local Etherum blockchain provided by Ganache.
* Import an account provided by ganache.

### 6. Run the Front End Application
```
    npm i -g lite-server
    lite-server
```
or
```
    npm run dev
```

# Screenshots

### Start Ganache :point_down:
![open ganache](https://github.com/devpavan04/blockchain_election/blob/master/images/Screenshot%20from%202019-09-29%2003-29-36.png?raw=true )

### Metamask Sign in :point_down:
![meta mask sign in](https://github.com/devpavan04/blockchain_election/blob/master/images/Screenshot%20from%202019-09-29%2003-31-03.png?raw=true)

### Copy account's private key to import new account :point_down:
![copy account's private key to import new account](https://github.com/devpavan04/blockchain_election/blob/master/images/Screenshot%20from%202019-09-29%2003-31-50.png?raw=true)

### Import new account :point_down:
![import new account](https://github.com/devpavan04/blockchain_election/blob/master/images/Screenshot%20from%202019-09-29%2003-32-10.png?raw=true)

### Welcome to the voting page :point_down:
![welcome to voting page](https://github.com/devpavan04/blockchain_election/blob/master/images/Screenshot%20from%202019-09-29%2003-33-08.png?raw=true)

### Confirm transaction to cast the vote :point_down:
![confirm transaction to cast the vote](https://github.com/devpavan04/blockchain_election/blob/master/images/Screenshot%20from%202019-09-29%2003-33-29.png?raw=true)

### Transaction confirmed, vote is updated! :point_down:
![transaction confirmed, vote is updated!](https://github.com/devpavan04/blockchain_election/blob/master/images/Screenshot%20from%202019-09-29%2003-33-37.png?raw=true)

### View all the transaction details and the blocks in ganache :point_down:
![View all the blocks and all the transaction details in ganache](https://github.com/devpavan04/blockchain_election/blob/master/images/Screenshot%20from%202019-09-29%2003-34-36.png?raw=true)
