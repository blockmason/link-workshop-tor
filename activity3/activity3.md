# Introduction to Smart Contracts and Blockmason Link
## Goal
In this activity, we will learn about Smart Contract design and use Link to deploy smart contracts and their create their corresponding APIs. 

## Exercise
This activity will require you to:
* Use Solidity (https://solidity.readthedocs.io/en/v0.5.7/) to create a basic 'Ownership' smart contract
* Use Remix (https://remix.ethereum.org) to test and validate the smart contract
* Use Link (https://mason.link) to interact with the smart contract on the Link private network

## General activity notes
* It is expected workshop participants have some familiarity with Solidity. This workshop will primarily cover 'types' of Solidity objects (https://solidity.readthedocs.io/en/v0.5.7/types.html)
* A dedicate `getOwners()` function is used instead of the automated getter that comes with the public declaration of the array variable `ownerOf` because the latter requires an array index to be passed to return a single value whereas the former will return the entire array.
* The Link private network is Link's own internal blockchain.

### Setup
> Ensure you have registered for a Link account at https://mason.link (email required)


### Smart Contract Design
* The types of Solidity objects, in particular:
  * `uint`, `string`, `address` & `address payable`, `msg.sender`
  * Mapping vs. Array
  * Struts
  * `public` keyword and getters
* `require` keyword
* `memory` vs `storage`
* Security Considerations
  * Private information and randomness
  * Re-entrancy
  * Checks-Effects-Interactions pattern
  * Underflows / Overflows
  * Take compiler warnings seriously!
* Use of an 'authority' to sign off on transactions
* Events (https://solidity.readthedocs.io/en/v0.5.7/contracts.html#events)

### Create 'Ownership' Smart Contract
> Copy the following smart contract code into the Remix browser IDE for this part of the exericse.

The skeleton of the Ownership contract is:
```
pragma solidity ^0.5.7;

contract Ownership {
	// Add some state variables

    constructor() public {
        // Default constructor
    }

    function setOwnership(uint stampId, address owner) public {
        // Set ownership
    }

    function getOwners() public view returns (address[8] memory) {
        // Return owners array
    }
}
```

First, we want to access the list of owners for a type of asset, say collectible stamps. The array index will refer to the asset identifier and the value will be the owner's wallet address. For this example, assume only 8 assets will be owned. 

> Add the public `ownerOf` state variable and return it in the `getOwners()` function.
```
pragma solidity ^0.5.7;

contract Ownership {
    address[8] public ownerOf;

    constructor() public {
        // Default constructor
    }

    function setOwnership(<pass some arguments here>) public {
        // Set ownership
        return true;
    }

    function getOwners() public view returns (address[8] memory) {
	return ownerOf;
    }
}
```
Note - the `address[8]` defines an array of length 8 of type `address`. The `public` keyword makes it externally accessible through an automatically created getter. However, one cannot retrieve the entire array at once but rather must pass an index value to retrieve a single value (e.g. call `ownerOf(1)`). 

To get around this getter limitation, we create a `getOwners()` function and specify the return value to be of type `address[8]`. This allows us to return the entire `ownerOf` array. 

> Next, let's complete the `setOwnership(...)` function. We want to assign a particular stamp ID to an owner address. Additionally, we want to check that the stamp ID is within the array size limits. 
```
function setOwnership(uint stampId, address owner) public {
        require(stampId >= 0 && stampId <=7);
        ownerOf[stampId] = owner;
    }
```

> Then, we want to set an 'authority' address that initially creates the smart contract and also calls and executes the smart contract functions. For testing in this exercise, we also want to make this authority address publicly available.
```
pragma solidity ^0.5.7;

contract Ownership {
    address[8] public ownerOf;
    address public authority;

    constructor() public {
        authority = msg.sender;
    }

    function setOwnership(uint stampId, address owner) public {
        require(msg.sender == authority);
        require(stampId >= 0 && stampId <=7);
        ownerOf[stampId] = owner;
    }

    function getOwners() public view returns (address[8] memory) {
        return ownerOf;
    }
}
```
Lastly, we want to add an **event emitter** to the `setOwnership` function so that we are told when ownership has been set. Refer to https://solidity.readthedocs.io/en/v0.5.7/contracts.html#events for more details on events.

> Create an `Owned` event object attribute of the Ownership contract that takes in the assetId and ownership address. Emit this event at the end of the `setOwnership` function. 
```
pragma solidity ^0.5.7;

contract Ownership {
    address[8] public ownerOf;
    address public authority;
    event Owned(
        uint indexed _assetId,
        address indexed _owner
    );

    constructor() public {
        authority = msg.sender;
    }

    function setOwnership(uint stampId, address owner) public {
        require(msg.sender == authority);
        require(stampId >= 0 && stampId <=7);
        ownerOf[stampId] = owner;
        emit Owned(stampId, owner);
    }

    function getOwners() public view returns (address[8] memory) {
        return ownerOf;
    }
}
```

> Check that you can compile this contract in Remix without errors. 
> 
_TODO:_ Update image once Remix working again![Remix IDE](images/remix_ide.png)

### Using Link
> Log into Link at https://mason.link and setup a sample organization if you haven't done so already.

When first logging into Link, you are presented with a `Demo` smart contract that is **automatically deployed** to the Link private network.

 ![Link Demo UI](images/link_demo.png)

The Link Code IDE is in-sync with the API tab where you can see the corresponding API endpoints generated from the smart contract:

![Link Demo API UI](images/link_demo_api.png)

The `Client ID` and `Client Secret` shown at the bottom of the screen are used to obtain a auth token used when making the API request. **Note: these values change when changing the display name or making any changes to the contract code** We will get into more details on using the client ID and secret later.

#### Interact with the Demo Code
_TODO:_ Update process here once `yarn add @blockmason/link-sdk` added.


#### Deploy Ownership contract to Link Private Network and Create APIs
We're now going to deploy our Ownership smart contract to a blockchain using Link. **This is incredibly easy!**

> Copy and paste the `Ownership` contract Solidity code into the Link code IDE and update the project name to `OwnershipLink` 

![Link Ownership Code](images/link_ownership_code.png)

Automatically, your API endpoints will update based on the new smart contract functions. Your `Client ID` and `Client Secret` will also update.

![Link Ownership APIs](images/link_ownership_apis.png)

**That's it!** Behind the scenes, Link:
- Automatically compiles and deploys your smart contract to the Link private blockchain
- Generates the new API endpoints, and updates the API UI with those endpoints ready to be used. 

In the last workshop activity, we will see what manual steps are typically required to deploy a smart contract to a blockchain.

#### Interact with the Ownership contract API endpoints
Similar to how we interacted with the `Demo` contract API above, let's use the console to test a few of the API endpoints before we build out our app in the next activity.

> Try out the `GET /getOwners` endpoint in the console which should return an array of `0x000...` addresses since no owners are currently assigned:
```
> let { owners } = await link({ clientId: '<your-client-id>', clientSecret: '<your-client-secret>' }).get('/getOwners');

> owners
(8) ["0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000"]
```

Also, let's check out the authority of the smart contract. Recall that the the contract authority is set in the contract constructor with:
```
constructor() public {
    authority = msg.sender;
}
```
With `msg.sender` being Link. You can find the default account/address used by Link under the `Ethereum Accounts` menu item as shown in the following image:

![Ethereum Accounts](images/ethereum_accounts.png)

> To get our authority account from the console:
```
> let { authority } = await link({ clientId: '<your-client-id>', clientSecret: '<your-client-secret>' }).get('/authority');

> authority
"0x0b1e03386671185139db90eea81b13da31e22b50"
```
which matches our Link Ethereum default account!

**Congrats! You have successfully deployed the Ownership contract to the Link private network and setup the Link APIs which we'll use in our Collectible Stamps App in the next activity!**
 