module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    // develop: {
    //   port: 8545
    // }
  },
  // solc: {
  //   optimizer: {
  //     enabled: true,
  //     version: "0.5.16",
  //     runs: 200
  //   }
  // },
  compilers: {
    solc: {
      version: "^0.5.0"
    }
  },
};