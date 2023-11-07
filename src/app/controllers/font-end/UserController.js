const User = require('../../models/User');

class UserController {
    async getAllUsers  (req, res ) {
        var users = await User.find({}).exec();
        if(req.session.user){
            if(req.session.user.role == "admin"){
               return res.render('back-end/index', { admin: true });
            }else {
                return res.render('font-end/index', { admin: false });
            }
        }else {
           return res.render('login', { layout: false });
        }
    }

    async checkLogin (req ,res, next ) {
        var {email,password} = req.body;
        var user = await User.findOne({email,password});
        if(user){
            //dang ky session
            req.session.user = user ;
            return res.redirect('/user');
        }else{
            return res.render('login' , { layout: false , error: 'Login Fail!'  , data : { email , password }});
        }
    }

// Xử lý tạo mới user
async checkRegister  (req, res) {
        const data = req.body;
        await User.create(data)
        .then(() => {
            req.session.message = "User created successfully";
            res.redirect("/user"); 
        })
        .catch(err => {
            if(err.name === 'ValidationError'){
                let errors = {};
                for(const field in err.errors){
                    errors[field] = err.errors[field].message;
                }
                res.render('register', { layout: false ,errors, data});
            }
        })
}




}

module.exports = new  UserController ;