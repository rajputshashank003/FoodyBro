import { useEffect } from 'react'
import './App.css'
import AppRoutes from './AppRoutes.jsx';
import Header from './components/Header/Header.jsx';
import Loading from './components/Loading/Loading.jsx';
import { useLoading } from './components/Hooks/useLoading.jsx';
import {setLoadingInterceptor }  from "./components/Interceptors/LoadingInterceptor.jsx";

function App() {
  const {showLoading , hideLoading} = useLoading();
  useEffect ( () => {
    setLoadingInterceptor({hideLoading, showLoading});
  }, []);
  
  return (
    <>
      <Loading/>
      <Header/>
      <AppRoutes/>
    </>
  )
}

export default App
