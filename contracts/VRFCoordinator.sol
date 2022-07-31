//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "./interfaces/VRFConsumerBase.sol";
import "./VRF.sol";
import "./interfaces/IVRFCoordinator.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract VRFCoordinator is VRF, IVRFCoordinator {
    ERC20 DuongndToken;
    address public owner;
    uint256 public fee;
    uint256 public threshold;
    /*keccak256(abi.encode(publicKey)) */
    /*oracle */
    mapping(bytes32 => address) public oracles;

    mapping(address => bool) public isConsumer;
    /*consumer */
    /*balance */
    mapping(address => uint256) public balances;
    modifier onlyOwner() {
        require(owner == msg.sender, "VRFCoordinator: have to be owner");
        _;
    }
    /*consumer */
    /*nonce */
    mapping(address => uint256) public nonces;
    mapping(uint256 => Randomness) requestIds;
    struct Randomness {
        uint256 count;
        uint256 randomness;
    }
    event RandomRequested(
        address indexed sender,
        uint256 indexed requestId,
        uint256 preeSeed
    );
    event Transfer(address indexed sender, address indexed to, uint256 amount);
    constructor(
        address duongndToken,
        uint256 _fee,
        uint256 _threshold
    ) {
        owner = msg.sender;
        DuongndToken = ERC20(duongndToken);
        fee = _fee;
        threshold = _threshold;
    }

    function registerOracle(
        address oracle,
        uint256[2] calldata publicProvingKey
    ) external onlyOwner {
        bytes32 kh = hashOfKey(publicProvingKey);
        require(oracles[kh] == address(0), "VRFCoordinator: Oracle exists");
        oracles[kh] = oracle;
    }

    function hashOfKey(uint256[2] memory publicKey)
        public
        pure
        returns (bytes32)
    {
        return keccak256(abi.encode(publicKey));
    }

    function fulfillRandomness(Proof memory proof, address requester) public {
        uint256 randomNumber = VRF.randomValueFromVRFProof(proof, proof.seed);
        uint256 requestId = uint256(keccak256(abi.encode(proof.seed)));
        requestIds[requestId].randomness ^= randomNumber;
        requestIds[requestId].count++;

        if (requestIds[requestId].count == threshold) {
            VRFConsumerBase(requester).rawFulfillRandom(
                requestId,
                requestIds[requestId].randomness
            );
        }
    }

    function requestRandomness() public override returns (uint256) {
        require(
            isConsumer[msg.sender],
            "VRFCoordinator: Consumer does not exists"
        );
        balances[msg.sender] -= fee;

        (uint256 requestId, uint256 preSeed) = computeRequestId(
            nonces[msg.sender]++,
            msg.sender
        );
        emit RandomRequested(msg.sender, requestId, preSeed);
        return requestId;
    }

    function computeRequestId(uint256 nonce, address sender)
        private
        pure
        returns (uint256, uint256)
    {
        uint256 preSeed = uint256(keccak256(abi.encode(nonce, sender)));
        return (uint256(keccak256(abi.encode(preSeed))), preSeed);
    }

    /* ====== IVRFCoordinator ====== */
    function addConsumer(address consumer, uint256 amount) public override {
        require(!isConsumer[consumer], "VRFCoordinator: Consumer exists!");
        DuongndToken.transferFrom(msg.sender, address(this), amount);
        balances[consumer] += amount;
        isConsumer[consumer] = true;
    }

    function removeConsumer(address consumer) public override{
        require(
            isConsumer[consumer],
            "VRFCoordinator: Consumer does not exist"
        );
        isConsumer[consumer] = false;
    }
}
 