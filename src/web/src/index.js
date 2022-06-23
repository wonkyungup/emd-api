require('dotenv').config()

import { MariaDB } from './model'

const express = require('express')
const app = express()
const auth = require('./routes/auth')
const user = require('./routes/user')
const mariaDB = new MariaDB()

MariaDB.initializeDataBase().then(() => {
    mariaDB.initializeDatabaseTable()

    app.use(express.json())
    app.use(express.urlencoded({ extended: true}))
    app.use('/v1/auth', auth)
    app.use('/v1/user', user)

    app.get('/',  (req, res) => {
        const str = 'CRUD Rest API Test \n' +
            '\n' +
            'GET /v1/user \n' +
            'DELETE /v1/user \n' +
            'POST /v1/user/register \n' +
            'POST /v1/auth \n' +
            'GET /v1/auth'
        res.send(str)
    })

    app.listen(3000, () => {
        console.log('Server is working: PORT - ', 3000)
    })
})
