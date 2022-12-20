const express = require('express')
var bodyParser = require('body-parser');
const client = require('./pgconnection')
const { response } = require('express');
var path = require('path');




const app = express()
const port = 3000

app.use(express.static(path.join(__dirname,'/')));
app.set('view engine', 'ejs');


// parse application/x-www-form-urlencoded
app.use(express.json());


const ex1 = ["Kapıda Nakit", "Eren", "Bolukoglu", "email@email.com","05055055555", "25", "Romanya", "bukres","merkez","adres mah adres sok. apt n:2-3", "ron", "149","3","site.com"]

const insertRow = async (ex1) => {
    console.log(ex1)
    try {
        await client.query(
            `INSERT INTO "panel" ("paymentType", "name", "surname", "email", "phonenumber", "productId", "country", "city", "town", "address", "currency", "price", "quantity", "resource")  
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`, ex1); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        //await client.end();               // closes connection
    }
};

const getAllItems = async function(req, res) {
    try{
        const sql = 'SELECT * FROM panel ORDER BY id ASC';
        const results = await client.query(sql);
        res.render("table.ejs", {contacts: results});
    }catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        //await client.end();               // closes connection
        console.log("ok");
    }
};




app.get('/1', getAllItems);

app.post('/panel', function (req, res) {
    var response = [
        req.body.paymentType,
        req.body.name,
        req.body.surname,
        req.body.email,
        req.body.phonenumber,
        req.body.productId,
        req.body.country,
        req.body.city,
        req.body.town,
        req.body.address,
        req.body.currency,
        req.body.price,
        req.body.quantity,
        req.body.resource

    ];
    insertRow(response);
    console.log(response);
    res.end(JSON.stringify(response));
 })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})