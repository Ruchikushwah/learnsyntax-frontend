import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Title from "./Title";
import Description from "./Description";
import Image from "./Image";
import { BeatLoader } from "react-spinners";
import parse from "html-react-parser";

const APP_URL = import.meta.env.VITE_REACT_APP_URL;

const CourseEdit = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${APP_URL}/api/courses/${id}`);
        const data = await response.json();

        if (data && data.data) {
          setRecord(data.data);
        } else {
          console.error("Unexpected data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCourses();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="  w-32  h-32 ">
          <BeatLoader color=" #14b8a6" />
        </div>
        
      </div>
    );
  }

  if (!record) {
    return <div className="text-center text-gray-500">No course found.</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 px-6 py-4 w-full">
      <Title label="Title" field={record.title} />
      <Description label="Description" field={ parse (record.description)} />

        <Image
          label="Image"
          src={`${APP_URL}/storage/images/${record.image}`}
          field={record.image}
        />
      
    </div>
  );
};

export default CourseEdit;
