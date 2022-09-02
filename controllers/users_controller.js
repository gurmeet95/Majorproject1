const User = require('../models/user');


module.exports.profile = function(req, res) {
    return res.render('profile',{
        title:"Profile"
        
    });
}
// render the signup page.
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
      return   res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"Codeial | Sign Up"
    })
}
// render the sign in page.
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
       return  res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"Codeial | Sign In"
    })
}
// get the signup data
module.exports.create=function(req,res){
    
    //to do
    if(req.body.password != req.body.Confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in signing up');return}
            if(!user){
                User.create(req.body,function(err,user){
                    if(err){console.log('error in creating user while signing up');return}
                    return res.redirect('/users/sign-in');
                })
            }else {
                return res.redirect('back');

            }
        

    });
    
}
// signin and create hte session for user.
module.exports.createsession=function(req,res){
    return res.redirect('/');
}
module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){
            return next(err);   //new way on which show in video.update version
        }
    }); 

    return res.redirect('/');
}