import { useEffect, useState } from "react";
import Chart from "../components/Chart";

const APP_URL = import.meta.env.VITE_REACT_APP_URL;

const Dashboard = () => {
  const [data, setData] = useState({
    totalCourses: 0,
    totalChapters: 0,
    totalTopics: 0,
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${APP_URL}/api/dashboard-count`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData({
          totalCourses: result.data.totalCourses,
          totalChapters: result.data.totalChapters,
          totalTopics: result.data.totalTopics,
        });
      } catch (error) {
        console.error("Error fetching dashboard statics:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <div
      id="card section"
      className=" grid lg:grid-cols-2 grid-cols-1 w-full h-screen p-4  overflow-scroll "
    >
      <div
        id=" left"
        className=" col-span-2 p-2 gap-3 flex flex-col justify-between items-center h-full"
      >
        <div className=" grid lg:grid-cols-3 grid-cols-1 gap-4 w-full ">
          <div className=" w-full flex flex-col justify-center items-center bg-blue-200 p-5 rounded-xl gap-5  cursor-pointer">
            <div className=" w-full flex justify-between items-center">
              <h1 className=" text-md text-black font-semibold">
                Total Courses
              </h1>
              <h1 className=" text-green-600 font-semibold">12</h1>
            </div>
            <div className=" w-full flex justify-between items-center">
              <div className=" flex flex-col justify-center items-start gap-1">
                <h1 className=" text-3xl text-black font-semibold">
                  {data.totalCourses}
                </h1>
                <p></p>
              </div>
            </div>
          </div>
          <div className=" w-full flex flex-col justify-center items-center bg-blue-200 p-5 rounded-xl gap-5  cursor-pointer">
            <div className=" w-full flex justify-between items-center">
              <h1 className=" text-md text-black font-semibold">
                Total Chapters
              </h1>
              <h1 className=" text-green-600 font-semibold">12</h1>
            </div>
            <div className=" w-full flex justify-between items-center">
              <div className=" flex flex-col justify-center items-start gap-1">
                <h1 className=" text-3xl text-black font-semibold">
                  {data.totalChapters}
                </h1>
                <p></p>
              </div>
            </div>
          </div>
          <div className=" w-full flex flex-col justify-center items-center bg-blue-200 p-5 rounded-xl gap-5  cursor-pointer">
            <div className=" w-full flex justify-between items-center">
              <h1 className=" text-md text-black font-semibold">
                Total Topics
              </h1>
              <h1 className=" text-green-600 font-semibold">12</h1>
            </div>
            <div className=" w-full flex justify-between items-center">
              <div className=" flex flex-col justify-center items-start gap-1">
                <h1 className=" text-3xl text-black font-semibold">
                  {data.totalTopics}
                </h1>
                <p></p>
              </div>
            </div>
          </div>

          {/**grid layouts ends here */}
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
