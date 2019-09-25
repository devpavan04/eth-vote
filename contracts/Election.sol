pragma solidity ^0.5.8;

contract Election {

    // Model a candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    // Store accounts that have voted
    mapping(address => bool) public voters;
    // Store candidates
    mapping(uint => Candidate) public candidates;
    // Store candidates count
    uint public candidatesCount; // candidatesCount is now 0

    event votedEvent (
        uint indexed _candidateId
    );

    constructor ( ) public {
        addCandidate("Jimmy Fallon");
        addCandidate("Jimmy Kimmel");
    }

    function addCandidate(string memory _name) private {
        candidatesCount ++; // it will be incremented from 0 to 1
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _candidateId) public {
        // Require that they haven't voted before
        require(!voters[msg.sender], "you have already casted your vote");
        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount, "candidate is not valid");
        // Record the voter has voted
        voters[msg.sender] = true;
        // Update candidate vote count
        candidates[_candidateId].voteCount ++;
        // Trigger voted event
        emit votedEvent(_candidateId);
    }
}