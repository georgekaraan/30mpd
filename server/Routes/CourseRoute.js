import { Router } from 'express';
import controller from '../Controllers/CourseController.js';

const router = Router()


router.get('/read', controller.read)
router.get('/listofcats', controller.listCats)
router.post('/add', controller.addCourse)
// router.post('/upload', controller.uploadVideo)
router.post('/uploadtwo', controller.uploadVideo)
// router.post('/delete', controller.delete)
// router.post('/update', controller.update)
// router.get('/:product', controller.singleProduct)

export default router;