const bcrypt = require('bcryptjs');
const passport = require('passport');
const validator = require("email-validator");
const User = require('../models/Users');
const randomstring = require('randomstring');
var crypto = require("crypto");
const async = require("async");
let urlVerify = 'https://dackfashiop.herokuapp.com/users/verify';
const log = console.log;

const nodemailer = require('nodemailer');
const config = require('../config/mailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'teamseso6@gmail.com',
        pass: '01233527450'
    }
});

//method get,post register user
exports.getSignUp=function(req, res) 
{ 
    let messages =  req.flash('error_msg');
    res.render('registration',{ messages: messages, hasErrors: messages.length >0});
};
exports.postSignUp= (req, res) => {
    const {username, name, email, password, password2} = req.body;
    let errors = [];

    if(!username || !name || !email || !password || !password2){
        errors.push({msg: 'Vui lòng nhập đầy đủ thông tin!'});
    }

    if(!username.match(/^[a-zA-Z0-9]{3,30}$/)){
        errors.push({msg: 'Tên tài khoản chỉ chứa các ký tự a-z, A-Z hoặc 0-9, độ dài 3-30 ký tự!'});
    }

    if(!validator.validate(email)){
        errors.push({msg: "Email không hợp lệ!"});
    }

    if(password !== password2){
        errors.push({msg: 'Xác nhận mật khẩu không đúng'});
    }

    if(password.length < 7){
        errors.push({msg: 'Mật khẩu phải dài hơn 6 ký tự'});
    }
    
    if(errors.length > 0){
        req.flash('error_msg',errors);
        let messages =  req.flash('error_msg');
        res.render('registration',{
            messages: messages,
            hasErrors: messages.length > 0
        });
    }else{
        User.findOne({username: username})
            .then(user => {
                if(user){
                    // user exist
                    errors.push({msg: 'Tài khoản đã tồn tại'})
                    req.flash('error_msg',errors);
                    let messages =  req.flash('error_msg');
                    res.render('registration',{
                        messages: messages,
                        hasErrors: messages.length >0
                    });
                }else{
                    //create new user
                    const newUser = new User({
                        username,
                        name,
                        email,
                        password
                    });

                    //Hash password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            //set new password
                            newUser.password = hash;

                            // create secret token
                            const secretToken = randomstring.generate();
                            newUser.secretToken = secretToken;

                            //inactive account
                            newUser.active = false;
                            let successMsg=[];

                            //save into database
                            newUser.save()
                                .then(user => {
                                    successMsg.push({msg: 'Bạn đã đăng ký thành công!'});
                                    
                                    // mail
                                let mailOptions = {
                                from: 'fashiop69@gmail.com', 
                                to: newUser.email,
                                subject: 'Fashiop xác nhận tài khoản',
                                text: `Xin chào,
                                Cảm ơn bạn đã đăng ký tài khoản tại cửa hàng của chúng tôi!
                                Vui lòng xác nhận tài khoản bằng cách nhập đoạn mã dưới đây:
                                Mã: ${secretToken}
                                Tại địa chỉ: ${urlVerify}>
                                Chúc bạn có một ngày vui vẻ.`
                                };

                                transporter.sendMail(mailOptions, (err, data) => {
                                    if (err) {
                                        return log('Lỗi không gửi được email!');
                                    }
                                    return log('Gửi mail xác minh thành công!!!');
                                });

                                // mailer.sendEmail('admin@fashiop.herokuapp.com', newUser.email, 'Fashiop xác nhận tài khoản', html);
                                successMsg.push({msg: 'Vui kiểm tra mã xác nhận trong email!'});
                                req.flash('success_messages', successMsg);
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));                  
                        }))
                }
            });
    }

};

//method get,post for verify
exports.getVefify = function (req, res) {
    let messages = req.flash('errors_messages');
    console.log(messages);
    res.render('verify',{messages: messages, hasErrors: messages.length >0});
};
exports.postVefify = async (req, res, next) => {
    try{
        const { secretToken } = req.body;
        const user = await User.findOne({ 'secretToken': secretToken });
        if(!user){
            let errors;
            errors = 'Mã xác minh sai, hãy kiểm tra lại, cẩn thận khoảng trắng';
            req.flash('errors_messages',errors);
            res.redirect('/users/verify');
            return;
        }
        user.active = true;
        user.secretToken = '';
        await user.save();  
        let successMsg =[];
        successMsg.push({msg: 'Xác nhận thành công!'});
        req.flash('success_messages', successMsg);
        res.redirect('/users/login');
    }catch(error){
        next(error);
    }
}

