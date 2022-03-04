//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Comments {
    // exposed data structure
   struct Comment {
       uint32 id;
       string topic;
       address creator_address;
       string message;
       uint256 created_at;
   }
//    Notify user that a comment was added
    event commentAdded(Comment comment);

uint32 private idCounter;
// Datastructure to store our comments
mapping(string => Comment[]) private commentsByTopic;

//  Fetch a list of comments of a topic
function getComments(string calldata topic) public view returns(Comment[] memory) {
    return commentsByTopic[topic];
}
//  Persist a new comment
function addComment(string calldata topic, string calldata message) public {
    Comment memory comment = Comment({
        id: idCounter,
        topic: topic,
        creator_address: msg.sender,
        message: message,
        created_at: block.timestamp
    });
    commentsByTopic[topic].push(comment);
    idCounter++;
    emit commentAdded(comment);
}
}