var serviceBindings = require('kube-service-bindings');
var _db;

var bindings;
try {
    // check if the deployment has been bound to a pg instance through
    // service bindings. If so use that connect info
    bindings = serviceBindings.getBinding('POSTGRESQL', 'pg');
    console.log('check bindings');
    console.log(bindings);
} catch (err) { // proper error handling here
    console.log('bindings failed');
};

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

}

main().catch(console.error);

