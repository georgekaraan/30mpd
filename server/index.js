// import express, { json, urlencoded } from 'express';
// import { set, connect } from 'mongoose';
// import cors from 'cors';
// import UserRoute from './Routes/UserRoute.js';
// import CourseRoute from './Routes/CourseRoute.js';
// import AdminJS from "adminjs";
// import AdminJSExpress from "@adminjs/express";
// import users from './Models/UserModel.js';
// import courses from './Models/CourseModel.js';
// import fileUpload from 'express-fileupload';



const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    UserRoute = require('./Routes/UserRoute.js'),
    CourseRoute = require('./Routes/CourseRoute.js'),
    // AdminJS = require('adminjs'),
    // AdminJSExpress = require('@adminjs/express'),
    users = require('./Models/UserModel.js'),
    courses = require('./Models/CourseModel.js'),
    fileUpload = require('express-fileupload'),
    cors = require('cors'),
    { set, connect } = require('mongoose'),
    { json, urlencoded } = require('express')

// app.use(express.json())

// app.use(express.urlencoded())

// const AdminJSMongoose = require("@adminjs/mongoose");
// AdminJS.registerAdapter(AdminJSMongoose)

// import * as dotenv from 'dotenv'
const dotenv = require('dotenv')
dotenv.config()



set('debug', true)
// =================== setting to use the body of a request ===================
app.use(json({ limit: '500mb' }));
app.use(urlencoded({ limit: '500mb', extended: true, parameterLimit: 1000000 }));
app.use(cors())

// connecting to mongo and checking if DB is running
async function connecting() {
    try {
        // await connect(`mongodb+srv://geewizz:${process.env.PASSWORD}@30mpd.c6mwg3p.mongodb.net/30mpd?retryWrites=true&w=majority`)
        await connect(`mongodb+srv://geewizz:${process.env.PASSWORD}@30mpd.c6mwg3p.mongodb.net/30mpd?retryWrites=true&w=majority`)


        console.log('Connected to the DB')
    } catch (error) {
        console.log('ERROR: Seems like your DB is not running, please start it up !!!');
    }
}
connecting()

// const adminJS = new AdminJS({
//     resources: [courses, users],
//     rootPath: "/admin",
// });


// const routerAdmin = AdminJSExpress.buildRouter(adminJS);
// app.use(adminJS.options.rootPath, routerAdmin);

//routes
app.use(fileUpload());
app.use('/user', UserRoute);
app.use('/course', CourseRoute);


const path = require('path')

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

let port = process.env.PORT || 4000

app.listen(port, () => console.log(`listening on port ${port}`))