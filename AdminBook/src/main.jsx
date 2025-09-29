import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AddBook from './Pages/AddBook'
import BookList from './Pages/BookList'
import EditBookPage from './Pages/EditBookPage'
import {RouterProvider,Route, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import AddMobile from './Pages/AddMobile.jsx'
import MobileList from './Pages/MobileList'
import EditMobilePage from './Pages/EditMobilePage'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/addBook' element={<AddBook/>}/>
      <Route path='/addMobile' element={<AddMobile/>}/>
      <Route path='/bookList' element={<BookList/>}/>
      <Route path='/mobileList' element={<MobileList/>}/>
      <Route path='/editBook/:id' element={<EditBookPage/>} />
      <Route path='/editMobile/:id' element={<EditMobilePage/>} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
