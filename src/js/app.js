App = {
	web3Provider: null,
	contracts: {},
	account: '0x0',
	hasVoted: false,

	init: function () {
		return App.initWeb3();
	},

	initWeb3: function () {
		// TODO: refactor conditional
		if (typeof web3 !== 'undefined') {
			// If a web3 instance is already provided by Meta Mask.
			App.web3Provider = web3.currentProvider;
			web3 = new Web3(web3.currentProvider);
		} else {
			// Specify default instance if no web3 instance provided
			App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
			web3 = new Web3(App.web3Provider);
		}
		return App.initContract();
	},

	initContract: function () {
		$.getJSON("Election.json", function (election) {
			// Instantiate a new truffle contract from the artifact
			App.contracts.Election = TruffleContract(election);
			// Connect provider to interact with contract
			App.contracts.Election.setProvider(App.web3Provider);
			App.listenForEvents();
			return App.render();
		});
	},

	// Listen for events emitted from the contract
	listenForEvents: function () {
		App.contracts.Election.deployed().then(function (instance) {
			// Restart Chrome if you are unable to receive this event
			// This is a known issue with Metamask
			// https://github.com/MetaMask/metamask-extension/issues/2393
			instance.votedEvent({}, {
				fromBlock: 0,
				toBlock: 'latest'
			}).watch(function (error, event) {
				console.log("event triggered", event)
				// Reload when a new vote is recorded
				App.render();
			});
		});
	},


	// In the render() function,
	// 1st we list out all the candidates standing for the election in the form select
	// 2nd we will handle the form submission whenever the account tries to vote
	// 3rd we want to hide the form once the account vote
	render: function () {
		var electionInstance;
		var loader = $("#loader");
		var content = $("#content");

		loader.show();
		content.hide();

		// Load account data
		web3.eth.getAccounts(function (err, account) {
			if (err === null) {
				App.account = account;
				$("#accountAddress").html("Your Account: " + App.account);
			}
		});

		// Load contract data
		App.contracts.Election.deployed().then(function (instance) {
			electionInstance = instance;
			return electionInstance.candidatesCount();
		}).then(function (candidatesCount) {
			var candidatesResults = $("#candidatesResults");
			candidatesResults.empty();

			var candidatesSelect = $('#candidatesSelect');
			candidatesSelect.empty();

			for (var i = 1; i <= candidatesCount; i++) {
				electionInstance.candidates(i).then(function (candidate) {
					var id = candidate[0];
					var name = candidate[1];
					var voteCount = candidate[2];

					// Render candidate Result
					var candidateTemplate =  "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
					candidatesResults.append(candidateTemplate);

					// Render candidate select option
					var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
					candidatesSelect.append(candidateOption);
				});
			}
			return electionInstance.voters(App.account); // here we access the voters mapping and read the current account to see if they exist in the mapping, if they exist they have already voted which in turn will return a boolean value which is true
		}).then(function (hasVoted) {
			// Do not allow a user to vote
			if (hasVoted) {
				$('form').hide(); // if the bool value is true we will hide the form
			}
			loader.hide();
			content.show();
		}).catch(function (error) {
			console.warn(error);
		});
	},

	// in the below castVote() function,
	// 1st we will ask for the candidateId which we will get to see from #candidatesSelect
	// 2nd we will get instance of the deployed contract with the candidateId we got from select
	// 3rd we will vote with App.account
	// now we will wait till it processes, till then we should hide() the content and show() the loader
	castVote: function() {
		var candidateId = $('#candidatesSelect').val();
		App.contracts.Election.deployed().then(function(instance) {
		return instance.vote(candidateId);
		}).then(function(_result) {
		  // Wait for votes to update
		  $("#content").hide();
		  $("#loader").show();
		}).catch(function(err) {
		  console.error(err);
		});
	  }
	};
	


$(function () {
	$(window).load(function () {
		App.init();
	});
});
