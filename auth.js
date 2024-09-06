const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const person = require('./models/person');




// Authentication/Verification Function
passport.use(new localStrategy(async (USERNAME, PASSWORD, done) => {
    // authentication logic here
    try{
        const user = await person.findOne({username: USERNAME});

        if(!user){ 
            return done(null, false, { message: 'Incorrect username.' });
        }
        
        const isPasswordMatch = user.password === PASSWORD ? true : false;
        if(isPasswordMatch){
            return done(null, user);
        }else{
            return done(null, false, {message: 'Incorrect password'});
        }

    }catch(err){
        return done(err);
    }
}))


module.exports = passport; // Export configured passport