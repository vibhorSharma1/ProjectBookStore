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
import CouponsList from './Components/coupons/CouponsList.jsx'
import AddCoupons from './Components/coupons/AddCoupons.jsx'
import DiscountList from './Components/discount/DiscountList.jsx'
import AddDiscount from './Components/discount/AddDiscount.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/addBook' element={<AddBook/>}/>
      <Route path='/addMobile' element={<AddMobile/>}/>
      <Route path='/bookList' element={<BookList/>}/>
      <Route path='/mobileList' element={<MobileList/>}/>
      <Route path='/editBook/:id' element={<EditBookPage/>} />
      <Route path='/editMobile/:id' element={<EditMobilePage/>} />
      <Route path='/coupons' element={<CouponsList/>}></Route>
      <Route path='/addCoupon' element={<AddCoupons/>}></Route>
      <Route path='/discounts' element={<DiscountList/>}></Route>
      <Route path='/addDiscount' element={<AddDiscount/>}></Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
