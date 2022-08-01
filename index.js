const express = require('express'); //we have to require express just like fs.
const path = require('path'); //include path.
const port = 8000;
const db = require('./config/mogoose'); //always above express invoke.
const Contact = require('./models/contact');
const app = express(); //now this app variable has the functionality of this require express.
app.set('view engine', 'ejs'); //here we create a property viewengine and ive it value ejs.
app.set('views', path.join(__dirname, 'views')); //whwnwever we need to refrence the view/html file it look out for folder name view inside __dirname
app.use(express.urlencoded()); // callng middelware
app.use(express.static('assets'));

// creating our own middel ware1
// app.use(function(req, res, next) {

//console.log("Runnig from middleware1");
//next(); // calling next to show that where we have to go ..next middleware or to controller with next page is not loaded.
//this first check for anyothermiddleware calling after it if found go there otherwise go to controller
// })
//createmiddlewrae2
//app.use(function(req, res, next) {
//console.log("Running middleware2")
//next();
//})

var contactList = [{
    name: "Gurmeet",
    phone: '9578810689'

}, {
    name: "Sumit",
    phone: "12346"

}]
app.get('/', function(req, res) { //swnding resopnse to page
    //console.log(req); //printing request
    // console.log(__dirname); //it print the directory name from which the sever is started.
    // res.send('<h1>Cool it is running</h1>'); //it automatically detect hi1 tag of html this is done by html.
    Contact.find({}, function(err, contact) {
        if (err) {
            console.log("Eroor in fetching contacts");
            return;
        }
        return res.render('home', {
            title: "My Contact List",
            contact_list: contact
        });
    });

});
app.post('/createcontact', function(req, res) {
    // return res.redirect('/practice')
    //  console.log(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact) {
        if (err) {
            console.log('error in creating contact');
            return;
        }
        console.log('******', newContact);
        return res.redirect('back')

    });
});



// return res.redirect('/'); // res.redirect('back');


app.get('/delete-contact', function(req, res) { //params  = '/delete-contact/:phone'
    //console.log(req.params)
    // let phone = req.params.phone;
    //for delteting the contact get the query from the url
    //now with database
    //get the id from  query in the url
    let id = req.query.id;
    //fin dthe contact in the databse using id and dlte it
    Contact.findByIdAndDelete(id, function(err) {
        if (err) {
            console.log("Eror in deleting an object");
            return;
        }
        return res.redirect('back');
    });


});
app.get('/practice', function(req, res) {
    return res.render('practice', { title: "Ejs Practice" });

});





app.listen(port, function(err) {
    if (err) {
        console.log('Error in running the server', err);
    }
    console.log('My Express server is running on Port:', port);
});