import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<AdminLayout />}>
      <Route path="/admin/insertchapter" element={<InsertChapter/>}/>
      <Route path="/admin/managechapter" element={<ManageChapter/>}/>
      
      
      
      <Route path="/admin/insertcourse" element={<InsertCourse/>}/>
      <Route path="/admin/managecourse" element={<ManageCourse/>}/>

      </Route>
      
      
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
