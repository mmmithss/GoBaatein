import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sendFriendRequest } from "../lib/api";

const useSendFrReqMutation = () => {
  const queryClient = useQueryClient();
  const { mutate: friendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["outgoingFriendRequests"],
      }),
        console.log("Friend request sent and refetched outgoing requests");
    },
    onError: (error) => console.log(error),
  });
  return { friendRequestMutation, isPending };
};

export default useSendFrReqMutation;
