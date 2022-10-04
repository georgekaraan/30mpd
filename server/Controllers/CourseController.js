const Users = require('../Models/UserModel.js');
const Courses = require('../Models/CourseModel.js');
// const ipfs = require("../Services/ipfs.service")
// import ipfsSaveFile from "../Services/ipfsSaveFile.js";
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = dirname(fileURLToPath(import.meta.url));



class CourseController {

    async read(req, res) {
        try {
            const course = await Courses.find()
            console.log(course)
            res.send(course)
        }
        catch (e) {
            res.send('how?')
        }
    }

    async addCourse(req, res) {
        const courseObj = req.body

        try {
            const course = await create(
                {
                    name: courseObj.name,
                    sub_title: courseObj.sub_title,
                    user_id: courseObj.user_id,
                    description: courseObj.description,
                    category: courseObj.category
                })
            res.send('it worked')
        }
        catch (e) {
            res.send(e)
        }
    }

    // File upload to server
    // async uploadVideo(req, res) {

    //     if (!req.files || Object.keys(req.files).length === 0) {
    //         return res.status(400).send('No files were uploaded.')
    //     }

    //     let video = req.files.file
    //     let uploadPath = __dirname + '/video/' + video.name

    //     console.log(uploadPath);

    //     await video.mv(uploadPath, function (err) {
    //         if (err) {
    //             console.log('hello');
    //             return res.status(500).send(err);
    //         }
    //         console.log('File uploaded!');
    //     })
    //     let CID = await ipfsSaveFile(uploadPath)
    //     res.send(CID)
    // }

    async listCats(req, res) {
        try {
            const course = await Courses.find()
            // course = course.map((el) => el["category"])
            res.send(course.map((el) => el["category"]))
        }
        catch (e) {
            res.send(e)
        }

    }

    async findbyid(req, res) {

        const { id } = req.body
        try {
            const course = await Courses.findById(id)
            res.send(course)
        }
        catch (e) {
            res.send(e)
        }
    }


}

module.exports = new CourseController();