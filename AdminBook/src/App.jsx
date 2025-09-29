import React from 'react'
import AddBook from './Pages/AddBook'
import BookList from './Pages/BookList'
import { Outlet } from 'react-router-dom'
import SideBarMenu from './Components/SideBarMenu'

function App() {
  return (
    <>
      <SideBarMenu>
        <Outlet></Outlet>
      </SideBarMenu>
      
    </>
  )
}

export default App