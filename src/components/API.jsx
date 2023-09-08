import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://182.253.225.226:8000', // Ganti dengan URL API yang sesuai
  timeout: 10000, // Timeout untuk permintaan
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTMyMDUzOTAsImlhdCI6MTY5MzIwNTM5MCwic2Vzc2lvbklEIjoiYzM0MGFlMTMtYjFiYS00ODljLTgyMTYtNzJlNTM4YzI4OTdiIiwidXNlcklEIjoiNDM3YjJiNDEtODllZS00YmQ2LWE5YjAtMTQ0MzIyMzFlNTgwIn0.mp3Au1ZL_3oxj5aeyeu7jtxctvdVbSznzbuxjUuzKOc'
  },
});

export default instance;
