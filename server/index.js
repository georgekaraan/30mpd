import express, { json, urlencoded } from 'express';
const app = express();
import { set, connect } from 'mongoose';
import cors from 'cors';
import UserRoute from './Routes/UserRoute.js';
import CourseRoute from './Routes/CourseRoute.js';
// AdminJS = require('adminjs'),
// AdminJSExpress = require('@adminjs/express'),
import Users from './models/UserModel.js';
import Courses from './models/CourseModel.js';
import fileUpload from 'express-fileupload';



// AdminJS.registerAdapter(require("@adminjs/mongoose"));
import * as dotenv from 'dotenv'
dotenv.config()



set('debug', true)
// =================== setting to use the body of a request ===================
app.use(json({ limit: '500mb' }));
app.use(urlencoded({ limit: '500mb', extended: true, parameterLimit: 1000000 }));
app.use(cors())

// connecting to mongo and checking if DB is running
async function connecting() {
    try {
        await connect(`mongodb+srv://geewizz:${process.env.PASSWORD}@30mpd.c6mwg3p.mongodb.net/30mpd?retryWrites=true&w=majority`)

        console.log('Connected to the DB')
    } catch (error) {
        console.log('ERROR: Seems like your DB is not running, please start it up !!!');
    }
}
connecting()

// const adminJS = new AdminJS({
//     resources: [Courses, Users],
//     rootPath: "/admin",
// });


// const routerAdmin = AdminJSExpress.buildRouter(adminJS);
// app.use(adminJS.options.rootPath, routerAdmin);


app.use(fileUpload());
app.use('/user', UserRoute);
app.use('/course', CourseRoute);

app.listen(4060, () => console.log(`listening on port 4060`))