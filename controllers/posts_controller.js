const Post = require('../models/post');
const Comment=require('../models/comment')

try{module.exports.create = async function(req, res){
  let post=   await Post.create({
         content: req.body.content,
         user: req.user._id
     });

     if(req.xhr){
        return res.status(200).json({
            data:{
                post: post
            },
            message: 'Post Ceated'

        });
     }
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
              if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    messagae: "Post deleted"
                })
              }
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

