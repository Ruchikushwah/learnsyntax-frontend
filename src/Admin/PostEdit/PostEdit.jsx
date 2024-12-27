import React, { useEffect, useState } from 'react'
import Title from '../Title'
import Content from './Content'
import Image from '../Image'
import { useParams } from 'react-router-dom'

const PostEdit = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  useEffect (() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/topics/${id}/posts/${id}`
        );
        const data = await response.json();
        console.log('data',response);
        if(data && data.data) {
          setRecord(data.data);

        } else {
          console.error("Unexpected data structure:", data);
        }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};
fetchPosts();
  }, [id]);
 
  return (
    <div className='grid grid-cols-2 gap-4 px-6 py-4 w-full'>
    <Title  label="Title" field={record.title}/>
    <Content label="content" field={record.content}/>
    <Image title="image" field={record.image}/>
    </div>
  )
}
export default PostEdit
