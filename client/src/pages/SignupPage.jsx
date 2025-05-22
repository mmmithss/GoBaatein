import { CircleUserRound, CodeIcon, KeyRound, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { signup } from "../lib/api.js";

const SignupPage = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const {
    mutate: signupMutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutate(user);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="dracula"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* signup form left side  */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* logo */}
          <div className="mb-4 flex items-center justify-start gap-4">
            <CodeIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              GoBaataein
            </span>
          </div>
          {/* error message when occured */}
          {error && (
            <div className="alert alert-error">
              <span>{error.response.data.message}</span>
            </div>
          )}
          {/* form */}
          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                {/* some  signup form heading details */}
                <div>
                  <h2 className="text-2xl font-semibold">
                    Create an Account Sweety 😊
                  </h2>
                  <p className="text-sm opacity-30">
                    Lets GO and start out language learning adventure
                  </p>
                </div>
                {/* signup elements */}
                <div className="space-y-3">
                  {/* fullname */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <label className="input input-bordered input-secondary flex items-center gap-2">
                      <CircleUserRound className="size-4 opacity-70" />
                      <input
                        className="grow"
                        type="text"
                        placeholder="John Doe"
                        value={user.fullName}
                        onChange={(e) =>
                          setUser({ ...user, fullName: e.target.value })
                        }
                      />
                    </label>
                  </div>
                  {/* email */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">E-mail</span>
                    </label>
                    <label className="input input-bordered input-secondary flex items-center gap-2">
                      <Mail className="h-4 w-4 opacity-70" />
                      <input
                        className="grow"
                        type="text"
                        placeholder="johndoe@example.com"
                        value={user.email}
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                      />
                    </label>
                  </div>
                  {/* password */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <label className="input input-bordered input-secondary flex items-center gap-2">
                      <KeyRound className="size-4 opacity-70" />
                      <input
                        className="grow"
                        type="password"
                        placeholder="******"
                        value={user.password}
                        onChange={(e) =>
                          setUser({ ...user, password: e.target.value })
                        }
                      />
                    </label>
                    <p className="text-sm opacity-50">
                      Password must be at least 6 characters
                    </p>
                  </div>
                  {/* terms and conditions */}
                  <div className="form-control">
                    <label className=" cursor-pointer justify-start gap-2 label">
                      <input
                        type="checkbox"
                        className=" checkbox checkbox-primary checkbox-xs"
                        required
                      />
                      <span className="text-xs leading-tight">
                        I accept the{" "}
                        <span className=" hover:underline text-primary">
                          terms of services
                        </span>{" "}
                        and{" "}
                        <span className=" hover:underline text-primary ">
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                {/* signup button */}
                <button className="btn btn-primary w-full" type="submit">
                  {isPending ? (
                    <>
                      <span className=" loading loading-ring"></span>
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
                <div className=" text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <span className=" hover:underline text-primary">
                      <Link to="/login">Login</Link>
                    </span>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/*right side picture and details , aesthetics */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/signup.png"
                alt="Language connection illustration"
                className="w-full h-full"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
