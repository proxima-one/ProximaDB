const client = require('../client')



client.create("New_Index_Test", (error, index) => {
    if (!error) {
        console.log(index)
    } else {
        console.error(error)
    }
})
