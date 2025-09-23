import React from 'react'

const UserLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>   
      <main>{children}</main>    
    </div>
  )
}

export default UserLayout