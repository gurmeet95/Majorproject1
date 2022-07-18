 const express = require('express');
 const app = express();
 const port = 8000;
 //uae expres router
 app.use('/', require('./routes'));
 app.listen(port, function(err) {
     if (err) {
         console.log(`Error in running the server: ${err}`);
     }
     console.log(`Sever is running on port: ${port}`);
 });