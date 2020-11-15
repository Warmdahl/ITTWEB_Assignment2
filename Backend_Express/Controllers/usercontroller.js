var mongoose = require('mongoose')
const UserList = mongoose.model('User')
const WorkoutList = mongoose.model('Workout')
const bcrypt = require('bcrypt');


module.exports.AddUserForm = function(req, res){
    res.render('createuser', {title: 'createuser'})
}

//POST - add user to db
module.exports.AddUser = async function(req, res){
    const user = await UserList.findOne({username: req.body.username}).catch(reason => res.render("error", reason));
    if(user){
        res.status(403).json({"message":"Username already taken"});
    }
    else if(!user){
    var saltrounds = 10;
    bcrypt.hash(req.body.password, saltrounds).then(async function(hash) {
        var user = await UserList.create({username: req.body.username, password: hash}).catch(reason => res.render("error", reason));
        if(user){
            token = user.generateJWT();
            res.json(token);
        }   
    })
    }
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
    var user = await UserList.findOne({username: req.body.username}).catch(reason => res.render("error", reason));
    console.log(user)
    if(user){
        bcrypt.compare(req.body.password, user.password).then(function (res2) {
            if(res2){
                //hvis password passer
                console.log("correct");
                token = user.generateJWT();
                res.json(token);
            } else{
                //password er forkert
                console.log("false");
                res.status(403).json({"message" : "Wrong password!"});
            }
        })
    } else{
        res.status(403).json({"message" : "user does not exist"})
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

//Add Activity to user
module.exports.addActivity = async function(req, res){
    var user = await UserList.findOne({username: req.body.username}).catch(reason => res.render("error", reason));
    if(user){
        let activity = {
            actDate: req.body.actDate,
            actDescription: req.body.actDescription,
            workoutId: req.body.workoutId
        }

        if(activity){
            user.activities.push(activity);
            await user.save();
            res.json(activity);
        }

    }
    else{
        res.status(403).json({"message" : "user does not exist"})
    }
}

//Get all activities to one user and one workout
module.exports.getActivitesUserWok = async function(req, res){
    const user = await UserList.findOne({username: req.body.username}).catch(reason => res.render("error", reason));
    const workout = await WorkoutList.findOne({_id: req.body.id}).catch(reason => res.render("error", reason));
    
    if(user && workout){
        var activities = [];
        user.activities.forEach(activity => {
            if(activity.workoutId == workout._id){
                activities.push(activity);
            }
        });
        res.json(activities);
    }
    else{
        res.status(403).json({"message" : "either user or workout is misssing"})
    }
}