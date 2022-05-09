/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("dotenv").config();
 require("@nomiclabs/hardhat-ethers");
 require("@nomiclabs/hardhat-etherscan");
 require("@nomiclabs/hardhat-waffle");
 require('hardhat-ethernal');

 
 
 const { 
    REACT_APP_ETHERSCAN_KEY, 
    REACT_APP_ALCHEMY_MAINNET, 
    REACT_APP_ALCHEMY_RINKEBY, 
    REACT_APP_ALCHEMY_GOERLI, 
    REACT_APP_ALCHEMY_KOVAN, 
    REACT_APP_ALCHEMY_ROPSTEN,
    RINKEBY_API_URL,
    PRIVATE_KEY,
    PUBLIC_KEY,
    ETHERSCAN_API_KEY

} = process.env;
 module.exports = {
   solidity: {
     compilers: [
       {
         version: "0.8.0",
         optimizer: {
           enabled: true,
           runs: 200
         }
       },
       {
         version: "0.8.6",
         settings: {
           optimizer: {
             runs: 200,
             enabled: true,
           },
         },
       },
       {
         version: "0.6.0",
         optimizer: {
           enabled: true,
           runs: 200
         }
       },
       {
         version: "0.6.2",
         optimizer: {
           enabled: true,
           runs: 200
         }
       },
       {
         version: "0.7.3",
         optimizer: {
           enabled: true,
           runs: 200
         }
       },
     ],
   },
   defaultNetwork: "hardhat", //"ropsten"
   networks: {
     hardhat: {},
     rinkeby: {
       url: "https://eth-rinkeby.alchemyapi.io/v2/ElybgFn6H7hx1EfEsGvMKsD-psxb2gsy",
       accounts: ['9dff3c1a8413672e07dbaf4c9ef32f9ad251f90057cd1aa87a396f97272626aa'],
       gasMultiplier: 10,
       gas: 5000000,
     },
   },
   etherscan: {
     apiKey: {
       rinkeby: "DXYGH5PDSUKHP5FZQWS6T6FYTCG4U1E7HH",    }
   },
 };