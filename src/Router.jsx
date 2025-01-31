import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Authentication from "./Components/UserAuthentication/Authentication";
import Register from "./Components/UserAuthentication/Register";
import Login from "./Components/UserAuthentication/Login";
import Layout from "./Components/Layout";
import DashMovie from "./Components/DashNav";
import DashTheater from "./Components/Theaters/DashTheater";
import MovieList from "./Components/Movies/MovieList";
import MovieInfo from "./Components/Movies/MovieInfo";
import TheaterInfo from "./Components/Theaters/TheaterInfo";
import Screen from "./Components/Seats/Screen";
import PrePayment from "./Components/Payment/PrePayment";
import Success from "./Components/Payment/Success";
import Error from "./Components/Payment/Error";
import Ticket from "./Components/Tickets/Ticket";
import MyTicket from "./Components/Tickets/MyTicket";
import Upcoming from "./Components/Tickets/Upcoming";
import History from "./Components/Tickets/History";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Authentication />,
        children: [
          {
            path: "/",
            element: <Login />,
          },
        ],
      },
      {
        path: "auth",
        element: <Authentication />,
        children: [
          {
            path: "signup",
            element: <Register />,
          },
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
      {
        path: "dash",
        element: <Layout />,
        children: [
          {
            path: "movies",
            element: <DashMovie />,
            children: [
              {
                path: "movieList",
                element: <MovieList />,
              },
              {
                path: "theaterList",
                element: <DashTheater />,
              },
            ],
          },
          {
            path: "my-tickets",
            element: <MyTicket />,
            children: [
              {
                path: "upcoming",
                element: <Upcoming />,
              },
              {
                path: "history",
                element: <History />,
              },
            ],
          },

          {
            path: "movie/:movieid",
            element: <MovieInfo />,
            children: [],
          },
          {
            path: "theater/:theaterid",
            element: <TheaterInfo />,
            children: [],
          },
        ],
      },
      {
        path: "screen/:showTimeId",
        element: <Screen />,
        children: [],
      },
      {
        path: "tickets",
        children: [
          {
            path: "pre-payment",
            element: <PrePayment />,
          },

          {
            path: "show-ticket",
            element: <Ticket />,
          },
        ],
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path: "error",
        element: <Error />,
      },
    ],
  },
]);

export default Router;
