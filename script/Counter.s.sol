// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/WINToken.sol";

contract DeployWINTokenScript is Script {
    function run() public {
        vm.startBroadcast();
        WINToken token = new WINToken();
        vm.stopBroadcast();

        // Log the deployed address to the console.
        console.log("WINToken deployed at:", address(token));
    }
}
