import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./components/Login/Login";
import Navigation from "./components/Navigation/Navigation";
import PrivateRoute from "./components/PrivateRoute";
import CreateEpisode from "./routes/Podcast Detail/CreateEpisode";
import PodcastDetail from "./routes/Podcast Detail/PodcastDetail";
import CreatePodcast from "./routes/createPodcast/CreatePodcast";
import Podcast from "./routes/podcast/Podcast";
import Profile from "./routes/profile/Profile";
import SignUp from "./routes/signup/SignUp.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      {
        index: true,
        element: <Podcast />,
      },
      {
        path: "podcasts",
        element: <Podcast />,
      },

      {
        path: "podcasts/:id",
        element: <PodcastDetail />,
      },

      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "start-podcast",
            element: <CreatePodcast />,
          },
          {
            path: "podcasts/:id/create-episode",
            element: <CreateEpisode />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
