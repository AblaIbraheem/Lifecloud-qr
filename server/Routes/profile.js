
const Router = require('express')
const { profileModel } = require('./../models/Profile')
const ProfileRouter = Router();
const multer = require('multer')
var storage = multer.diskStorage({
    destination: "picUploader/",
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
let uploadpic = multer({ storage: storage });
// const multerConfig = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, '/public')
//     },
//     filename: (req, file, callback) => {
//         const ext = file.mimetype.split('/')[1];
//         callback(null, `image-${Date.now()}.${ext}`)
//     }
// })
// const isIMage = (req, file, cb) => {
//     if (file.mimetype.startsWith('image')) {
//         cb(null, true)
//     } else {
//         cb(new Error('only mage is allowed'))
//     }

// }
// const upload = multer({
//     storage: multerConfig,
//     fileFilter: isIMage
// })
// create profile
ProfileRouter.post('/createProfile', uploadpic.fields([{ name: 'profileImg', maxCount: 1 }, { name: 'wallImg', maxCount: 1 }]), async (req, res) => {
    try {
        //gen new password
        console.log(req.body, 'body')
        console.log(req.files.profileImg[0].path.slice(13), 'file')
        //new user
        let newUser = new profileModel({
            originalUser: req.body.originalUser,
            profileImg: req.files.profileImg[0].path.slice(13),
            wallImg: req.files.wallImg[0].path.slice(13),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            birthDate: req.body.birthDate,
            deathDate: req.body.deathDate,
            wazeLocation: req.body.wazeLocation,
            googleLocation: req.body.googleLocation,
            lifeAxis: req.body.lifeAxis,
        });

        //   //save and response
        newUser.save().then(resp => {
            res.send(resp)
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = { ProfileRouter };