const User = require('../models/user');


module.exports.profile = function(req, res) {
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
if(user){
    return res.render('profile',{
        title:"User Profile",
       user: user 

    });
}else{
    return res.redirect('/users/sign-in');
}
        });
        
    }else {
        return res.redirect('/users/sign-in');
    }
   
}
// render the signup page.
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"Codeial | Sign Up"
    })
}
// render the sign in page.
module.exports.signIn=function(req,res){
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
    //steps tp authenticat3e.
   
    //1.find the user.
   User.findOne({email: req.body.email},function(err,user){
        if(err){console.log('error in finding user in signing in');return}
     //2.handle user found
    if(user){
    //2.1.if user found - handle password which dont match.
    if(user.password != req.body.password){
        return  res.redirect('back');
    }

    //2.2.handle session creation.
    res.cookie('user_id',user.id);
    return res.redirect('/users/profile');


    //3.handle user not found.
}else{
    return  res.redirect('back');
}

});
    
}
