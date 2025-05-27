import { useEffect } from 'react'
import AppRoutes from './AppRoutes.jsx';
import Header from './components/Header/Header.jsx';
import Loading from './components/Loading/Loading.jsx';
import { useLoading } from './components/Hooks/useLoading.jsx';
import {setLoadingInterceptor }  from "./components/Interceptors/LoadingInterceptor.jsx";
import SmallDisplayTitle from './components/SmallDisplayTitle/SmallDisplayTitle.jsx';
import Footer from './components/Footer/Footer.jsx';
import "./App.css";
import Header_v2 from './components_v2/Header_v2/Header_v2.jsx';
import SmallDisplayTitle_v2 from './components_v2/SmallDisplayTitle/SmallDisplayTitle_v2.jsx';
import useDimensions from './components/Hooks/useDimensions.jsx';

function App() {
  const {showLoading , hideLoading} = useLoading();
  useEffect ( () => {
    setLoadingInterceptor({hideLoading, showLoading});
  }, []);
  const { width } = useDimensions();
  
  return (
    <>
      <Loading/>
      {/* <SmallDisplayTitle/> */}
      {
        width > 600 ?
        <Header/>
        :
        <>
          <SmallDisplayTitle_v2 />
          <Header_v2 />
        </>
      }
      <AppRoutes/>
      <Footer/>
    </>
  )
}

export default App
