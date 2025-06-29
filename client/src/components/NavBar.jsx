import { BellIcon, CodeIcon, LogOutIcon } from "lucide-react";
import { Link } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { logout } from "../lib/api";
import ThemeSelector from "./ThemeSelector";

const NavBar = ({ showSidebar }) => {
  const { authUser } = useAuthUser();

  const querryClient = useQueryClient();
  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: (responseData) => {
      querryClient.invalidateQueries({ queryKey: ["authUser"] });

      toast.success(responseData.message);
    },
  });

  return (
    <div className="bg-base-200 border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {!showSidebar && (
            <div className=" pl-5">
              <Link to="/" className=" flex items-center gap-2.5">
                <CodeIcon className=" size-9 text-primary " />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                  GoBaatein
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notification"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>
          <ThemeSelector />

          <div className="avatar mr-1">
            <Link to={"/profile"}>
              <div className="w-9 rounded-full overflow-hidden">
                <img
                  src={authUser?.profilePic}
                  alt="User Avatar"
                  rel="noreferrer"
                />
              </div>
            </Link>
          </div>

          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
