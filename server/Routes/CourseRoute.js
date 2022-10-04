const express = require("express"),
    router = express.Router(),
    controller = require('../Controllers/CourseController.js')


// const router = Router()


router.get('/read', controller.read)
router.post('/findbyid', controller.findbyid)
router.get('/listofcats', controller.listCats)
router.post('/add', controller.addCourse)
// router.post('/upload', controller.uploadVideo)
// router.post('/uploadtwo', controller.uploadVideo)
// router.post('/delete', controller.delete)
// router.post('/update', controller.update)
// router.get('/:product', controller.singleProduct)

module.exports = router;