var contractAddr = "0x552da20d6124618dac20220cf80e75e0c8fe9e03";
// var contractAddr = "0x229620b7bb5dd19c5a58b8409d72097931584f08";
var contractABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "submitter",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "proposals",
                "type": "string"
            }
        ],
        "name": "FundsDistributed",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "toVote",
                "type": "address"
            }
        ],
        "name": "castVote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "finalize",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "submitter",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "description",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "ProposalSubmitted",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "description",
                "type": "string"
            },
            {
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "submitProposal",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "balances",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "donationTime",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "funds",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "submitter",
                "type": "address"
            }
        ],
        "name": "getVotes",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "proposals",
        "outputs": [
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "description",
                "type": "string"
            },
            {
                "name": "amount",
                "type": "uint256"
            },
            {
                "name": "submitter",
                "type": "address"
            },
            {
                "name": "votes",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "propsalTime",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalProposals",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]
window.addEventListener("load", async function () {
    if (typeof web3 !== "undefined") {
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log("No web3? You should consider trying MetaMask!");
    }
    var ethAddress = await web3.eth.getCoinbase();
    this.document.getElementById("ethAddress").innerHTML = ethAddress
    console.log(ethAddress)
    var ethBalance = web3.eth.getBalance(ethAddress).then(balance => {
        var balance = web3.utils.fromWei(balance)
        this.document.getElementById("ethBalance").innerHTML = balance
    })
    var ContractInstance = new web3.eth.Contract(contractABI, contractAddr)
    var totalDonations = await ContractInstance.methods.funds().call()
    var propsalTime = await ContractInstance.methods.propsalTime().call()
    var donationTime = await ContractInstance.methods.donationTime().call()
    var yourDonations = await ContractInstance.methods.balances(ethAddress).call()
    var totalProposals = await ContractInstance.methods.totalProposals().call()
    this.document.getElementById("yourDonations").innerHTML = web3.utils.fromWei(yourDonations) + " " + "Ethers"
    this.document.getElementById("TotalDonations").innerHTML = web3.utils.fromWei(totalDonations) + " " + "Ethers"
    this.document.getElementById("TotalProposals").innerHTML = totalProposals

    var countDownDate = new Date(donationTime * 1000).getTime();
    // Update the count down every 1 second
    var x = setInterval(function () {
        // Get todays date and time
        var now = new Date().getTime();
        if (donationTime * 1000 >= new Date().getTime()) {
            countDownDate = new Date(donationTime * 1000).getTime();
            document.getElementById("heading").innerHTML = "Donation Period";
        } else if (propsalTime * 1000 >= new Date().getTime()) {
            countDownDate = new Date(propsalTime * 1000).getTime();
            document.getElementById("heading").innerHTML = "Proposal Period";
        } else {
            document.getElementById("heading").innerHTML = "Finalization Round";
            document.getElementById("Hours").innerHTML = "0";
            document.getElementById("Minutes").innerHTML = "0";
            document.getElementById("Seconds").innerHTML = "0";
            clearInterval(x);
            return;
        }

        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // Output the result in an element with id="demo"
        document.getElementById("Hours").innerHTML = hours;
        document.getElementById("Minutes").innerHTML = minutes;
        document.getElementById("Seconds").innerHTML = seconds;
        // If the count down is over, write some text 
    }, 1000);

})

var staticFunc = async () => {
    var ContractInstance = new web3.eth.Contract(contractABI, web3.utils.toChecksumAddress(contractAddr))

    var ethAddress = await web3.eth.getCoinbase();
    var totalDonations = await ContractInstance.methods.funds().call()
    var propsalTime = await ContractInstance.methods.propsalTime().call()
    var donationTime = await ContractInstance.methods.donationTime().call()
    var yourDonations = await ContractInstance.methods.balances(ethAddress).call()
    var totalProposals = await ContractInstance.methods.totalProposals().call()
    document.getElementById("yourDonations").innerHTML = web3.utils.fromWei(yourDonations) + " " + "Ethers"
    document.getElementById("TotalDonations").innerHTML = web3.utils.fromWei(totalDonations) + " " + "Ethers"
    document.getElementById("TotalProposals").innerHTML = 100
}

var deposit = async () => {
    var ethAddress = await web3.eth.getCoinbase();
    var txCount = await web3.eth.getTransactionCount(ethAddress);
    const txData = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(5000000),
        gasPrice: web3.utils.toHex(10e9), // 10 Gwei
        to: contractAddr,
        from: ethAddress,
        value: "1000000000000000000" || web3.utils.toHex(web3.utils.toWei(amount, 'ether'))
    };

    web3.eth.sendTransaction(txData).then(console.log);

}

