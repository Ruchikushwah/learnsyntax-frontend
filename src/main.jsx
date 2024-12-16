import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./Home/Home.jsx";
import Register from "./Auth/Register.jsx";
import Login from "./Auth/Login.jsx";

import AdminLayout from "./Admin/AdminLayout.jsx";
import InsertChapter from "./Admin/InsertChapter.jsx";
import ManageChapter from "./Admin/ManageChapter.jsx";
import InsertCourse from "./Admin/InsertCourse.jsx";
import ManageCourse from "./Admin/ManageCourse.jsx";
import ViewCourse from "./Admin/ViewCourse.jsx";
import ViewChapter from "./Admin/ViewChapter.jsx";
import ManageTopic from "./Admin/ManageTopic.jsx";
import InsertTopic from "./Admin/InsertTopic.jsx";
import Dashboard from "./Admin/Dashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Main Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="managetopic/:chapterId" element={<ManageTopic />} />
        <Route index element={<Dashboard />} />
        <Route path="managetopic/:chapterId" element={<ManageTopic />} />
        <Route path="inserttopic/:chapterId" element={<InsertTopic />} />
        <Route path="insertcourse" element={<InsertCourse />} />
        <Route path="managecourse" element={<ManageCourse />} />
        <Route path="managecourse/:id" element={<ViewCourse />} />
        <Route path="viewchapter/:id" element={<ViewChapter />} />
        <Route path="insertchapter/:id" element={<InsertChapter />} />
        <Route path="managechapter" element={<ManageChapter />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
