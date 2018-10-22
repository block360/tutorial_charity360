pragma solidity ^0.4.25;

contract Charity360 {
    
  /**@dev mapping field below is equivalent to an associative array or hash.
  The key of the mapping is donator address as type address and value is
  an unsigned integer to store the amount donated
  */    
  mapping (address => uint256) public balances;
  
  
  /* structure to store Proposal data against a submitter
  */  
  struct Proposal {
        string name;
        string description;
        uint256 amount;
        address submitter;
        uint256 votes;
    }
    
  /**@dev Proposal struct array 
  */ 
  Proposal[] public proposals;
  
  
  /**@dev mapping to store index of proposal submissions against a user
   * this index helps to fetch proposal data without loops
   */
  mapping (address => uint256) private submissions;
  
  /**@dev mapping to blacklist a voter to avoid multiple votes cast
  */
  mapping (address => bool) private voters;
  
  
  /**@dev donationTime period for charity. now means current tiem
  */
  uint256 public donationTime = now + 1 hours;
  
  /**@dev propsalTime period for charity.
  */
  uint256 public propsalTime = donationTime + 1 hours;
  
  
  /**@dev event emitted whenever a new Proposal is submitted.
  */
  event ProposalSubmitted(address submitter, string name, string description, uint256 amount);
  
  /**@dev event emitted on trasfer of funds to win Proposal.
  */
  event FundsDistributed(address indexed submitter, string proposals);
  
  /**@dev fallback function to accept direct ethers in contract.
  */
  function() public payable {
      require(donationTime >= block.timestamp);
      balances[msg.sender] = msg.value;
  }
  
  /**@dev function to handle submittedProposals.
   * block.timestamp gives current time in unix timestamp
   * msg.sender is the one who initiated the transaction
   * this.balance returns the total amount of ethers in contract
  */
  function submitProposal (string name, string description, uint256 amount) public {
    require(block.timestamp >= donationTime);
    require(propsalTime >= block.timestamp);
    require(submissions[msg.sender] == 0);
    require(amount <= this.balance);
    
    submissions[msg.sender] = proposals.length;
    
    //adding data to proposal array
    proposals.push(Proposal(name,description,amount,msg.sender,0));
    
    //emitting an event
    emit ProposalSubmitted(msg.sender, name, description, amount);
  }
  
  /**@dev Function to get current balance of contract. 
   * i.e the donations made to charity
   * visibility modifier is "external" indicating its only be called outisde the contract
  */
  function funds () view external returns (uint256){
      return this.balance;
  }
  
  /**@dev function to cast a vote against a Proposal.
  */
  function castVote(address toVote) external {
    require(balances[msg.sender] > 0);
    require(voters[msg.sender] == false);
    
    voters[msg.sender] = true;
    proposals[submissions[toVote]].votes += 1;  
  }
  
  /**@dev function to get count of votes for a Proposal.
  */
  function getVotes(address submitter) view external returns(uint256){
    return proposals[ submissions[submitter] ].votes;
  }
  
  /**@dev function to get count of total Proposals submitted.
  */
  function totalProposals() view external returns(uint256){
    return proposals.length;
  }
  
  /**@dev finalize function to indetify the winner proposal and forward funds.
  */
  function finalize() external {
    require(block.timestamp > propsalTime);
    uint256 winningVoteCount = 0;
    uint256 index = 0;
    for (uint8 prop = 0; prop < proposals.length; prop++){
      if (proposals[prop].votes > winningVoteCount) {
        winningVoteCount = proposals[prop].votes;
        index = prop;
      }  
    }
    uint256 amount = proposals[index].amount;
    address _submitter = proposals[index].submitter;
    string _proposals = proposals[index].description;
    
    //solidity transfer function to transfer ethers 
    proposals[index].submitter.transfer(amount);
    emit FundsDistributed(_submitter, _proposals);
  }
}