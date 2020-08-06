const dummy = (blogs) => {
    return 1
}

const count = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }
    if (blogs.length === 0) {
        return 0
    } else {
        return blogs.map(blog => blog.likes).reduce(reducer, 0)
    }
}

const largest = (blogs) => {
    const likesList = blogs.map(blog => blog.likes)
    return blogs.length === 0
        ? {}
        : blogs[likesList
            .indexOf(Math.max(...likesList))]
}

module.exports = {
    dummy,
    count,
    largest
}