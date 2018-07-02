import React, { Component } from 'react'

import eosJs2Connect from './Crud'
import CreatePost from './Create'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      posts: []
    }
    this.eos = new eosJs2Connect('blog', 'blog')
    this.loadPosts()
  }

  loadPosts = () => {
    this.eos
      .getTableRows('post')
      .then(data => {
        console.log(data)
        this.setState({ posts: data.rows })
      })
      .catch(e => {
        console.error(e)
      })
  }

  createPost = post => {
    this.setState({ loading: true })

    this.setState({ posts: [...this.state.posts, post] })

    this.eos
      .pushTransaction('createpost', {
        author: 'blog',
        ...post
      })
      .then(res => {
        console.log(res)
        this.setState({ loading: false })
      })
      .catch(err => {
        this.setState({ loading: false })
        console.log(err)
      })
  }

  componentDidMount () {
    // this.eosJs2Connect.pushTransaction
    // const dataAPI = 'https://jsonplaceholder.typicode.com'
    // axios.get(dataAPI + '/posts/')
    //   .then((response) => {
    //     this.setState({
    //       data: response.data
    //     })
    //   })
    //   .catch( (error) => {
    //     console.log(error)
    //   }
    // )
  }

  render() {
    return (
      <div className="">
        <CreatePost />
      </div>
    )
  }
}

export default App
