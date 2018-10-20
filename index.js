
import Web3 from 'web3'

var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
console.log(web3)
// var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/uhyGfBKKeV2k11JDkoQM"));
    // console.log(web3)


    
    // function signAddress() {

    //   var privateKey = "197FD29D796662593A427B9642D39F965D75AA4B67FB7A8CB5A62B16BBDB6423"
    //   var publicAddress = "0x20d73ef8ebf344b2930d242da5dec79d9dd9a92a"
    //   var contractAddress = "0x602454de8fFFAE1aD6BDcD58F2A6e98f92bC63EC"
    //   var contractABI = []
    // }