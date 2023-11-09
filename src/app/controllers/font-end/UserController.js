const User = require('../../models/User');
const Category = require('../../models/Category');

class UserController {
    async getUsersforForm(req, res) {
        if (req.session.user) {
            if (req.session.user.role === 'admin') {
                console.log(req.session.user);
                return res.render('back-end/index', { user: req.session.user });
            } else if (req.session.user.role === 'user') {
                console.log(req.session.user);
                return res.render('/', { user: req.session.user });
            }
        } else {
            res.render('login', { layout: false });
        }
    }

    async loginUser(req, res, next) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email, password });
            if (user) {
                // Register the session
                req.session.user = user;
                req.session.save(() => {
                    console.log(req.session.user);
                    // Redirect based on user role
                    if (user.role === 'admin') {
                        return res.redirect('/admin');
                    } else {
                        return res.redirect('/');
                    }
                });
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
            req.session.message = 'User created successfully';
            res.redirect('/login');
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

    async getDetailUser(req, res) {
        // Dua vao session in thong tin ra
        const categories = await Category.find({});
        console.log(req.session.user);
        if (res.locals.user) {
            if (req.session.user.role === 'admin') {
                // If the user is an admin, render the admin template
                return res.render('back-end/index');
            } else {
                const users = res.locals.user; // You need to define 'users' based on your logic
                // If the user is not an admin, render the detailUser template
                console.log(users);
                return res.render('font-end/detailUser', { users, categories, admin: false });
            }
        } else {
            // If there is no user session, redirect to the login page
            return res.redirect('/login');
        }
    }

    logout(req, res) {
        req.session.destroy();
        res.redirect('/login');
    }
}

module.exports = new UserController();
