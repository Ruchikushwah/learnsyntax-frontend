import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Chart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/dashboard-count");
        const result = await response.json();

        if (response.ok) {
          setData([
            {
              name: "Courses",
              uv: result.data.totalCourses,
              pv: result.data.totalTopics,
              vb: result.data.totalChapters,
            },
            {
              name: "Chapters",
              uv: result.data.totalChapters,
              pv: result.data.totalTopics,
              vb: result.data.totalCourses,
            },
            {
              name: "Topics",
              uv: result.data.totalTopics,
              pv: result.data.totalCourses,
              vb: result.data.totalChapters,
            },
          ]);
        } else {
          setError(result.message || "Failed to fetch course details.");
        }
      } catch (error) {
        setError("Error fetching data.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <BarChart width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
      <Bar dataKey="vb" fill="#19376D" />
    </BarChart>
  );
};

export default Chart;
