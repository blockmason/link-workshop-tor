pragma solidity 0.5.4;

contract Ownership {
	address[8] public ownerOf;

    constructor() public {
    }

	function setOwnership(uint stampId, address owner) public returns (bool) {
        require(stampId >= 0 && stampId <=7);
		ownerOf[stampId] = owner;
        return true;
	}

    function getOwners() public view returns (address[8] memory) {
		return ownerOf;
	}
}