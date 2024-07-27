const express = require('express');
 const cors = require('cors');
 const mongoose = require('mongoose');

 const app = express();

 app.use(express.json());
 app.use(cors());

 mongoose.connect('mongodb://localhost:27017/notes')
 .then(() => {
    console.log('MongoDB connected');
 })
 .catch((error) => {
    console.log(error);
 });

 const usermodel = require('./models/User');

 const Jobs =[ {
    companyName: "Tech Solutions",
    role: "Software Engineer",
    experience: "3 years",
    place: "Bangalore"
  },
  {
    companyName: "Innovatech",
    role: "Front End Developer",
    experience: "2 years",
    place: "Hyderabad"
  },
  {
    companyName: "WebCrafters",
    role: "Full Stack Developer",
    experience: "4 years",
    place: "Chennai"
  },
  {
    companyName: "AppDynamics",
    role: "React Developer",
    experience: "1 year",
    place: "Pune"
  },
  {
    companyName: "CodeWorks",
    role: "UI/UX Designer",
    experience: "5 years",
    place: "Mumbai"
  }]

 app.post('/login', async (req, res) => {

    const { name, password } = req.body;

    const user = await usermodel.create({ name, password });

    if (user) {
        res.send({ message: 'Login successful', user });
    } else {
        res.send({ message: 'Login failed' });
    }
 });

 app.post('/apply/:id', async (req, res) => {

    const { id } = req.params;

    const user = await usermodel.findById(id);

    if (user) {
        user.applications.push(req.body);
        await user.save();
        res.send({ message: 'Application successful', user });
    } else {
        res.send({ message: 'Application failed' });
    }
 });

 app.get('/jobs',(req,res)=>{
    res.send(Jobs)
 });

 app.get('/getuser/:id', async (req, res) => {
   const { id } = req.params; // Correctly destructure id from req.params
 
   try {
     const user = await usermodel.findById(id); // Use findById method to find the user
 
     if (user) {
       res.send({ user }); // Send user data if found
     } else {
       res.status(404).send({ message: 'User not found' }); // Send 404 if user is not found
     }
   } catch (error) {
     console.error(error); // Log error
     res.status(500).send({ message: 'An error occurred', error }); // Send error response
   }
 });
 
 app.get('/applied/:id',(req,res)=>{
    const { id } = req.params;
    const user = usermodel.findById(id);
    res.send(user.applications)
 });
 app.post('/search',(req,res)=>{
    const { Role } = req.body;

    const filteredJobs = Jobs.filter((job) => job.role === Role);

    res.send(filteredJobs);
 })

 app.listen(2000, () => {
    console.log('Server started on http://localhost:2000');
 });