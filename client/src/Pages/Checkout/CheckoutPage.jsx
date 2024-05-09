import React , {useState } from "react";
import classes from "./CheckoutPage.module.css";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useCart } from '../../components/Hooks/useCart.jsx';
import {Link} from "react-router-dom";
import OrderItemsList from "../../components/OrderItemsList/OrderItemsList.jsx";
import Map from '../../components/Map/Map.jsx';

function CheckoutPage() {
    const {cart , removeFromCart , changeQuantity} = useCart();
    const [order, setOrder] = useState({ ...cart });
    const [address, setAddress] = useState();

    return (
        <div className={classes.main} >
            <div className={classes.orderForm}>
                <span className={classes.mapHead}>Order Form</span>
                <br/>
                <br/>
                <TextField
                sx={{ height: "5rem", width: "100%" }}
                name='name'
                label="Name"
                type='text'
                variant="outlined"
                required
                />
                <br/>
                <TextField
                sx={{ height: "5rem",  width: "100%" }}
                name='phone'
                label="Phone"
                type='number'
                variant="outlined"
                required
                />
                <br/>
                <TextField
                sx={{ height: "5rem",  width: "100%" }}
                name='address'
                label="Address"
                type='text'
                variant="outlined"
                value={address}
                required
                />
                <br/>
                <div className={classes.orderItems}>
                    <OrderItemsList order={order}/>
                </div>
            </div>
            <div className={classes.map}>
                <span className={classes.mapHead}>Choose Your Location</span>
                <div className={classes.mapBox}>
                <Map
                    location={order.addressLatLng}
                    onChange={latlng => {
                    console.log(latlng);
                    setOrder({ ...cart, addressLatLng: latlng });
                    setAddress(latlng);
                    }}
                />
                </div>
            </div>
            
            <div className={classes.confirm}>
                <Link 
                style={{
                    textDecoration: "none",
                    position:"relative",
                    padding:"0.5rem",
                    margin:"1rem",
                }}
                    to="/checkout">
                    Proceed To Checkout
                </Link>
            </div>
        </div>
    );
}

export default CheckoutPage;