# DSC180a_ethstates
DSC180 Final Project - Blockchain Property Platform

## Functional Local TestNet Setup

### Step 0: Entering Enviornment

```sh
cd localtestnet2
```

### Step 1: Installing Dependencies

```sh
npm install
```

### Step 2: HardHat Compilation

```sh
npx hardhat compile
```

### Step 3: Open Ganache LocalTestNet

(ensure port 8545 is open (else change url port in hardhat.config.ts file to port which shows up after running following command))

```sh
npx ganache --wallet.seed 1234
```

### Step 4: Simulating Transaction

In another terminal cd to localtestnet2 folder and run the following command to simulate a blockchain contract

```sh
npx hardhat run scripts/deploy.ts --network ganache
```

### Step 5: Results

One should see both feedback that the contract has been deployed in the second terminal as well as the contract preserved on the testnet in the ganache testnet terminal

## Real Estate Smart Contract Unit Tests

### Prerequisites

To run this project, ensure you have the following dependencies installed:

- **Node.js** (v14 or higher/Check their website)
- **npm**
```sh
npm install
```
- **Hardhat** - Ethereum development environment
- **Ethers.js** - Library to interact with the Ethereum blockchain
```sh
npm install --save-dev hardhat ethers
```
- **OpenZeppelin** - Open source contract library
```sh
npm install @openzeppelin/contracts
```

### Step 0: Entering Environment

```sh
cd real-estate-contract
```

### Step 1: Running/Testing the Code
```sh
npx hardhat test
```

### Step 2: Results
You should be able to see which test cases passed and which ones failed, with error messages and guidance to debug the code

## Frontend Replication

### Step 0: Entering Enviroment

Go back up to the root folder and change directories into the ethstate project inside the frontend folder. Additionally, the starter app has also been hosted live as an alternative to self hosting: https://b17-blockchain-capstone.vercel.app/

```sh
cd frontend/ethstate
```
### Step 1: Installing Dependencies

```sh
npm install
```
### Step 2: Compiling Next.js App

```sh
npm run dev
```
### Step 3: Viewing Live App

The local version of the starter Next.js App should be running on http://localhost:3000
****
