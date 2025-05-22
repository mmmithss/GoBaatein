import { Routes, Route, Navigate } from "react-router";

import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import VideoCallPage from "./pages/VideoCallPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";

import { Toaster } from "react-hot-toast";
import useAuthUser from "./hooks/useAuthUser.jsx";
import PageLoading from "./components/PageLoading.jsx";
import Layout from "./components/Layout.jsx";
import { useStoreForTheme } from "./store/useStore.js";

const App = () => {
  const { theme } = useStoreForTheme();

  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboard;

  const ProtectRoute = ({ children }) => {
    if (!isAuthenticated) return <Navigate to="/login" />;
    if (!isOnboarded) return <Navigate to="/onboarding" />;
    return children;
  };

  if (isLoading) return <PageLoading />;

  return (
    <div data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoute>
              <Layout showSidebar>
                <HomePage />
              </Layout>
            </ProtectRoute>
          }
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : !isOnboarded ? (
              <Navigate to="/onboarding" />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/notification"
          element={
            <ProtectRoute>
              <Layout showSidebar>
                <NotificationPage />
              </Layout>
            </ProtectRoute>
          }
        />
        <Route
          path="/chat/:id"
          element={
            <ProtectRoute>
              <Layout>
                <ChatPage />
              </Layout>
            </ProtectRoute>
          }
        />
        <Route
          path="/video-call/:id"
          element={
            <ProtectRoute>
              <VideoCallPage />
            </ProtectRoute>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
