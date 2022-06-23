const mysql = require('mysql')
const STR_DATABASE = 'db_test'
const STR_TABLE = 'members'

export class MariaDB {
    constructor() {
        this._pool = mysql.createPool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: STR_DATABASE
        })
    }

    static initializeDataBase () {
        return new Promise(resolve => {
            this._pool = mysql.createPool({
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD
            })

            this._pool.query(`CREATE DATABASE IF NOT EXISTS ${STR_DATABASE}`, (err) => {
                if (err) {
                    console.log(`initializeDataBase: ${err}`)
                    return
                }

                if (this._pool) {
                    this._pool.end()
                }

                this._pool = null
                resolve()
            })
        })
    }

    initializeDatabaseTable () {
        this._pool.query(`CREATE TABLE IF NOT EXISTS ${STR_TABLE} (ID INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, EMAIL VARCHAR(255) NOT NULL, PASSWORD VARCHAR(255) NOT NULL, DATE DATE NOT NULL)`, (err) => {
            if (err) {
                console.log(`initializeDatabaseTable: ${err}`)
                return
            }
        })
    }

    getAllDataSync () {
        return new Promise(resolve => {
            this._pool.query(`select * from ${STR_TABLE}`, (err, rows) => {
                if (err) {
                    console.log(`getAllDataSync: ${err}`)
                    return
                }
                resolve(rows)
            })
        })
    }

    existUserSync (email) {
        return new Promise(resolve => {
            this._pool.query(`select email from ${STR_TABLE} where email=${JSON.stringify(email)}`, (err, row) => {
                if (err) {
                    console.log(`existUserSync: ${err}`)
                    return
                }

                if (row.length > 0) {
                    resolve(true)
                }

                resolve(false)
            })
        })
    }

    addUser (email, password) {
        this._pool.query(`insert into ${STR_TABLE} (email, password, date) values (${JSON.stringify(email)}, ${JSON.stringify(password)}, now())`, (err) => {
            if (err) {
                console.log(`addUser: ${err}`)
                return
            }
        })
    }

    findUserSync (email, password) {
        return new Promise(resolve => {
            this._pool.query(`select * from ${STR_TABLE} where email=${JSON.stringify(email)} AND password=${JSON.stringify(password)}`, (err, rows) => {
              if (err) {
                  console.log(`findUserSync: ${err}`)
              }

              if (rows.length > 0) {
                  resolve(rows[0])
              }
              resolve(null)
            })
        })
    }

    deleteUserSync (id) {
        return new Promise(resolve => {
            this._pool.query(`delete from ${STR_TABLE} where id = ${id}`, (err) => {
                if (err) {
                    console.log(`deleteUserSync: ${err}`)
                    return
                }

                resolve()
            })
        })
    }
}
