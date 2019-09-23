pragma solidity ^0.5.8;

contract Election {

    // Model a candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    // Store candidates
    mapping(uint => Candidate) public candidates;
    // Fetch candidate
    // Store candidates count
    uint public candidatesCount; // candidatesCount is now 0

    constructor ( ) public {
        addCandidate("Jimmy Fallon");
        addCandidate("Jimmy Kimmel");
    }

    function addCandidate(string memory _name) private {
        candidatesCount ++; // it will be incremented from 0 to 1
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
}