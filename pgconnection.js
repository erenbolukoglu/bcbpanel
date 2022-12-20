const pg = require('pg')
const client = new pg.Client({
    host: 'dpg-ceg72m94reb3r0r9elvg-a.oregon-postgres.render.com',
    user: 'bcbppanel_user',
    database: 'bcbppanel',
    password: 'X7JYp5czpBZwMoSd5rFxvYdeeypDIeDn',
    port: 5432,
    ssl: true
});
client.connect()
module.exports = client