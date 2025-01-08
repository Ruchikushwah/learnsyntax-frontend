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
import Home from "./User/Home.jsx";
import Register from "./Auth/Register.jsx";
import Login from "./Auth/Login.jsx";
import AdminLayout from "./Admin/AdminLayout.jsx";
import InsertChapter from "./Admin/InsertChapter.jsx";
import InsertCourse from "./Admin/InsertCourse.jsx";

import ViewCourse from "./Admin/ViewCourse.jsx";
import ViewChapter from "./Admin/ViewChapter.jsx";
import ManageTopic from "./Admin/ManageTopic.jsx";
import InsertTopic from "./Admin/InsertTopic.jsx";
import Dashboard from "./Admin/Dashboard.jsx";
import Setting from "./Admin/Setting.jsx";
import ViewPost from "./Admin/ViewPost.jsx";
import CourseEdit from "./Admin/CourseEdit.jsx";
import SingleViewPage from "./User/SingleViewPage.jsx";
import TopicEdit from "./Admin/TopicEdit.jsx";
import ContactForm from "./User/Home_components/ContatctForm.jsx";
import AllContents from "./User/AllContents.jsx";
import InsertPost from "./Admin/InsertPost.jsx";
import ChapterEdit from "./Admin/Chapteredit.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PostEdit from "./Admin/PostEdit/PostEdit.jsx";

import OnlineCompiler from "./OnlineCompiler.jsx";

import AuthLayout from "./Auth/AuthLayout.jsx";
import ProtectedAdmin from "./utils/ProtectedAdmin.jsx";

import ManageCourse from "./Admin/ManageCourse.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Main Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="contact" element={<ContactForm />} />
        {/* User Routes */}
        <Route
          path="/singleviewpage/:courseId/:course_slug"
          element={<SingleViewPage />}
        />
        <Route
          path="/:id/:course_slug/:chapterId/:chapter_slug/:topicId/:topic_slug"
          element={<AllContents />}
        />
      </Route>
      <Route path="/" element={<AuthLayout />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedAdmin />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="/admin/managecourse/:id/:course_slug/:chapterId/:chapter_slug/managetopic"
            element={<ManageTopic />}
          />
          <Route
            path="/admin/inserttopic/:chapterId"
            element={<InsertTopic />}
          />
          <Route path="/admin/insertcourse" element={<InsertCourse />} />
          <Route path="/admin/managecourse" element={<ManageCourse />} />
           
          <Route
            path="/admin/managecourse/:id/:course_slug"
            element={<ViewCourse />}
          />
          <Route path="/admin/viewchapter/:id" element={<ViewChapter />} />
          <Route path="/admin/insertchapter/:id" element={<InsertChapter />} />
          <Route path="/admin/setting" element={<Setting />} />
          <Route
            path="/admin/managecourse/courseedit/:id/:course_slug"
            element={<CourseEdit />}
          />
          <Route
            path="/admin/managecourse/topiceedit/:chapter_id/:chapter_slug/:topic_id/:topic_slug"
            element={<TopicEdit />}
          />
          <Route path="/admin/setting" element={<Setting />} />
          <Route path="/admin/insertpost/:id" element={<InsertPost />} />
          <Route
            path="/admin/managecourse/:id/:course_slug/:chapter_id/:chapter_slug/viewpost/:topic_id/:topic_slug"
            element={<ViewPost />}
          />
          <Route
            path="/admin/managecourse/courseedit/:id/:course_slug"
            element={<CourseEdit />}
          />
          <Route
            path="/admin/managecourse/chapteredit/:course_id/:chapter_id/:chapter_slug"
            element={<ChapterEdit />}
          />
          <Route
            path="/admin/viewcourse/editpost/:topic_id/:post_id"
            element={<PostEdit />}
          />
          <Route path="/admin/setting" element={<Setting />} />
        </Route>
      </Route>

      <Route path="online-compiler" element={<OnlineCompiler />} />

      <Route path="/admin/viewchapter/:id" element={<ViewChapter />} />
      <Route path="/admin/insertchapter/:id" element={<InsertChapter />} />
      <Route path="/admin/setting" element={<Setting />} />
      <Route
        path="/admin/managecourse/courseedit/:id/:course_slug"
        element={<CourseEdit />}
      />
      <Route
        path="/admin/managecourse/topiceedit/:id/:topic_slug"
        element={<TopicEdit />}
      />

      <Route path="/admin/setting" element={<Setting />} />

      <Route path="/admin/insertpost/:topic_id" element={<InsertPost />} />

      <Route
        path="/admin/managecourse/:id/:course_slug/:chapter_id/:chapter_slug/viewpost/:topic_id/:topic_slug"
        element={<ViewPost />}
      />

      <Route
        path="/admin/managecourse/courseedit/:id/:course_slug"
        element={<CourseEdit />}
      />
      <Route
        path="/admin/managecourse/chapteredit/:id/:chapter_slug"
        element={<ChapterEdit />}
      />
      <Route path="/admin/viewcourse/viewpost/:id" element={<PostEdit />} />

      <Route path="/admin/setting" element={<Setting />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="3535758964-nov4csc4qa3nfgpvba1s9nf22pfekln0.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
