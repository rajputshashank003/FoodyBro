import axios from 'axios';

let currentLink = 'https://foodybro1.onrender.com/';

axios.defaults.baseURL = import.meta.env.MODE !== 'production' ? 'http://localhost:8080' : currentLink;