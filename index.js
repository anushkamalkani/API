var express = require('express');
const joi = require('joi');
const app = express();
app.use(express.json());


const Client = require('pg').Client;
const client = new Client({
    
    user : "postgres",
    password : "postgres",
    host :"localhost",
    port: 5432,
    database: "postgres"

});

var print;
client.connect()
.then(()=> console.log("connected successfully"))
.then(() => client.query("Select * from PersonalDetails.jobs"))
.then(results => console.table(results.rows))
.catch(e => console.log(e))
//.finally(()=> client.end())

app.get('/', async (req,res)=>{
    await res.send('Welcome to RESTAPI');
});

app.get('/api/jobs', async (req,res) =>{
    results= await client.query("Select * from PersonalDetails.jobs")
    console.table(results.rows);
    console.log('\n');
    res.send(results.rows);

});

app.get('/api/candidate/user/:Userid',async (req,res) =>{
    results= await client.query("Select * from PersonalDetails.Candidate where UserID=$1",[req.params.Userid])
    console.table(results.rows)

    if(!results) 
        res.status(404).send(`Sorry!Can't find what you are looking for!`);
    res.send(results.rows);
});

app.get('/api/candidate/skills/:skill',async (req,res) =>{
    results= await client.query("Select * from PersonalDetails.jobs where skills=$1",[req.params.skill])
    console.table(results.rows)

    if(!results) 
        res.status(404).send(`Sorry!Can't find what you are looking for!`);
    res.send(results.rows);
});

app.get('/api/candidate/company/:company',async (req,res) =>{
    results= await client.query("Select * from PersonalDetails.jobs where company=$1",[req.params.company])
    console.table(results.rows)

    if(!results) 
        res.status(404).send(`Sorry!Can't find what you are looking for!`);
    res.send(results.rows);
});
app.get('/api/candidate/company/:company',async (req,res) =>{
    results= await client.query("Select * from PersonalDetails.jobs where company=$1",[req.params.company])
    console.table(results.rows)

    if(!results) 
        res.status(404).send(`Sorry!Can't find what you are looking for!`);
    res.send(results.rows);
});

// app.post('/api/candidate/company/:company',async (req,res) =>{
//     results= await client.query("Select * from PersonalDetails.jobs where company=$1",[req.params.company])
//     console.table(results.rows)

//     if(!results) 
//         res.status(404).send(`Sorry!Can't find what you are looking for!`);
//     res.send(results.rows);
// });


 app.get('/api/candidate',async (req,res)=>{
     const{error}= await validateCandidate(req.body);
     if(error){
         res.status(400).send(error.details[0].message)
         return;
     }
});





 
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));