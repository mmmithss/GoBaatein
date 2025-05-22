import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { login } from "../lib/api";
import { CodeIcon, CodeSquare, KeyRoundIcon, MailIcon } from "lucide-react";
import { Link } from "react-router";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const {
    mutate: loginMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    onError: (error) => console.log(error.response.data.message),
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="dracula"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* login form left side  */}
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
          {/* login form */}
          <div className="w-full ">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                {/* some  login form heading details */}
                <div>
                  <h2 className="text-2xl font-semibold">
                    Log in to your account 😊
                  </h2>
                  <p className="text-sm opacity-30">
                    Welcome back, Lets GO continue your language learning
                    adventure
                  </p>
                </div>
                {/* login elements */}
                <div className="space-y-3">
                  {/* email */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">E-mail</span>
                    </label>
                    <label className="input input-bordered input-secondary flex items-center gap-2">
                      <MailIcon className="h-4 w-4 opacity-70" />
                      <input
                        className="grow"
                        type="text"
                        placeholder="johndoe@example.com"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({ ...loginData, email: e.target.value })
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
                      <KeyRoundIcon className="size-4 opacity-70" />
                      <input
                        className="grow"
                        type="password"
                        placeholder="******"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                      />
                    </label>
                    <p className="text-sm opacity-50">
                      Password must be at least 6 characters
                    </p>
                  </div>
                </div>
                {/* login button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn btn-primary w-full"
                >
                  {isPending ? (
                    <>
                      <span className=" loading loading-ring"></span>
                      Loading...
                    </>
                  ) : (
                    <>
                      <CodeSquare className="size-4" />
                      Log in
                    </>
                  )}
                </button>
                <div className=" text-center mt-4">
                  <p className="text-sm">
                    Don't have an account?{" "}
                    <span className=" hover:underline text-primary">
                      <Link to="/signup">Signup</Link>
                    </span>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* login form right side  */}
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

export default LoginPage;
