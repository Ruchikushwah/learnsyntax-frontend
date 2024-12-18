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
import Setting from "./Admin/Setting.jsx";
import ViewPost from "./Admin/ViewPost.jsx";


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

       
        <Route index element={<Dashboard />} />
      
        <Route path="/admin/managecourse/:id/:course_slug/:chapterId/:chapter_slug/managetopic" element={<ManageTopic />} />
        <Route path="/admin/inserttopic/:chapterId" element={<InsertTopic />} />

        <Route path="/admin/insertcourse" element={<InsertCourse />} />
        <Route path="/admin/managecourse" element={<ManageCourse />} />
        <Route path="/admin/managecourse/:id/:course_slug" element={<ViewCourse />} />
        <Route path="/admin/viewchapter/:id" element={<ViewChapter/>}/>
        <Route
          path="/admin/insertchapter/:id"
          element={<InsertChapter />}
        />
        <Route path="/admin/managechapter" element={<ManageChapter />} />
        <Route path="/admin/setting" element={<Setting/>}/>

        {/* route for the posts */}
        {/* <Route path="/admin/viewpost/:topic_id" element={<ViewPost/>} /> */}
        {/* to={`/admin/managecourse/${id}/${course_slug}/${selectedChapter.id}/${selectedChapter.chapter_name}/viewpost/${topic.id}/${topic.topic_name}`} */}
        <Route path="/admin/managecourse/:id/:course_slug/:chapter_id/:chapter_slug/viewpost/:topic_id/:topic_slug" element={<ViewPost/>} />


      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