//method get, post for forgot password
exports.getForgot = (req, res) => {
    res.render('forgot');
};
exports.postForgot = (req, res) => {
    
    async.waterfall([
        function(done){
            crypto.randomBytes(20, function(err, buf) {
                let token = buf.toString('hex');
                done(err, token);
              });
        },
        function(token, done) {
            
            User.findOne({email: req.body.email, username: req.body.username}, (err, user) => {
                if(!user){
                  let errors = [];
                  errors.push({msg: 'Tên tài khoản và email không khớp!'});
                  req.flash('error_msg', errors);
                  let messages =  req.flash('error_msg');
                  return res.render('forgot', {messages: messages,
                  hasErrors: messages.length > 0});
                }
                user.resetPasswordToken = undefined;
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000 // 1 hour
                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
          let urlResetPassword = 'https://dackfashiop.herokuapp.com/users/reset/';
          urlResetPassword += user.resetPasswordToken;
            let mailOptions = {
            from: 'fashiop69@gmail.com', 
            to: user.email,
            subject: 'Fashiop thay đổi mật khẩu',
            text: `Xin chào ${user.name},
            Có phải bạn muốn tìm lại mật khẩu của mình?
            Nhấp vào đường dẫn bên dưới để đổi lại mật khẩu: ${urlResetPassword}
            Chúc bạn có một ngày vui vẻ.`
            };

            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    return log('Lỗi không gửi được email!');
                }
                return log('Gửi mail xác minh thành công!!!');
            });
            // send email
           // mailer.sendEmail('admin@fashiop.herokuapp.com', user.email, 'Fashiop thay đổi mật khẩu', html);
            let success = [];
            success.push({msg: 'Vui kiểm tra email để lấy lại mật khẩu!'});
            res.render('forgot', {success:success, hasSuccess: success.length >0});
        }
    ],
        function(err){
            if(err)
                return next(err);
            res.redirect('forgot');
        });
};

//method get, post reset password
exports.getResetPassword = async(req, res) => {
    await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, async(err, user) => {
     if (!user) {
       // req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('/users/forgot');
      }
      let error = req.flash('error');
      res.render('reset', {token: req.params.token, error: error,hasErrors: error.length >0 });
    });
};
exports.postResetPassword = function(req, res) {
    async.waterfall([
      function(done) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
          if (!user) {
            return res.redirect('back');
          }
          if(req.body.password === req.body.confirm) {
            bcrypt.genSalt(10, (err, salt) =>
              bcrypt.hash(req.body.password, salt, (err, hash) => {
                  if(err) throw err;
                  //set new password
                  user.password = hash;
                  
                  user.resetPasswordToken = undefined;
                  user.resetPasswordExpires = undefined;
                  
                  //save into database
                  user.save()
                  req.logIn(user, err => {
                    done(err, user);
                  });
                }));
          } else {
            let url = user.resetPasswordToken;
            let errors = [];
            errors.push( 'Mật khẩu không khớp!');
            req.flash('error', errors);
            return res.redirect(url);
          }
        });
      },
      function(user, done) {
                let mailOptions = {
                from: 'fashiop69@gmail.com', 
                to: user.email,
                subject: 'Fashiop xác nhận thay đổi mật khẩu',
                text: `Xin chào, ${user.name}
                Bạn vừa thay đổi mật khẩu của mình!
                Tài khoản thay đổi mật khẩu là ${user.username}
                Hãy nhanh chóng ghé thăm cửa hàng của chúng tôi và mua thật nhiều đồ nhé! ^.^`
                };
    
                transporter.sendMail(mailOptions, (err, data) => {
                    if (err) {
                        return log('Lỗi không gửi được email!');
                    }
                    return log('Gửi mail xác minh thành công!!!');
                });

          let successMsg=[];  
          successMsg.push({msg: 'Mật khẩu đã thay đổi thành công! Hãy đăng nhập và tiếp tục'});
          req.flash('success_messages', successMsg);
          res.redirect('/users/logout');
      }
    ], function(err) {
      res.redirect('/login');
    });
};


//method get,post for login user 
exports.getSignIn = function(req, res) 
{ 
    let errMessages =  req.flash('error');
    let successMessages =  req.flash('success_messages');
    console.log(successMessages);
    res.render('login',{ errorMessages: errMessages, successMessages:successMessages, 
        hasErrors: errMessages.length >0, hasSuccess: successMessages.length>0});
};
exports.postSignIn = (req, res, next) => {
    const {username, password} = req.body;
    let errors;
    if(!username  ||!password){
        errors= 'Vui lòng nhập đầy đủ thông tin';
    }

    if(errors){
        req.flash('error_msg',errors);
        let errMessages =  req.flash('error_msg');
        res.render('login',{
            errorMessages: errMessages,
            hasErrors: errMessages.length > 0
        });
    }else{
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: 'login',
        successFlash: true,
        failureFlash: true
    })(req, res, next);
}
};


//handle user already logged in or not
exports.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
exports.notLoggedIn = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}