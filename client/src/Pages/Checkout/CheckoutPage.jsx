import React , {useState } from "react";
import classes from "./CheckoutPage.module.css";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useCart } from '../../components/Hooks/useCart.jsx';
import {Link, useNavigate} from "react-router-dom";
import OrderItemsList from "../../components/OrderItemsList/OrderItemsList.jsx";
import Map from '../../components/Map/Map.jsx';
import {useAuth} from "../../components/Hooks/useAuth.jsx";
import { toast } from "react-toastify";
import { createOrder } from "../../Services/orderService.js";

function CheckoutPage() {
    const {cart } = useCart();
    const {user} = useAuth();
    const navigate = useNavigate();

    const [order, setOrder] = useState({ ...cart });

    const submit = async (e) => {
        e.preventDefault();
        if(!order.addressLatLng){
            toast.warning("Please select your location on map");
            return ;
        }
        const data = e.target;
        await createOrder({...order, name : data.name.value , address : data.address.value, phone : data.phone.value});
        navigate("/payment");
    }

    return (
        <form onSubmit={submit} className={classes.main}>    
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
                    }}
                />
                </div>
            </div>
            
            <div className={classes.confirm}>
                <Button type="submit" variant='contained' sx={{bgcolor:"#d32f2f", width:"18rem", height:"3.5rem"}} >Go To Payment</Button>
            </div>
        </form>
    );
}

export default CheckoutPage;