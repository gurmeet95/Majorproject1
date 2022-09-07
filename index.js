 const express = require('express');
 const cookieParser= require('cookie-parser');
 const app = express();
 const port = 8000;
 const expressLayouts=require('express-ejs-layouts');
 const db=require('./config/mongoose');
 //user for session cookie
 const session=require('express-session');
 const passport=require('passport');
 const passportLocal= require('./config/passportlocalstrategy');
 const MongoStore  = require('connect-mongo');   //new way found from stackoverflow
 const sassMiddleware=require('node-sass-middleware')
 app.use(sassMiddleware({
    src: './assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
 }))
 app.use(express.urlencoded());
 app.use(cookieParser());
 app.use(express.static('./assets'));
 app.use(expressLayouts);
 //exctract style and scripts from sub pages into layouts
 app.set('layout extractStyles',true);
 app.set('layout extractScripts',true);

 // set up view engine
 app.set('view engine', 'ejs');
 app.set('views', './views');
 app.use(session({
    name:'codieal',
    //Todo Change the seret before deploymnet in projeft mode
    secret: 'blahsomething',
    resave: false,
    cookie:{
        maxAge:(1000 *60 * 100)
    },
    store:MongoStore.create({
        mongoUrl:'mongodb://localhost/codeial_devlopment',
        autoRemove:'disabled'
    },
    function(err){
        console.log(err || 'Connect-mongo')

    }
    )
  


 }));
 app.use(passport.initialize());
 app.use(passport.session());
 app.use(passport.setAuthenticatedUser);
  //use expres router
  app.use('/', require('./routes'));

 app.listen(port, function(err) {
     if (err) {
         console.log(`Error in running the server: ${err}`);
     }
     console.log(`Sever is running on port: ${port}`);
 });