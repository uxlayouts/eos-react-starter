import React, { Component } from 'react'

class CreatePost extends Component {
  state = {
    title: '',
    content: '',
    tag: ''
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  createPost = e => {
    e.preventDefault()
    this.props.createPost({ ...this.state, likes: 0 })
    this.setState({
      title: '',
      content: '',
      tag: ''
    })
  }

  render() {
    return (
      <div className="Post">
        <form onSubmit={this.createPost} className="CreatPost">
          <div>
            <input
              name="title"
              type="text"
              onChange={this.handleOnChange}
              value={this.state.title}
              placeholder="Title"
            />
          </div>
          <div>
            <input
              name="content"
              onChange={this.handleOnChange}
              value={this.state.content}
              rows={4}
              placeholder="Content"
            />
          </div>
          <div>
            <input
              name="tag"
              onChange={this.handleOnChange}
              value={this.state.tag}
              placeholder="Tag"
            />
          </div>
          <button
            onClick={this.createPost}
            type="primary"
            className="login-form-button"
          >
            Create
          </button>
        </form>
      </div>
    )
  }
}

export default CreatePost
