import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./components/Login/Login";
import Navigation from "./components/Navigation/Navigation";
import PrivateRoute from "./components/PrivateRoute";
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
        path:"podcasts",
        element: <Podcast />,
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
        ],
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.user.user);
  console.log("selector app", selector);
  //  signOutUser();
  //useEffect(() => {
  //   const unsubscribe = authChangeEventListener(async (user) => {
  //     if (user) {
  //       const userDoc =  getAuthUserDoc(user);

  //         const userData = await userDoc.data();
  //         console.log('userData',userData)
  //         dispatch(
  //           userAction.setUser({
  //             email: userData.email,
  //             displayName: userData.displayName,
  //           })
  //         );

  //     }
  //   });

  //   return unsubscribe;
  // }, []);

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
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
