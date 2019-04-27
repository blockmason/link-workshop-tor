# Overall workshop flow

1. Introduce web3.js (both the current release and the beta 1.00), running a local blockchain with Ganache, getting and sending ETH between accounts locally on the server side, getting ETH balance from a mainnet account using Infura.

2. Create a very basic DApp with a front-end to send ETH between accounts using MetaMask. This activity uses boilerplate HTML/JS/CSS code to get participants familiar with the front-end code structure. 

3. As a take-home stretch exercise, do Activity 2b to learn how to build, sign and broadcast a transaction to the Ropsten account from scratch. This is useful if developing without MetaMask to sign transactions. Introduce `Buffer`, nonces, and `ethereumjs-tx` library. 
   
4. In Activity 3, participants are introduced to Smart Contracts. We use Solidity, Remix and Link to create and deploy an `Ownership` contract to the Link private network. 

5. In Activity 3b, participants will create their very own ERC-20 standard cryptocurrency and deploy it to the public Ropsten network using Link's API wizard.
   
6. Then, in Activity 4, participants create the front-end of the Collectible Stamps App, and in particular, write-out the `markOwned()` and `handleOwnership()` functions.

7. Then, in Activity 4b, participants will incorporate their custom ERC-20 token from 3b into the Collectible Stamps App as an ownership payment token in the `transferPayment()` function. Together, Activities 4 and 4b make up the bulk of the workshop.

8. Finally in Activity 5, (time dependent) participants will go about creating a similar Collectible Stamps App 'the hard way' using the Truffle blockchain development framework. Participants will interact with both a local and the Ropsten public blockchains. 


By the end of the workshop, participants will:
* Be familiar with some of the common blockchain development tools in the marketplace today
* Be able to make transactions on the private Link and public Ethereum blockchain
* Learn about Smart Contract design and how to address some common security flaws. 
* Create, deploy and interact with a smart contract, both locally and on the public testnet
* Create and interact with a custom ERC-20 standard token
* Create a web app that interacts with mutliple blockchains using Blockmason Link
* Replicate creating a similar web app using a single blockchain (Ethereum Ropsten) with the Truffle development platform (if time permits)

## Workshop Timing
* 10-10:30am    - Intros, Setup
* 10:30-11am    - Activity 1
* 11-12pm       - Activity 2
* 12-12:30pm    - Lunch, Intro to Activity 3
* 12:30-2pm     - Activity 3 & 3b
* 2pm - 2:15    - Break
* 2:15pm-3:45pm - Activity 4 & 4b
* 3:45-4pm      - Wrap up