var submitProposal = async () => {
    var ContractInstance = new web3.eth.Contract(contractABI, contractAddr);

    var ethAddress = await web3.eth.getCoinbase();
    var txCount = await web3.eth.getTransactionCount(ethAddress);
    const txData = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(5000000),
        gasPrice: web3.utils.toHex(10e9), // 10 Gwei
        to: contractAddr,
        from: ethAddress,
        value: 0x0,
        data: ContractInstance.methods.submitProposal(
                document.getElementById("proposalName").value,
                document.getElementById("proposalDes").value,
                document.getElementById("proposalAmount").value, )
            .encodeABI()
    };

    web3.eth.sendTransaction(txData).then(console.log);
}

var populateData = async () => {
    var ContractInstance = new web3.eth.Contract(contractABI, contractAddr)

    var totalProposals = await ContractInstance.methods.totalProposals().call()
    var data = [];
    for (var a = 0; a < totalProposals; a++) {
        (async (a) => {
            var proposal = await ContractInstance.methods.proposals(a).call()
            data.push(proposal);
        })(a)
        if (a + 1 == totalProposals.length) {
            setTimeout(() => {
                console.log(data);
                console.log(data[0].name);
                console.log(data.length);
                var table = document.getElementById('table');
                for (row = 0; row < data.length; row++) {
                    console.log("data", data[row])
                    console.log("row", row)
                    var rw = table.insertRow(row);
                    var cell1 = rw.insertCell(0);
                    var cell2 = rw.insertCell(1);
                    var cell3 = rw.insertCell(2);

                    cell1.innerHTML = data[row].name;
                    cell2.innerHTML = data[row].submitter;
                    cell3.innerHTML = data[row].votes;
                }

            }, 2000)
        }
    }
}

var upVote  = async (id)=>{
    var ContractInstance = new web3.eth.Contract(contractABI, contractAddr)
    var ethAddress = await web3.eth.getCoinbase();
    var txCount = await web3.eth.getTransactionCount(ethAddress);
    var upVoteId = document.getElementById("upVoteId").value
    const txData = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(5000000),
        gasPrice: web3.utils.toHex(10e9), // 10 Gwei
        to: contractAddr,
        from: ethAddress,
        value: 0x0,
        data: ContractInstance.methods.castVote(upVoteId).encodeABI()
    };

    web3.eth.sendTransaction(txData).then(console.log);
}

var finalize = async () => {
    console.log("asdasd")
    var ContractInstance = new web3.eth.Contract(contractABI, contractAddr)
    var ethAddress = await web3.eth.getCoinbase();
    var txCount = await web3.eth.getTransactionCount(ethAddress);
    const txData = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(5000000),
        gasPrice: web3.utils.toHex(10e9), // 10 Gwei
        to: contractAddr,
        from: ethAddress,
        value: 0x0,
        data: ContractInstance.methods.finalize().encodeABI()
    };

    web3.eth.sendTransaction(txData).then(console.log);
}

setTimeout(() => {
    // finalize();
    populateData()
    
    // staticFunc()
}, 1000)



var buildTx = async function () {
    var ethAddress = await web3.eth.getCoinbase();
    var amount = document.getElementById("donateAmount").value
    web3.eth.getTransactionCount(ethAddress).then(function (txCount) {
        const txData = {
            nonce: web3.utils.toHex(txCount),
            gasLimit: web3.utils.toHex(5000000),
            gasPrice: web3.utils.toHex(10e9), // 10 Gwei
            to: contractAddr,
            from: ethAddress,
            value: web3.utils.toHex(web3.utils.toWei(amount, 'ether'))
        };
        console.log(txData)
        web3.eth.sendTransaction(txData).on('transactionHash', function (hash) {
            console.log("Hash: " + hash);
        }).on('receipt:', function (receipt) {
            console.log("Recepit: " + JSON.stringify(receipt));
        }).on('confirmation', function (confirmationNumber, receipt) {}).on('error:', function (error) {
            console.log("Recepit: " + JSON.stringify(error));
        })
    })
}
// var name = document.getElementById("proposalName").value
// var description = document.getElementById("proposalDes").value
// var amount = document.getElementById("proposalAmount").value
// var data = ContractInstance.methods.submitProposal(name, description, amount).encodeABI()