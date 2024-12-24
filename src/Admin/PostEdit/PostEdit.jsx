import React from 'react'
import Title from '../Title'
import Content from './Content'
import Image from '../Image'

const PostEdit = () => {
  return (
    <div className=' grid grid-cols-2 gap-4 px-6 py-4 w-full'>
    <Title/>
    <Content/>
    <Image/>
    </div>
  )
}

export default PostEdit
