const appServer= require('./app/app.js');
const db= require("./app/db.js");

const main = async () => {
  await db();
};



main();

appServer.listen(5000, () => {
  console.log("servidor online");
});








