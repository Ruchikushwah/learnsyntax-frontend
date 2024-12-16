import React from 'react'
import { useLocation } from 'react-router-dom'

const Breadcrumbs = () => {
    const location = useLocation()
    const pathnames = locations.pathname.split('/admin').filter(x => x)
  return (
    <div>
      
    </div>
  )
}

export default Breadcrumbs
