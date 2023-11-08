const User = require('../../models/User');

class UserController {
    async loginUser(req, res) {
        var { email, password } = req.body;
        var user = await User.findOne({ email: email, password: password });
        if (user) {
            //dang ky session
            req.session.user = user;
            return res.redirect('/user');
        } else {
            res.render('login', { layout: false, error: 'Login Fail!', data: { email, password } });
        }
        if (req.session.user) {
            if (req.session.user.role == "admin") {
                return res.render('back-end/index', { admin: true });
            } else {
                return res.render('font-end/index', { admin: false });
            }
        } else {
            return res.render('login', { layout: false });
        }
    }



    // Xử lý tạo mới user
    async createRegister(req, res) {
        const data = req.body;
        try {
            await User.create(data);
            req.session.message = "User created successfully";
            res.redirect("/login");
        } catch (err) {
            if (err.name === 'ValidationError') {
                // Handle validation errors
                let errors = {};
                for (const field in err.errors) {
                    errors[field] = err.errors[field].message;
                }
                res.render('register', { layout: false, errors, data });
            }
        }
    }


    //  getFormCreateUser  (req ,res )  {
    //     if(req.session.user){
    //         if(req.session.user.role == "user"){
    //             return res.render('/');
    //         }else {
    //             return res.redirect('/');
    //         }
    //     }else {
    //         res.redirect('/user/login');
    //     }
    //     res.render("detail");
    // }




}

module.exports = new  UserController ;