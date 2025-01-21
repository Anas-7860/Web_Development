const express = require('express');
const app = express();
const path = require('path');  // importing path module
const fs= require('fs');  // importing file system module

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));  // telling that all the static files are in the public directory- path.join is used to join the path of the current directory with the public directory

app.set('view engine','ejs');   // setting the view engine to ejs

app.get('/',function(req,res){  // when the user hits the root route}
    fs.readdir('./files', function(err, files){  
        // console.log(files);  // rendering the index.ejs file and passing the files array to it
     res.render("index",{files:files});  // rendering the index.ejs file and passing the files array to it
        
    })
});

 
app.post('/create',function(req,res){  // when the user uploads a file
     fs.writeFile(`./files/${req.body.name.split(' ').join('')}.txt`,req.body.desc, function(err){
        res.redirect('/');  // redirecting to the root route
     });  // writing the file to the files directory
    }); 
app.get('/files/:filename', function (req, res) {
        const filePath = path.join(__dirname, 'files', req.params.filename); // Construct the correct path
        fs.readFile(filePath, "utf-8", function (err, data) {
            if (err) {
                console.error(err);
            }
            res.render("show",{data:data}); // Send file content as formatted text
        });
    });
    
     // when the user deletes a file
app.post("/delete",function(req,res){ 
    fs.unlink(`./files/${req.body.name}`,(err)=>{// deleting the file from the files directory);
        if(err) console.log(err);
        else res.redirect('/');
    });
});

app.listen(3000);