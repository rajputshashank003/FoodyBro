import React from 'react'
import HomePage from './Pages/Home/HomePage'
import {Routes , Route} from "react-router-dom";
import FoodPage from './Pages/Food/FoodPage';
import CartPage from './Pages/Cart/CartPage';
import Login from './Pages/Login/Login';
import RegisterPage from './Pages/Register/RegisterPage';
import CheckoutPage from "./Pages/Checkout/CheckoutPage.jsx";
import AuthRoute from './components/AuthRoute/AuthRoute.jsx';
import PaymentPage from './Pages/Payment/PaymentPage.jsx';

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/search/:searchTerm" element={<HomePage/>}/>
        <Route path="/tag/:tag" element={<HomePage />} />
        <Route path="/food/:id" element={<FoodPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkout" 
          element={
            <AuthRoute>
              <CheckoutPage />
            </AuthRoute>
          } 
        />
        <Route path="/payment" 
          element={
            <AuthRoute>
              <PaymentPage />
            </AuthRoute>
          } 
        />
    </Routes>
  )
}
