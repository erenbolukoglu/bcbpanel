const { Client } = require('pg');

const client = new Client({
    host: 'dpg-ceg72m94reb3r0r9elvg-a.oregon-postgres.render.com',
    user: 'bcbppanel_user',
    database: 'bcbppanel',
    password: 'X7JYp5czpBZwMoSd5rFxvYdeeypDIeDn',
    port: 5432,
    ssl: true
});

const ex1 = ["Kapıda Nakit", "Eren", "Bolukoglu", "email@email.com","05055055555", "25", "Romanya", "bukres","merkez","adres mah adres sok. apt n:2-3", "ron", "149","3","site.com"]

const insertRow = async (ex1) => {
    console.log(ex1)
    try {
        await client.connect();
        await client.query(
            `INSERT INTO "panel" ("paymentType", "name", "surname", "email", "phonenumber", "productId", "country", "city", "town", "address", "currency", "price", "quantity", "resource")  
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`, ex1); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();               // closes connection
    }
};
