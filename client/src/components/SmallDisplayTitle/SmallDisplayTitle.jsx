import React from 'react'
import classes from "./SmallDisplayTitle.module.css"
import { Link } from 'react-router-dom'

function SmallDisplayTitle() {
    return (
        <div className={classes.main}>
            <Link style={{color : "red", textDecoration:"none"}} to="/" >FoodyBro</Link>
        </div>
    )
}

export default SmallDisplayTitle
