require('dotenv').config()

let PORT = process.env.PORT
let BLOG_URI = process.env.BLOG_URI

if (process.env.NODE_ENV === 'test') {
    BLOG_URI = process.env.TEST_BLOG_URI
}

module.exports = {
    PORT,
    BLOG_URI
}