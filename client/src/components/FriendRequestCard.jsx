import { UserCheck2Icon } from "lucide-react";
import { capitalizeFirstLetter } from "../lib/utils";
import { useMutation } from "@tanstack/react-query";
import { acceptFriendRequest } from "../lib/api";
import { useState } from "react";

const FriendRequestCard = ({ sender, feReqID }) => {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const { mutate: acceptRequest, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      setBtnDisabled(true);
    },
    onError: (error) => console.log(error),
  });
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="avatar size-14 rounded-full overflow-hidden">
              <img src={sender.profilePic} alt={sender.fullName} />
            </div>
            <div>
              <h3 className="font-semibold truncate mb-1">{sender.fullName}</h3>

              <div className="flex flex-wrap gap-2">
                <span className="badge badge-primary badge-sm">
                  {capitalizeFirstLetter(sender.nativeLanguage)}
                </span>
                <span className="badge badge-outline badge-sm">
                  {capitalizeFirstLetter(sender.learningLanguage)}
                </span>
              </div>
            </div>
          </div>
          {/* disable button once clicked */}
          <button
            className={`btn btn-sm ${
              btnDisabled ? " btn-disabled" : "btn-secondary "
            }`}
            onClick={() => {
              acceptRequest(feReqID);
            }}
          >
            {btnDisabled ? (
              <>Accepted</>
            ) : isPending ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <UserCheck2Icon className="h-4 w-4" />
                Accept
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestCard;
