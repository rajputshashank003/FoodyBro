import React, { useEffect, useState } from 'react'

const useDimensions = () => {
    const [width , setWidth ] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    useEffect(() => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
        console.log("effect");
    } ,[window]);
  return (
    {width , height}
  )
}

export default useDimensions