let connection;

module.exports = injectedconnection => {

  connection = injectedconnection

  return {
   registerUserInDB: registerUserInDB,
   getUserFromCrentials: getUserFromCrentials,
   doesUserExist: doesUserExist
 }
}

function registerUserInDB(username, password, registrationCallback){

  const registerUserQuery = `INSERT INTO users (username, user_password) VALUES ('${username}', SHA('${password}'))`;
  connection.query(registerUserQuery, registrationCallback)
}

function getUserFromCrentials(username, password, callback) {

  const getUserQuery = `SELECT * FROM users WHERE username = '${username}' AND user_password = SHA('${password}')`;
  console.log('getUserFromCrentials query is: ', getUserQuery);
  connection.query(getUserQuery, (dataResponseObject) => {
      callback(false, dataResponseObject.results !== null && dataResponseObject.results.length  === 1 ?  dataResponseObject.results[0] : null)
  })
}

function doesUserExist(username, callback) {

  const doesUserExistQuery = `SELECT * FROM users WHERE username = '${username}'`
  const sqlCallback = (dataResponseObject) => {
      const doesUserExist = dataResponseObject.results !== null ? dataResponseObject.results.length > 0 ? true : false : null;
      callback(dataResponseObject.error, doesUserExist)
  }
  connection.query(doesUserExistQuery, sqlCallback)
}
