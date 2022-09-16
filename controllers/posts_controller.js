const Post = require('../models/post');
const Comment=require('../models/comment')

try{module.exports.create = async function(req, res){
    await Post.create({
         content: req.body.content,
         user: req.user._id
     });
     req.flash('success','Post Published');
      return res.redirect('back');
 }

}catch(err){
    req.flash('error',err);
    return res.redirect('back');
    
    

}

    module.exports.destroy = async function(req,res){
        try{
               let post= await Post.findById(req.params.id);
             // .id means converting the object id (._id ) into string 
               if(post.user == req.user.id){
                 post.remove();
              await  Comment.deleteMany({post: req.params.id});
              req.flash('success','Post deleted');
                     return res.redirect('back');
                 
             }else{
                req.flash('error','You can not delte this post');
                 return res.redirect('back');
             }


}catch(err){
    req.flash('error',err);
    return res.redirect('back');
}

    }

