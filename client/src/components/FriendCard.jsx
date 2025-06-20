import React from "react";
import { Link } from "react-router";
import { getLanguageToFlag } from "../lib/utils";

const Friend = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className=" card-body p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className=" avatar size-12 rounded-full overflow-hidden">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>
        <div className=" flex flex-wrap gap-2 mb-3 justify-between ">
          <span className=" badge badge-secondary text-xs">
            {getLanguageToFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className=" badge badge-outline text-xs">
            {getLanguageToFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>
        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};

export default Friend;
