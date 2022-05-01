const Post = require('../models/post')
const handleSuccess = require('../services/handleSuccess')
const handleError = require('../services/handleError')
const post = {
  async getPost(req, res) {
    const dataPosts = await Post.find()
    handleSuccess(res, dataPosts)
  },
  async postPost(req, res, body) {
    try {
      const data = JSON.parse(body)

      if (data.content && data.content.trim() !== '' ) {
        const postPost = await Post.create(data)
        if (postPost !== null) {
          handleSuccess(res, postPost)
        } else {
          handleError(res)
        }
      } else {
        handleError(res)
      }
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
      
      if (deleteOne !== null) {
        handleSuccess(res, deleteOne)
      } else {
        handleError(res)
      }
    } catch (err) {
      handleError(res, err)
    }
  },
  async updateOne(req, res, body) {
    try {
      const id = req.url.split('/').pop()
      const data = JSON.parse(body)

      if (data.content && data.content.trim() !== '') {
        const updateData = await Post.findByIdAndUpdate(id, data, { returnDocument: 'after', runValidators: true })
        if (updateData !== null) {
          handleSuccess(res, updateData)
        }else{
          handleError(res)
        }
      }else{
        handleError(res)
      }

    
    } catch(err) {
    handleError(res, err)
  }
},
}

module.exports = post
