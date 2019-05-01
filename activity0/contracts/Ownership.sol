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