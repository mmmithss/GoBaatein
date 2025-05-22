import React from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CameraIcon,
  CodeIcon,
  Loader2Icon,
  MapPinIcon,
  ShuffleIcon,
} from "lucide-react";

import { LANGUAGES } from "../constants/consts.js";
import { onboarding } from "../lib/api.js";
import toast from "react-hot-toast";
const OnboardingPage = () => {
  const { authUser } = useAuthUser();

  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const queryClient = useQueryClient();

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: onboarding,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Onboarding successful");
    },
    onError: (error) => {
      console.log(error.response.data);
      toast.error(error.response.data.message);
      toast.error(
        "Missing fields :\n" + error.response.data.missingFields.join("\n")
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formData);
  };

  const handleRandomAvatar = () => {
    const randomAvatar = `https://api.dicebear.com/6.x/adventurer/svg?seed=${Math.random()}&flip=true&backgroundType=gradientLinear&featuresProbability=10&hairProbability=95&backgroundColor=c0aede`; // Generate a random avatar URL
    setFormData({ ...formData, profilePic: randomAvatar });
  };

  return (
    <div
      className="min-h-screen bg-base-100 flex items-center justify-center p-4"
      data-theme="dracula"
    >
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* profilePic container */}
            <div className=" flex flex-col items-center justify-center space-y-4">
              {/* image preview */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formData.profilePic ? (
                  <img
                    src={formData.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>
              {/* random image generation button */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-accent"
                >
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>
            {/* form fields */}
            {/* full name */}
            <div className=" form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                name="fullName"
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="input input-bordered w-full"
              />
            </div>
            {/* bio */}
            <div className=" form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="textarea textarea-bordered h-24"
              ></textarea>
            </div>
            {/* languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formData.nativeLanguage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nativeLanguage: e.target.value,
                    })
                  }
                  className="select select-bordered"
                >
                  <option value="">Select your native language </option>
                  {LANGUAGES.map((lang) => (
                    <option
                      key={`native-lang-${lang}`}
                      value={lang.toLowerCase()}
                    >
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={formData.learningLanguage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      learningLanguage: e.target.value,
                    })
                  }
                  className="select select-bordered"
                >
                  <option value="">Select your learning language </option>
                  {LANGUAGES.map((lang) => (
                    <option
                      key={`learning-lang-${lang}`}
                      value={lang.toLowerCase()}
                    >
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className=" form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <label className=" input input-bordered w-full flex items-center gap-2">
                <MapPinIcon className="size-5 opacity-70" />
                <input
                  type="text"
                  value={formData.location}
                  name="location"
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="grow"
                  placeholder="City, Country"
                />
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2Icon className="animate-spin size-4 mr-2" />
                  Loading...
                </>
              ) : (
                <>
                  <CodeIcon className="size-4 mr-2" />
                  Get Onboarded
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
