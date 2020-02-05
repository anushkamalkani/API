const Client = require('pg').Client;
const client = new Client({
    
    user : "postgres",
    password : "postgres",
    host :"localhost",
    port: 5432,
    database: "postgres"

});
execute()
async function execute(){

     await client.connect()
     console.log("connected successfully")
     const results = await client.query("Select * from PersonalDetails.Candidate")
     console.table(results.rows)
     await client.end()
     console.log("client disconnected")

}

