const User = require('../../models/User');

class UserController {


    async loginUser(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email, password });
            if (user) {
                // Register the session
                req.session.user = user;
                console.log(req.session.user);
                // Redirect based on user role
                if (user.role === 'admin') {
                    return res.redirect('/admin');
                } else {
                    return res.redirect('/');
                }
            } else {
                res.render('login', { layout: false, error: 'Login Fail!', data: { email, password } });
            }
        } catch (error) {
            // Handle errors (log, render an error page, etc.)
            console.error(error);
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


}

module.exports = new  UserController ;