// Signin

Router.route("/sign-in").post(async (req, res) => {
    const {
        username,
        password
    } = req.body;

    try {
        let user = await User.find({
            username
        })

        if(!user.length) {
            res.status(400).json({
                message: "User does not exist"
            })
            return;
        }

        user = user[0]

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            res.status(400).json({
                message: 'Invalid password'
            })
            return;
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.ENCRYPTION_STRING,
            { expiresIn: 10000 },
            (err, token) => {
                if(err) throw err;

                res.status(200).json({
                    user,
                    token
                })
                return;
            }
        );
    } catch(e) {
        res.status(500).json({
            message: 'Error: ' + e
        })
    }
})

module.exports = Router