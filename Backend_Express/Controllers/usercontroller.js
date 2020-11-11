var mongoose = require('mongoose')
const UserList = mongoose.model('User')
const bcrypt = require('bcrypt');

module.exports.AddUserForm = function(req, res){
    res.render('createuser', {title: 'createuser'})
}

//POST - add user to db
module.exports.AddUser = async function(req, res){
    var saltrounds = 10;
    var password;
    bcrypt.hash(req.body.password, saltrounds).then(async function(hash) {
        var user = await UserList.create({username: req.body.username, password: hash}).catch(reason => res.render("error", reason));
        if(user){
            res.redirect('//localhost:8080/')
        }    
    })
}

//GET - get all users
module.exports.GetUsers = async function(req, res){
    const users = await UserList.find({}).catch(reason => res.render("error", reason));
    res.render('UserList', {title: 'User list', users});
}

//login
module.exports.UserLogIn = async function(req, res) {
    const user = await UserList.find({username: req.body.username}).catch(reason => res.render("error", reason));
    console.log(user)
    if(user){
        bcrypt.compare(req.body.password, user[0].password).then(function (res2) {
            if(res2){
                //hvis password passer
                console.log("correct");
                res.redirect('//localhost:8080/workouts/workoutlist')
            } else{
                //password er forkert
                console.log("false");
                res.render("Password or username is wrong!");
            }
        })
    } else if(!user){
        res.render("user does not exist")
    } 
}

//Delete users in DB
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

//Delete users in DB
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