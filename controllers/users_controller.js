module.exports.profile = function(req, res) {
    return res.render('profile',{
        title:"Profile"
        
    });
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
}
// signin and create hte session for user.
module.exports.createsession=function(req,res){
    //to do
}