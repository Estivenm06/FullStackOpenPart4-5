import _ from 'lodash'
export const dummy = (blogs) => {
  return 1
}

export const totalLikes = blogs => {
  const blog = blogs.map((element) => {
    return element.likes
  })
  const reducer = (sum, item) => {
    return sum + item
  }
  return blogs.length === 0
    ? 0
    : blog.reduce(reducer, 0)
}

export const favoriteBlog = blogs => {
  const blog = blogs.map(element => element.likes)
  const mostLikes = blog.indexOf(Math.max(...blog))
  const index = blog[mostLikes]
  return blogs.length === 0
    ? 0
    : { title: index.title, author: index.author, likes: index.likes }
}

export const mostBlogs = blogs => {
  const blog = blogs.map(element => element.author)
  let author = _
    .chain(blog)
    .countBy()
    .entries()
    .maxBy(_.last)
    .thru(_.head)
    .value()
  let blogs_amount = 0
  blog.forEach(element => {
    if(element === author){
      blogs_amount += 1
    }
  })
  return{
    author : author,
    blogs: blogs_amount
  }
}

export const mostLikes = blogs => {
  const blog = _.groupBy(blogs, 'author')
  const author = _.map(blog, (array) => {
    return{
      author: array[0].author,
      likes: _.sumBy(array, 'likes')
    }
  })

  const maxLikes = _.maxBy(author, 'likes')
  return{
    author: maxLikes.author,
    likes: maxLikes.likes
  }
}