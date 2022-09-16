const User = require('../models/user');

// no change for async await let keep it same as efore for learning.
module.exports.profile = function(req, res) {
    User.findById(req.params.id,function(err,user){

 
    return res.render('profile',{
        title:"Profile",
        profile_user:user
    });
        
    });
}
module.exports.update=function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).sebd('Unauthorized');
    }
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
    req.flash('success','Logged in Succesfully')
    return res.redirect('/');
}
module.exports.destroySession=function(req,res,next){
   
    req.logout(function(err){
        if(err){
            return next(err);   //new way on which show in video.update version
        }
        req.flash('success','Log out succeessfuly');
        return res.redirect('/');
    });

}