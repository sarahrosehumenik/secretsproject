const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

const nameArray = ["ligma", "bofa", "milkums", "thickums", 'daddy', 'lil-mamma', 'ussy', 'simp', 'dilf', 'michaelsiller', 'skeet', 'thickums', 'shawty', 'glizums', 'katyperry', 'snookums', 'baddy', 'big-daddy', 'lil-papi',
    "tito-huncho", "req.body", "ben_dover"
]
function random(randomize) {
    const randomArray = nameArray[Math.floor(nameArray.length * Math.random(randomize))]
    return randomArray
}

passport.use(
    new GoogleStrategy(
        // Configuration object
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK
        },
        // The verify callback function
        function (accessToken, refreshToken, profile, cb) {
            // a user has logged in with OAuth...
            User.findOne({ googleId: profile.id }).then(async function (user) {
                if (user && user.banned === true) return cb((err) => { "u banned bitch" });
                if (user && user.banned === false) return cb(null, user);
                // We have a new user via OAuth!

                try {
                    user = await User.create({

                        googleId: profile.id,
                        name: random() + profile.id.toString().slice(-4),

                        banned: false,
                    });
                    return cb(null, user);
                } catch (err) {
                    return cb(err);
                }
            });
        }
    )
);

passport.serializeUser(function (user, cb) {
    cb(null, user._id);
});

passport.deserializeUser(function (userId, cb) {
    User.findById(userId).then(function (user) {
        cb(null, user);
    });
});



