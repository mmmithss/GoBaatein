import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currUserId = req.user.id;
    const currUser = req.user;

    //dont wanna include and my friends
    const reccUsers = await User.find({
      $and: [
        {
          _id: {
            $nin: [
              currUserId, ...currUser.friends
            ]
          }
        }, {
          isOnboard: true
        }
      ]
    });
    res.status(200).json(reccUsers);
  } catch (error) {
    console.error("Erron in get recommeded user controller", error);
    res.status(500).json({message: "Internal server error"});
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id).select("friends").populate("friends", "fullName profilePic nativeLanguage learningLanguage");

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in gt my friends controller", error);
    res.status(500).json({message: "Internal Server Error"});
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const {id: recipientId} = req.params;

    //prevent sending request to ypurself
    if (myId === recipientId) {
      return res.status(400).json({message: "You cannot send request to yourself"});
    }

    const recipient = await User.findById(recipientId);

    if (!recipient) {
      return res.status(404).json({message: "Recipient not found"});
    }

    //if already friends
    if (recipient.friends.includes(myId)) {
      return res.status(400).json({message: "You are already friends with this user"});
    }

    // if req is already sent
    const existingRequest = await FriendRequest.findOne({
      $or: [
        {
          sender: myId,
          recipient: recipientId
        }, {
          sender: recipientId,
          recipient: myId
        }
      ]
    });

    if (existingRequest) {
      return res.status(400).json({message: "A friend request already exists between you and this user"});
    }

    //finally create a friend request
    const friendRequest = await FriendRequest.create({sender: myId, recipient: recipientId, status: "pending"});

    res.status(201).json(friendRequest);
  } catch (error) {
    console.error("Error in send friend request controller", error);
    res.status(500).json({message: "Internal Server Error"});
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const {id: requestId} = req.params;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(400).json({message: "Friend Request not found"});
    }

    if (friendRequest.recipient.toString() !== req.user.id.toString()) {
      return res.status(403).json({message: "You are not authorized to aaccess this request"});
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: {
        friends: friendRequest.recipient
      }
    });
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: {
        friends: friendRequest.sender
      }
    });

    res.status(200).json({message: "Friend request accepted"});
  } catch (error) {
    console.log("Error in Accept Friend Request controller", error.message);
    res.status(500).json({message: "Internal Server Error"});
  }
}

export async function getFriendRequests(req, res) {
  try {
    const friendRequests = await FriendRequest.find({recipient: req.user.id, status: "pending"}).populate("sender", "fullName nativeLanguage profilePic learningLanguage");

    const acceptedFriendRequests = await FriendRequest.find({sender: req.user.id, status: "accepted"}).populate("recipient", "fullName profilePic");

    res.status(200).json({friendRequests, acceptedFriendRequests});
  } catch (error) {
    console.log("Error in get Friend Requests controller", error);
    res.status(500).json({message: "Internal Server Error"});
  }
}

export async function getOngoingFriendRequests(req, res) {
  try {
    const ongoingRequests = await FriendRequest.find({sender: req.user.id, status: "pending"}).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

    res.status(200).json({ongoingRequests});
  } catch (error) {
    console.log("Error in get Ongoing Friend Requests ", error);
    res.status(500).json({message: "Internal Server Error"});
  }
}