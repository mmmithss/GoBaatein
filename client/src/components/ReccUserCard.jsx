import { CheckCircle2Icon, MapPinIcon, UserPlus2Icon } from "lucide-react";
import React from "react";
import { capitalizeFirstLetter, getLanguageToFlag } from "../lib/utils";
import useSendFrReqMutation from "../hooks/useSendFrReqMutation";

const ReccUserCard = ({ user, requestSent }) => {
  const { friendRequestMutation, isPending } = useSendFrReqMutation();
  return (
    <div className="card bg-base-200 hover:shadow-lg transition-all duration-300">
      <div className="card-body p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="avatar size-16 rounded-full overflow-hidden">
            <img src={user.profilePic} alt={user.fullName} />
          </div>

          <div>
            <h3 className="font-semibold text-lg">{user.fullName}</h3>
            {user.location && (
              <div className="flex items-center mt-1 opacity-65 text-xs">
                <MapPinIcon className=" size-3 mr-1" />
                {user.location}
              </div>
            )}
          </div>
        </div>
        {/* languages with flag */}
        <div className=" flex flex-wrap gap-1.5">
          <span className=" badge badge-secondary ">
            {getLanguageToFlag(user.nativeLanguage)}
            Native: {capitalizeFirstLetter(user.nativeLanguage)}
          </span>
          <span className=" badge badge-outline ">
            {getLanguageToFlag(user.learningLanguage)}
            Learning: {capitalizeFirstLetter(user.learningLanguage)}
          </span>
        </div>
        {user.bio && <p className="text-sm opacity-70">{user.bio}</p>}

        <button
          className={`btn w-full ${
            requestSent || isPending ? "btn-disabled" : "btn-primary"
          }`}
          onClick={() => friendRequestMutation(user._id)}
          disabled={requestSent || isPending}
        >
          {requestSent ? (
            <>
              <CheckCircle2Icon className=" size-4 mr-2" /> Request Sent
            </>
          ) : (
            <>
              <UserPlus2Icon className=" size-4 mr-2" /> Send Friend Request
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReccUserCard;
