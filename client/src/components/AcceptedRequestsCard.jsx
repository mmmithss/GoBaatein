import React from "react";

const AcceptedRequestsCard = ({ user }) => {
  return (
    <div className="card bg-base-200">
      <div className="card-body p-3">
        <div className="flex items-center gap-4">
          <div className="avatar size-14 rounded-full overflow-hidden">
            <img src={user.profilePic} alt={user.fullName} />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold truncate">{user.fullName}</h3>
            <span className="text-xs opacity-75">
              {user.fullName} accepted your friend request
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptedRequestsCard;
