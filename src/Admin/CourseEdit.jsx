import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Title from "./Title";
import Description from "./Description";
import Image from "./Image";

const CourseEdit = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null); 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/courses/${id}`);
        const data = await response.json();

        console.log(data);

        if (data && data.data) {
        
          setRecord(data.data); 
        } else {
          console.error("Unexpected data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [id]); 

 
  if (!record) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 px-6 py-4 w-full">
      <Title label="Title" field={record.title} />
      <Description label="Description" field={record.description} />

        <Image
          label="Image"
          src={`http://127.0.0.1:8000/storage/images/${record.image}`}
          field={record.image}
        />
      
    </div>
  );
};
export default CourseEdit;
