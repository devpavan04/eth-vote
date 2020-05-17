var Election = artifacts.require("./Election.sol");

contract("Election", function (accounts) {

  var electionInstance;

  describe("deployment", async () => {
    it('initializes with 2 candidates', async () => {
      election = await Election.deployed()
      count = await election.candidatesCount()
      assert.equal(count.toNumber(), 2)
    });

    it("it initializes the candidates with the correct values", function () {
      return Election.deployed().then(function (instance) {
        electionInstance = instance;
        return electionInstance.candidates(1);
      }).then(function (candidate) {
        assert.equal(candidate[0], 1);
        assert.equal(candidate[1], "Candidate 1");
        assert.equal(candidate[2], 0);
        return electionInstance.candidates(2);
      }).then(function (candidate) {
        assert.equal(candidate[0], 2);
        assert.equal(candidate[1], "Candidate 2");
        assert.equal(candidate[2], 0);
      });
    });

    it("allows a voter to cast a vote", function () {
      return Election.deployed().then(function (instance) {
        electionInstance = instance;
        candidateId = 1;
        return electionInstance.vote(candidateId, { from: accounts[0] });
      }).then(function (receipt) {
        assert.equal(receipt.logs.length, 1);
        assert.equal(receipt.logs[0].event, "votedEvent");
        assert.equal(receipt.logs[0].args._candidateId.toNumber(), candidateId);
        return electionInstance.voters(accounts[0]);
      }).then(function (voted) {
        assert(voted, "the voter was marked as voted");
        return electionInstance.candidates(candidateId);
      }).then(function (candidate) {
        var voteCount = candidate[2];
        assert.equal(voteCount, 1);
      })
    });

    // first we get instance of our deployed contranct
    // then assign this instance to electionInstance variable
    // we will vote one time for candidate 99(which is invalid, coz we have only 2 candidates) from account 1
    // we can check for error with assert.fail inside of this promise chain and we will catch this error
    // and then inject it into the callback function
    // once we are in the callback function we can inspect the error message and check if there is a revert in it
    // we will ensure the state of our contract is unaltered whenever this require function is called
    // now we will fetch the first candidate and ensure the vote count did not change
    // candidate vote count should be 1 since we vote for him once in the above above test
    // we also want to ensure that candidate 2's vote count is unaltered and his vote count should be 0
    // since we haven't casted a vote for him yet
    it("throws an exception for invalid candiates", function () {
      return Election.deployed().then(function (instance) {
        electionInstance = instance;
        return electionInstance.vote(99, { from: accounts[1] })
      }).then(assert.fail).catch(function (error) {
        assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
        return electionInstance.candidates(1);
      }).then(function (candidate1) {
        var voteCount = candidate1[2];
        assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
        return electionInstance.candidates(2);
      }).then(function (candidate2) {
        var voteCount = candidate2[2];
        assert.equal(voteCount, 0, "candidate 2 did not receive any votes");
      });
    });

    // first we get instance of our deployed contranct
    // then assign this instance to electionInstance variable
    // let the candidateId be 2 this time since we haven't voted for him
    // we vote him once from account[1]
    // now we check if this candidate (candidate2) has accepted our vote for the first time when we voted for him
    // then we will try to vote again for the same candidate(2) from the same account(1)
    // we can check for error with assert.fail inside of this promise chain and we will catch this error
    // and then inject it into the callback function
    // we will ensure that both the candidate's vote count is unaltered
    // now candidate1's vote count should be 1
    // and also candidate2's vote count should be 1
    it("throws an exception for double voting", function () {
      return Election.deployed().then(function (instance) {
        electionInstance = instance;
        candidateId = 2;
        electionInstance.vote(candidateId, { from: accounts[1] });
        return electionInstance.candidates(candidateId);
      }).then(function (candidate) {
        var voteCount = candidate[2];
        assert.equal(voteCount, 1, "accepts first vote");
        // Try to vote again
        return electionInstance.vote(candidateId, { from: accounts[1] });
      }).then(assert.fail).catch(function (error) {
        assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
        return electionInstance.candidates(1);
      }).then(function (candidate1) {
        var voteCount = candidate1[2];
        assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
        return electionInstance.candidates(2);
      }).then(function (candidate2) {
        var voteCount = candidate2[2];
        assert.equal(voteCount, 1, "candidate 2 did not receive any votes");
      });
    });
  });

})