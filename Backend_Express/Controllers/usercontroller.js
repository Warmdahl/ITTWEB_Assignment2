var mongoose = require('mongoose')
const UserList = mongoose.model('User')
const bcrypt = require('bcrypt');

module.exports.AddUserForm = function(req, res){
    res.render('createuser', {title: 'createuser'})
}

//POST - add user to db
module.exports.AddUser = async function(req, res){
    const user = await UserList.find({username: req.body.username}).catch(reason => res.render("error", reason));
    /*if(user){
        res.send("Username already taken");
    }*/
    //else if(!user){
    var saltrounds = 10;
    bcrypt.hash(req.body.password, saltrounds).then(async function(hash) {
        var user = await UserList.create({username: req.body.username, password: hash}).catch(reason => res.render("error", reason));
        if(user){
            res.send(user);
        }   
    })
    //}
}

//GET - get all users
module.exports.GetUsers = async function(req, res){
    const users = await UserList.find({}).catch(reason => res.render("error", reason));
    if(res.status(200)){
        res.send(users);
    }
}

//login
module.exports.UserLogIn = async function(req, res) {
    const user = await UserList.findOne({username: req.body.username}).catch(reason => res.render("error", reason));
    console.log(user)
    if(user){
        bcrypt.compare(req.body.password, user.password).then(function (res2) {
            if(res2){
                //hvis password passer
                console.log("correct");
                user.password = "";
                token = "test"
                res.send(user, token);
                //res.redirect('//localhost:8080/workouts/workoutlist')
            } else{
                //password er forkert
                console.log("false");
                res.send("Wrong password!");
                //res.render("Password or username is wrong!");
            }
        })
    } else{
        res.send("user does not exist")
    } 
}

//Delete all users in DB
module.exports.deleteusers = async function(req, res){
    const users = await UserList.find({}).catch(reason => res.render("error", reason));
    if(users != 0){
        await UserList.deleteMany({}).catch(reason => res.render("error", reason));
        res.redirect('//localhost:8080/')
    }
    else{
        res.redirect('//localhost:8080/users/form')
    }
}

//Delete a user in DB
module.exports.deleteusers = async function(req, res){
    const users = await UserList.find({}).catch(reason => res.render("error", reason));
    if(users != 0){
        await UserList.deleteMany({}).catch(reason => res.render("error", reason));
        res.redirect('//localhost:8080/')
    }
    else{
        res.redirect('//localhost:8080/users/form')
    }
}