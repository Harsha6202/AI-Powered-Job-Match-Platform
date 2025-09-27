const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const { User } = require('../models/user');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8080/api/auth/google/callback",
            scope: ['profile', 'email']
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists
                let user = await User.findOne({ email: profile.emails[0].value });

                if (!user) {
                    // Create new user if doesn't exist
                    user = await User.create({
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: profile.emails[0].value,
                        password: Math.random().toString(36).slice(-8), // Random password
                        googleId: profile.id,
                    });
                } else if (!user.googleId) {
                    // If user exists but never used Google auth
                    user.googleId = profile.id;
                    await user.save();
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
    done(error, null);
}
});

// GitHub Strategy
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "http://localhost:8080/api/auth/github/callback",
            scope: ['user:email']
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Get primary email from GitHub profile
                const primaryEmail = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
                
                if (!primaryEmail) {
                    return done(new Error('No email found in GitHub profile'), null);
                }

                // Check if user already exists
                let user = await User.findOne({ email: primaryEmail });

                if (!user) {
                    // Create new user if doesn't exist
                    const names = profile.displayName ? profile.displayName.split(' ') : [profile.username, ''];
                    user = await User.create({
                        firstName: names[0],
                        lastName: names[1] || '',
                        email: primaryEmail,
                        password: Math.random().toString(36).slice(-8), // Random password
                        githubId: profile.id,
                    });
                } else if (!user.githubId) {
                    // If user exists but never used GitHub auth
                    user.githubId = profile.id;
                    await user.save();
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);