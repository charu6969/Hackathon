const caption = "This is a baingun";
module.exports = { caption };

const express = require('express');
const app = express();
const multer= require('multer');
const path=require('path');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({extended: true}))

app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Make sure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});



app.get('/homepage', (req,res) =>{
    res.render('homepage')
})

app.get('/upload', (req,res) => {
    console.log("Hello")
    res.render('uploadPage')
})

/*app.get('/results', async (req,res) =>{
    res.render("result")
})*/

app.get('/results/:filename', (req, res) =>{
    res.render('result',{filename: req.params.filename});
})

app.post('/homepage', async(req,res) =>{
    res.redirect(`upload`)
})

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const userCaption = req.body.caption || caption;
    res.render('result',{
        filename:req.file.filename,
        caption: userCaption
    })
});

app.post('/results', (req, res) => {
    res.redirect('/upload');
});


/*app.post('/upload',(req,res) =>{
    res.redirect(`/results/${req.file.filename}`)
})

app.post('/results', (req,res) =>{
    res.redirect(`upload`)
})*/

app.listen(3000, () =>{
    console.log("App is listening on port 3000!")
})