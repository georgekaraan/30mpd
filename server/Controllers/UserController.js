const Users = require('../Models/UserModel.js');
const Courses = require('../Models/CourseModel.js');
const argon2 = require("argon2"); //https://github.com/ranisalt/node-argon2/wiki/Options
const jwt = require("jsonwebtoken");
const validator = require("validator");

class UserController {

    async register(req, res) {
        const { email, password, password2 } = req.body;
        if (!email || !password || !password2)
            return res.json({ ok: false, message: "All fields required" });
        if (password !== password2)
            return res.json({ ok: false, message: "Passwords must match" });
        if (!validator.isEmail(email))
            return res.json({ ok: false, message: "Invalid credentials" });
        try {
            const user = await Users.findOne({ email });
            if (user) return res.json({ ok: false, message: "Invalid credentials" });
            const hash = await argon2.hash(password);
            console.log("hash ==>", hash);
            const newUser = {
                email,
                password: hash,
                user_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                user_date_time: new Date().getTimezoneOffset(),
                signup_date: new Date()
            };
            await Users.create(newUser);
            res.json({ ok: true, message: "Successfully registered" });
        } catch (error) {
            res.json({ ok: false, error });
        }
    };

    async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password)
            return res.json({ ok: false, message: "All field are required" });
        if (!validator.isEmail(email))
            return res.json({ ok: false, message: "invalid data provided" });
        try {
            const user = await Users.findOne({ email });
            if (!user) return res.json({ ok: false, message: "invalid data provided" });
            const match = await argon2.verify(user.password, password);
            console.log(match);
            if (match) {
                const token = jwt.sign({ email }, process.env.JWT_SECRET, {});
                res.json({ ok: true, message: "welcome back", token, email });
            } else return res.json({ ok: false, message: "invalid data provided" });
        } catch (error) {
            res.json({ ok: false, error });
        }
    };

    verify_token(req, res) {
        console.log(req.headers.authorization);
        const token = req.headers.authorization;
        jwt.verify(token, process.env.JWT_SECRET, (err, succ) => {
            err
                ? res.json({ ok: false, message: "something went wrong" })
                : res.json({ ok: true, succ });
        });
    };


    async getdata(req, res) {

        const { email } = req.body
        try {
            const user = await Users.findOne(({ email }))
            res.send(user)
        }
        catch (e) {
            res.send(e)
        }

    }

    async update(req, res) {
        const { email, ...rest } = req.body

        const filter = { email }
        const update = rest

        try {
            const user = await Users.findOneAndUpdate(filter, update)
            res.send(user)
        }
        catch (e) {
            res.send(e)
        }

    }


}

module.exports = new UserController();