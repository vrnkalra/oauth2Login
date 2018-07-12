let connection

module.exports = injectedconnection => {

  connection = injectedconnection

  return {
   saveAccessToken: saveAccessToken,
   getUserIDFromBearerToken: getUserIDFromBearerToken
 }
}

function saveAccessToken(accessToken, userID, callback) {

  const getUserQuery =  `INSERT INTO access_tokens (access_token, user_id) VALUES ("${accessToken}", ${userID}) ON DUPLICATE KEY UPDATE access_token = "${accessToken}";`

  connection.query(getUserQuery, (dataResponseObject) => {

      callback(dataResponseObject.error)
  })
}

function getUserIDFromBearerToken(bearerToken, callback){

  const getUserIDQuery = `SELECT * FROM access_tokens WHERE access_token = '${bearerToken}';`

  connection.query(getUserIDQuery, (dataResponseObject) => {

      const userID = dataResponseObject.results != null && dataResponseObject.results.length == 1 ?
                                                              dataResponseObject.results[0].user_id : null

      callback(userID)
  })
}
