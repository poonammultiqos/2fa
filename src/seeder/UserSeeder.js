let userModel = require('../models/user.model');
module.exports = {
    run: () =>
        new Promise((resolve) => {
            (async () => {
                let user = [
                    {
                        email: "poonam@gmail.com",
                        secret:"7672458347895789347593759"
                    },
                ]

                await userModel.insertMany(user);
                resolve(true);
            })();
        }),
};
