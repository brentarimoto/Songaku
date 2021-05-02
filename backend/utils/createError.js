/*************************** HELPER FUNCTIONS ***************************/
function createError(message, title, status, errors=[]){
    const err = new Error(message)
    err.title = title
    err.errors= (errors.length) ? [...errors] : [message];
    err.status= status
    return err
}

/*************************** EXPORTS ***************************/
module.exports = { createError };