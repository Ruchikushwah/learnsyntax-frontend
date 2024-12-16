import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Breadcrumbs = () => {
    const location = useLocation()
    const pathnames = location.pathname.split('/admin').filter(x => x)
  return (
    <div className=' text-blue-500 my-4'>
        <ul className=' flex'>
           
            {
                pathnames.map((value,index) => {
                    const last = index === pathnames.length - 1
                    const to = `/admin${pathnames.slice(0, index + 1).join()}`
                    const title = value
                    return(
                        <li key={to}>
                            <span className='mx-2'>/admin</span>
                            {
                                last ? (
                                    <span className=' text-gray-700'>{title}</span>
                                ) : (
                                    <Link to={to}>{title}</Link>
                                )
                            }
                        </li>

                    )
                })
            }
        </ul>
      
    </div>
  )
}

export default Breadcrumbs
