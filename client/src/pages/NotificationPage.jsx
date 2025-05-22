import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getNotifications } from "../lib/api";
import { BellRingIcon, UserCheck2Icon } from "lucide-react";
import FriendRequestCard from "../components/FriendRequestCard";
import AcceptedRequestsCard from "../components/AcceptedRequestsCard";
import NoNotifications from "../components/NoNotifications";

const NotificationPage = () => {
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });
  console.log(notifications?.acceptedFriendRequests);
  console.log(notifications?.friendRequests);
  const incomingRequests = notifications?.friendRequests;
  const acceptedRequests = notifications?.acceptedFriendRequests;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Notifications
        </h1>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner "></span>
          </div>
        ) : (
          <div className="space-y-8">
            {incomingRequests?.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <UserCheck2Icon className="h-5 w-5 text-primary" />
                  Friend Requests
                  <span className="badge badge-primary ml-2">
                    {incomingRequests.length}
                  </span>
                </h2>
                <div className=" space-y-2">
                  {incomingRequests.map((request) => (
                    <FriendRequestCard
                      key={request._id}
                      sender={request.sender}
                      feReqID={request._id}
                    />
                  ))}
                </div>
              </section>
            )}
            {acceptedRequests?.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BellRingIcon className="h-5 w-5 text-success" />
                  Friend Requests Accepted
                  <span className="badge badge-primary ml-2">
                    {acceptedRequests.length}
                  </span>
                </h2>
                <div className=" space-y-2">
                  {acceptedRequests.map((request) => (
                    <AcceptedRequestsCard
                      key={request._id}
                      user={request.recipient}
                    />
                  ))}
                </div>
              </section>
            )}
            {incomingRequests?.length === 0 &&
              acceptedRequests?.length === 0 && <NoNotifications />}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
