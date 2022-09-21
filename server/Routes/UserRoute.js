import { Router } from 'express';
import controller from '../Controllers/UserController.js';

const router = Router()


router.get('/read', controller.read)
// router.post('/add', add)
// router.post('/delete', controller.delete)
// router.post('/update', controller.update)
// router.get('/:product', controller.singleProduct)

export default router;