import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteAccount } from "../lib/api";

const DeleteUserBtn = ({ userFullName }) => {
  const [fullName, setFullName] = useState("");
  const isMatch = fullName.trim() === userFullName.trim();

  const queryClient = useQueryClient();

  const { mutate: deleteMutation, isPending } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast.success("Account deleted");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-error"
        type="button"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Delete Account
      </button>
      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">
            Please enter your full name to confirm
          </h3>
          <div className="space-y-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <button
              className="btn btn-error w-full"
              type="button"
              disabled={!isMatch}
              onClick={() => deleteMutation()}
            >
              {isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteUserBtn;
