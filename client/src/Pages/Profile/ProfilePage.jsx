import React , {useEffect, useState} from "react";
import classes from "./ProfilePage.module.css";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useAuth } from "../../components/Hooks/useAuth";
import ChangePassword from "../../components/ChangePassword/ChangePassword";

export default function ProfilePage () {
    const {user , updateProfile} = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        phone : undefined,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(formData);
    }
    useEffect ( ()=> {
        setFormData(user);
    }, [user])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value
        });
    };

    return (
        <>
            <div className={classes.main}>
                <form className={classes.details} onSubmit={handleSubmit} >
                    <span className={classes.mapHead}>Update Profile</span>
                    <TextField
                        sx={{ height: "5rem", width: "20.5rem" }}
                        name='name'
                        label="Name"
                        type='text'
                        variant="outlined"
                        defaultValue={user.name}
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{ height: "5rem", width: "20.5rem" }}
                        name='address'
                        label="Address"
                        type='text'
                        variant="outlined"
                        defaultValue={user.address}
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{ height: "5rem", width: "20.5rem" }}
                        name='phone'
                        label="Phone no."
                        type='number'
                        variant="outlined"
                        defaultValue={user.phone}
                        onChange={handleChange}
                    />
                    <Button 
                        type="submit" 
                        variant='contained' 
                        sx={{
                            bgcolor:"#04AF70", 
                            width:"14rem", 
                            height:"3rem", 
                            fontSize:"1.2rem",
                            marginLeft : "20%",
                            '&:hover': {
                                bgcolor: "#027148"
                            }
                        }} >
                            Update
                    </Button>
                </form>
                <ChangePassword/>
            </div>
        </>
    );
}