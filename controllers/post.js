const Post = require('../models/post')
const handleSuccess = require('../services/handleSuccess')
const handleError = require('../services/handleError')
const post = {
  async getPost(req,res){
    const dataPosts = await Post.find()
    handleSuccess(res, dataPosts)
  },
  async postPost(req,res,body){
      try {
        const data = JSON.parse(body)
        const postPost = await Post.create(data)
        handleSuccess(res, postPost)
      } catch (err) {
        handleError(res, err)
      }
  },
  async deleteAll(req, res) {
    try {
      const deleteData = await Post.deleteMany({})
      handleSuccess(res, deleteData)
    } catch (err) {
      handleError(res, err)
    }
  },
  async deleteOne(req, res) {
    try {
      const id = req.url.split('/').pop()
      const deleteOne = await Post.findByIdAndDelete(id)
      handleSuccess(res, deleteOne)
    } catch (err) {
      handleError(res, err)
    }
  },
  async updateOne(req, res, body) {
    try {
      const id = req.url.split('/').pop()
      const data = JSON.parse(body)
      const updateData = await Post.findByIdAndUpdate(id, data, { returnDocument: 'after' })
      handleSuccess(res, updateData)
    } catch (err) {
      handleError(res, err)
    }
  },
}

module.exports = post
