const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    cors = require('cors')

require('dotenv').config()



mongoose.set('debug', true)
// =================== setting to use the body of a request ===================
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// connecting to mongo and checking if DB is running
async function connecting() {
    try {
        await mongoose.connect(`mongodb+srv://geewizz:${process.env.PASSWORD}@30mpd.c6mwg3p.mongodb.net/30mpd?retryWrites=true&w=majority`)
        console.log('Connected to the DB')
    } catch (error) {
        console.log('ERROR: Seems like your DB is not running, please start it up !!!');
    }
}
connecting()

// app.use('/product', productRoute);
// app.use('/category/', categoryRoute);

app.listen(4050, () => console.log(`listening on port 4050`))