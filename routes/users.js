const {User, validate} = require("../models/user");
const router = require("express").Router();


router.post("/", async (req, res)=>{
    try{
        const {error} = validate(req.body);
        if (error)
        return res.status(400).send({ message: error.details[0].message });

        const user =  await new User(req.body).save();
        res.send(user);

    } catch(error){
        res.send("An error occured");
        console.log(error);
    }
})

module.exports = router;
