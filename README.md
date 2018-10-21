# tutorial-dapp-charity360


A tutorial dapp for demonstrating a charity use case where proposals are made by individuals and based on them, people decide to donate on one.

## How to Deploy Contract
1. Verify your metamask is unlocked and connected to RINKEBY testnet 
2. OPEN Remix IDE goto run tab insure Environment is set to INJECTED WEB3
3. Paste the charity360.sol code into IDE

### Configure Contract
1. Edit line 39 donationTime i.e the time period for donation submission   
3. Edit line 43 propsalTime i.e the time period for propsal submission
3. Compile contract
4. deploy the contract
5. Metamaks popup will open click on confirm
6. wait for your transaction to be done and click on rinkeby link
7. at rinkeby.etherscan copy your contract address [Contract 0x552da20d6124618dac20220cf80e75e0c8fe9e03 Created]  

### Configure Dapp
1. open /Dapp/index.js
2. edit line 1, paste your contract address (var contractAddr = "0x552da20d6124618dac20220cf80e75e0c8fe9e03");
3. Don't make anyother changes.

### Deploy Dapp
1. you must have xammp, wamp or any other local server
2. host your app accoring to your server
3. run the dapp

You'll see your dapp opens and the contdown timer will be running.

## In case of any issues fell free to ask on BLOCK360 slack community channel
https://goo.gl/2fCeNQ
