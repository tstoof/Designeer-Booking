import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import { About } from "./pages/about";
import { Layout } from "./layouts/layout";
import  AvailabilityPage from "./pages/AvailabilityPage"
import BookingPage from "./pages/BookingPage";

export const Browserrouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/availability",
        element: <AvailabilityPage />
      },
      {
        path: "/booking",
        element: <BookingPage />
      },
      {
        path: "*",
        element: <Navigate to="/" replace />
      }
    ]
  }
])