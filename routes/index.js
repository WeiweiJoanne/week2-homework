// const headers = require('../services/headers')


const Post = require('../models/post')
const HttpController = require('../controllers/http')
const PostController = require('../controllers/post')

const routes = async (req, res) => {
  const {url,method} = req
  let body = ''
  req.on('data', chunk => {
    body += chunk
  })
  if (url == '/' && method == 'GET') {
    PostController.getPost(req, res)
    // const dataPosts = await Post.find()
    // handleSuccess(res, dataPosts)
  } else if (url == '/posts' && method == 'POST') {
    req.on('end', () => {
      PostController.postPost(req, res, body)
      // try {
      //   const data = JSON.parse(body)
      //   const postPost = await Post.create(data)
      //   handleSuccess(res, postPost)
      // } catch (err) {
      //   handleError(res, err)
      // }
    })
  } else if (url == '/posts' && method == 'DELETE') {
    PostController.deleteAll(req, res)
    // try {
    //   const deleteData = await Post.deleteMany({})
    //   handleSuccess(res, deleteData)
    // } catch (err) {
    //   handleError(res, err)
    // }
  } else if (url.startsWith('/posts/') && method == 'DELETE') {
    PostController.deleteOne(req, res)
    // try {
    //   const id = req.url.split('/').pop()
    //   const deleteOne = await Post.findByIdAndDelete(id)
    //   handleSuccess(res, deleteOne)
    // } catch (err) {
    //   handleError(res, err)
    // }

  } else if (url.startsWith('/posts/') && method == 'PATCH') {
    req.on('end', () => {
      PostController.updateOne(req, res,body)
      // try {
      //   const id = req.url.split('/').pop()
      //   const data = JSON.parse(body)
      //   const updateData = await Post.findByIdAndUpdate(id, data, { returnDocument: 'after' })
      //   handleSuccess(res, updateData)
      // } catch (err) {
      //   handleError(res, err)
      // }
    })

  } else if (method == "OPTIONS") {
    HttpController.cors({ res, req })
  } else {
    HttpController.notFound({ res, req })
  }

}

module.exports = routes


