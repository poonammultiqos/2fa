require('./index');
require('./src/connections/db');
const promises = [];

promises.push(require(`./src/seeder/UserSeeder.js`).run());

Promise.all(promises)
.then(()=> {
    console.log('Seeder Completed');
},(err) => {
    console.log("Seeder error : ",err);
});