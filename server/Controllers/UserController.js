import Users from '../Models/UserModel.js';
import Courses from '../Models/CourseModel.js';

class UserController {

    async read(req, res) {
        try {
            await Users.create({ name })
            res.send({ ok: true, data: `User ${name} added successfully` })
        }
        catch (e) {
            res.send({ e })
        }
    }


}

export default new UserController();