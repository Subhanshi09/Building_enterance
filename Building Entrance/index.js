const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const methodOverride=require('method-override');
const Entry = require('./models/records');
const nodemailer=require('nodemailer');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));

mongoose.connect('mongodb+srv://Subhanshi:Subh%40092000@cluster0.tuvrg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(()=>{
        console.log('db connected');
    })
    .catch((err)=>{
        console.log(err);
    })

app.get('/homepage',async(req,res)=>{
    await res.render('home');
})


app.get('/status',async(req,res)=>{
    try{
        const employees=await Entry.find({});
        await res.render('home',{employees});    
    }
    catch(err){
        console.log(err);
    }
    
})

app.get('/',async(req,res)=>{
    await res.redirect("/homepage");
})

app.get('/entry',async(req,res)=>{
    await res.render('entry');
})
app.post('/statuss',async(req,res)=>{
    try{
        const{name,email,phone,cinh,cinm}=req.body;
        const employee=new Entry({
            name,email,phone,cinh,cinm
        });
await employee.save();

        let transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"subhanshi0920@gmail.com",
                pass:"Subh@092000",            
            },
           
        });
        let info=await transporter.sendMail({
            from:'subhanshi0920@gmail.com',
            to:email,
            subject:"Confirmation timings",
            text: `Hello welcome ${name}`, 
            html: `<b>Hello welcome ${name}  you entered at ${cinh}:${cinm}</b>`, 
     
        });

        // const employees=await Entry.find({});
        // await res.render('home',{employees});    
     
        // await Entry.create({name,email,phone,cinh,cinm});
        res.redirect('/status');
    }
    catch(e){
        console.log(e);
    }
})

app.get('/status',async(req,res)=>{
    await res.render('status');
})





































app.listen(3000,()=>{
    console.log('server started at port 3000');
})