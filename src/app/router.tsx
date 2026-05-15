// import { createBrowserRouter, Navigate } from "react-router-dom";
// import App from "../App";
// import { NotFound } from "../pages/Errors/NotFound";
// import { SecondPage } from "../pages/page-2/page-2";
// import { FirstPage } from "../pages/page-1/page-1";
// import { ThirdPage } from "../pages/page-3/page-3";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     // element: <AppLayout />,
//     element: <App />,
//     errorElement: <NotFound />,
//     children: [
//       { index: true, element: <Navigate to="/page-1" replace /> },
//       { path: "page-1", element: <FirstPage /> },
//       { path: "page-2", element: <SecondPage /> },
//       { path: "page-3", element: <ThirdPage /> },
//     ],
//     // children: [
//     //   { index: true, element: <HomePage /> },
//     //   { path: "login", element: <LoginPage /> },

//     //   {
//     //     path: "student",
//     //     element: <StudentLayout />,
//     //     children: [
//     //       { index: true, element: <Navigate to={"tests"} /> },
//     //       { path: `tests`, element: <StudentTestPage /> },
//     //       { path: `test/:id`, element: <StudentRunTest /> },
//     //       { path: `profile`, element: <StudentProfilePage /> },
//     //       { path: `statistics`, element: <StudentStatsPage /> },
//     //       {
//     //         path: `test/:id/result`,
//     //         element: <StudentTestResultPage/>,
//     //       },
//     //     ],
//     //   },

//     //   {
//     //     path: "admin",
//     //     element: <AdminLayout />,
//     //     children: [
//     //       { index: true, element: <AdminPage /> },
//     //       { path: `profile`, element: <h2>Admin profile</h2> },
//     //       { path: `settings`, element: <h2>Admin settings</h2> },
//     //     ],
//     //   },
//     // ],
//   },
// ]);
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import { NotFound } from "../pages/Errors/NotFound";
import { FirstPage } from "../pages/page-1/page-1";
import { MyLoginForm } from "../pages/Login/FormPage";
import { SelectInterestPage } from "../pages/SelectInterestPage";
import UserProfile from "../pages/Profile/ProfilePage";
import { EventPage } from "../pages/Events/EventPage";
import SignUpEventsPage from "../pages/page-3/page-3";
import ChatPage from "../pages/chat/ChatPage";
import CreateEventForm from "../pages/CreateEvent/CreateEventForm";
import { NotificationsPage } from "../components/Notification/NotificationsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <MyLoginForm /> },
      // { index: true, element: <Navigate to="/page-1" replace /> },
      { path: "page-1", element: <FirstPage /> },
      { path: "page-1/:id", element: <EventPage /> },
      { path: "home", element: <Navigate to="/page-1" replace /> },
      { path: "add", element: <CreateEventForm /> },
      { path: "events", element: <SignUpEventsPage /> },
      { path: "SelectInterestPage", element: <SelectInterestPage /> },
      { path: "Profile", element: <UserProfile /> },
      { path: "chats", element: <ChatPage /> },
      { path: "notifications", element: <NotificationsPage /> },
      // { path: "chats", element: <ThirdPage /> },
    ],
  },
]);
