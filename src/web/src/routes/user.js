import { MariaDB } from '../model'
import { isValid } from '../asset/utils'

const router = require('express').Router()
const mariaDB = new MariaDB()

router.get('/', (req, res) => {
    mariaDB.getAllDataSync().then((items) => {
        let result = '<table>'

        for (let idx in items) {
            result += '<tr><td>' + items[idx].ID + '</td><td>' + items[idx].EMAIL + '</td><td>' + items[idx].PASSWORD + '</td><td>' + items[idx].DATE + '</td></tr>'
        }

        result += '</table>'
        res.send(result)
    })
})

router.delete('/', (req, res) => {
    const email = req.query.email
    const password = req.query.password

    if (!isValid(email) || !isValid(password)) {
        res.send('Please enter your email and password correctly')
    } else {
        mariaDB.findUserSync(email, password).then(objUser => {
            if (!objUser) {
                res.send('There is no mail subscription history.')
                return
            }

            mariaDB.deleteUserSync(objUser.ID).then(() => {
                res.send(`The account (${email}) has been deleted.`)
            })
        })
    }
})

router.post('/register', (req, res, next) => {
    const email = req.query.email
    const password = req.query.password

    if (!isValid(email) || !isValid(password)) {
        res.send('Please enter your email and password correctly')
    } else {
        mariaDB.existUserSync(email).then((isExist) => {
            if (!isExist) {
                mariaDB.addUser(email, password)
                res.send(`Your account (${email}) has been created.`)
                return
            }
            res.send(`You already have an account (${email}) registered. Please use another email`)
        })
    }
})

module.exports = router;
