import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from '../layouts/DefaultLayout'
// import Home from '../pages/Home'
// import Login from '../pages/Login'

const HomePage = lazy(() => import('../pages/Home'))
const LoginPage = lazy(() => import('../pages/Login'))
const RegisterPage = lazy(() => import('../pages/Register'))
const UserPage = lazy(() => import('../pages/MyPage/User'))
const CollectionsPage = lazy(() => import('../pages/Collections'))
const ProductPage = lazy(() => import('../pages/Product/Product'))
const CartPage = lazy(() => import('../pages/Cart/Cart'))
const OrderPage = lazy(() => import('../pages/Order'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))
const OderSuccessPage = lazy(() => import('../pages/OrderSuccess'))

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/user' element={<UserPage />}></Route>
          <Route path='/collections' element={<CollectionsPage />}></Route>
          {/* <Route path='/collections/:search' element={<CollectionsPage />}></Route> */}
          <Route path='/collections/:params' element={<CollectionsPage />}></Route>
          <Route path='/product/:productId' element={<ProductPage />}></Route>
          <Route path='/cart' element={<CartPage />}></Route>
          <Route path='/order' element={<OrderPage />}></Route>
          <Route path='/order-success' element={<OderSuccessPage />}></Route>
        </Route>
        <Route path='*' element={<NotFoundPage />}></Route>
      </Routes>
    </>
  )
}

export default Router
