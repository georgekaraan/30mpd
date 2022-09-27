import { Router } from 'express';
import controller from '../Controllers/UserController.js';

const router = Router()


router.post('/getdata', controller.getdata);
router.post('/update', controller.update);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/verify_token', controller.verify_token);


export default router;