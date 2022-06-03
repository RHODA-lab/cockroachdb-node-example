var serviceBindings = require('kube-service-bindings');
var _db;
var { Pool } = require("pg");
var fs = require('fs');


var bindings;
try {
    // check if the deployment has been bound to a pg instance through
    // service bindings. If so use that connect info
    bindings = serviceBindings.getBinding('POSTGRESQL', 'pg');
    console.log('check bindings');
    console.log(bindings);
    console.log('verifying if cert can be read from the binding object:');
    console.log(bindings["root.crt"]);
} catch (err) { // proper error handling here
    console.log('bindings failed');
};


const pool = new Pool({
    user: bindings.user,
    password: bindings.password,
    host: bindings.host,
    database: bindings.database,
    port: bindings.port,
    sslmode: bindings.sslmode,
    options: bindings.options,
    ssl: {
        rejectUnauthorized: false,
        ca: bindings["root.crt"].toString()
    }
})

//checking connection with pg driver to cockroachdb
pool
  .connect()
  .then(client => {
    console.log('connected')
    client.release()
  })
  .catch(err => console.error('error connecting', err.stack))
  .then(() => pool.end())

var create_database = "CREATE TABLE IF NOT EXISTS highscores ( name STRING NOT NULL, cloud STRING NOT NULL, zone STRING NOT NULL, host STRING NOT NULL, score INT NOT NULL, level INT NOT NULL, date DATE NOT NULL, referer STRING NOT NULL, user_agent STRING NOT NULL, hostname STRING NOT NULL, ip_addr STRING NOT NULL)";

pool.query(create_database, function(err, rows){
        if(err){
            console.error(err);
            callback(err, rows);
            return;
        }else{
            console.log(rows);
            callback(err, rows);
            return;
        }
    });

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/drivers/node/ for more details
     */
    //const url = bindings.url + '?retryWrites=true&w=majority';
    const url = "uniinitialized";
    console.log('check url 1001');
    console.log(url);
    
    console.log('check client');
    //console.log(client);
    
    //await sleep(1500000000);
}

main().catch(console.error);

