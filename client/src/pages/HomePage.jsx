import React, { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  getMyFriends,
  getOutgoingFriendRequests,
  getRecommendedUsers,
} from "../lib/api";
import { Link } from "react-router";
import { User2Icon } from "lucide-react";
import NoFriends from "../components/NoFriends";
import Friend from "../components/FriendCard";
import NoReccUser from "../components/NoReccUser";
import ReccUserCard from "../components/ReccUserCard";

const HomePage = () => {
  const [outgoingRequestIDs, setOutgoingRequestIDs] = useState(new Set()); //t

  const { data } = useQuery({
    queryKey: ["outgoingFriendRequests"],
    queryFn: getOutgoingFriendRequests,
  });

  const sentFriendRequest = data?.ongoingRequests;

  console.log("sent friend request", sentFriendRequest);

  const { data: friends, isLoading: friendsLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getMyFriends,
  });

  const { data: recommendedUsers, isLoading: recommendedUsersLoading } =
    useQuery({
      queryKey: ["recommended-users"],
      queryFn: getRecommendedUsers,
    });

  useEffect(() => {
    //These are the ids i have already sent a request to , the map returns an array which is made into a set
    const alreadySentIDs_set = new Set();
    if (sentFriendRequest && sentFriendRequest.length > 0) {
      sentFriendRequest?.forEach((request) => {
        alreadySentIDs_set.add(request.recipient._id);
      });
    }
    setOutgoingRequestIDs(alreadySentIDs_set);
    console.log("Updated set", alreadySentIDs_set);
  }, [sentFriendRequest]); // everytime outgoingFriendRequests changes, update the sendRequestIDs

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className=" text-2xl sm:text-3xl font-bold tracking-tight">
            Friends
          </h2>
          <Link to="/notification" className=" btn btn-outline btn-sm">
            <User2Icon className=" size-4 mr-2" />
            Friend Requests
          </Link>
        </div>
        {friendsLoading ? (
          <div className="py-20 flex items-center justify-center">
            <span className=" loading loading-spinner loading-lg "></span>
          </div>
        ) : friends?.length === 0 ? (
          <NoFriends />
        ) : (
          // friend list
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <Friend key={friend._id} friend={friend} />
            ))}
          </div>
        )}
        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Meet New Learners
                </h2>
                <p className="opacity-70">
                  Discover perfect language exchange partners based on your
                  profile
                </p>
              </div>
            </div>
            {recommendedUsersLoading ? (
              <div className="py-20 flex items-center justify-center">
                <span className=" loading loading-spinner loading-lg "></span>
              </div>
            ) : recommendedUsers?.length === 0 ? (
              <NoReccUser />
            ) : (
              // recommended users list
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 gap-4">
                {recommendedUsers.map((user) => {
                  const requestSent = outgoingRequestIDs.has(user._id);

                  return (
                    <ReccUserCard
                      key={user._id}
                      user={user}
                      requestSent={requestSent}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
