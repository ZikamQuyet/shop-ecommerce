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
const CartPage = lazy(() => import('../pages/Cart'))
const PaymentPage = lazy(() => import('../pages/Payment'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

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
          <Route path='/product' element={<ProductPage />}></Route>
          <Route path='/cart' element={<CartPage />}></Route>
          <Route path='/payment' element={<PaymentPage />}></Route>
        </Route>
        <Route path='*' element={<NotFoundPage />}></Route>
      </Routes>
    </>
  )
}

export default Router
