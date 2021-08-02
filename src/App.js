import { useState, useEffect } from 'react'

import axios from 'axios'

function App() {
  const [post, setPost] = useState({ content: '', num: 0 })
  const [counter, setCounter] = useState(0)
  const [posts, setPosts] = useState([])
  const [update, setUpdate] = useState(false)
  const [updatedTodo, setUpdatedTodo] = useState({ content: '', num: 0 })
  const [updatedId, setUpdatedId] = useState('')
  const [numPosts, setNumPosts] = useState([])

  const url = 'http://localhost:5000/posts' 

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(url)
      console.log(data)
      setPosts(data)
    }
    getData()
  }, [counter])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('http://localhost:5000/postsTwo')
      console.log(data)
      setNumPosts(data)
    }
    getData()
  }, [counter])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await axios.post(url, post)
    console.log(data) 
    setPost({ content: '', num: 0 })
    setCounter(counter + 1)  
  }
    
  const handleDelete = async (selectedPost) => {
    const { data } = await axios.delete(`${url}/${selectedPost._id}`)
    console.log(data)
    setCounter(counter + 1)
  }

  const handleUpdate = async (selectedPost) => {
    if (update) {
      const { data } = await axios.patch(`${url}/${selectedPost._id}`, updatedTodo)
      console.log(data)
      setUpdatedTodo({ content: '', num: 0 })
      setUpdatedId('')
      setCounter(counter + 1)
    } else {
      setUpdatedTodo({ content: selectedPost.content, num: selectedPost.num })
      setUpdatedId(selectedPost._id)
    }
    setUpdate(!update)
  }

  const getSpecifiedPost = async (selectedPost) => {
    const { data } = await axios.get(`${url}/${selectedPost._id}`)
    console.log(data)
  }

  const increment = async (selectedPost) => {
    const { data } = await axios.patch(`${url}/${selectedPost._id}/inc`, selectedPost)
    console.log(data)
    setCounter(counter + 1)
  }

  const decrement = async (selectedPost) => {
    const { data } = await axios.patch(`${url}/${selectedPost._id}/dec`)
    console.log(data)
    setCounter(counter + 1)
  }

  const updateAll = async () => {
    const { data } = await axios.patch(url)
    console.log(data)
    setCounter(counter + 1)
  }

  const updateAllAnother = async () => {
    const { data } = await axios.patch('http://localhost:5000/postsTwo')
    console.log(data)
    setCounter(counter + 1)
  }

  const deleteOptionTwo = async (selectedPost) => {
    const { data } = await axios.delete(`http://localhost:5000/postsTwo/${selectedPost._id}`)
    console.log(data)
    setCounter(counter + 1)
  }

  const deleteAll = async () => {
    const { data } = await axios.delete('http://localhost:5000/postsTwo')
    console.log(data)
    setCounter(counter + 1)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}> 
        <input type='text' value={post.content} onChange={e => setPost({...post, content: e.target.value})} />
        <input type='number' value={post.num} onChange={e => setPost({...post, num: parseInt(e.target.value)})} />
        <button type='submit'>Submit</button>
      </form>
      {posts.map(post => {
        return (
          <div>
            {update && updatedId === post._id ? <input type='text' value={updatedTodo.content} onChange={e => setUpdatedTodo({...updatedTodo, content: e.target.value})} /> : <p>{post.content}</p>}
            {update && updatedId === post._id ? <input type='number' value={updatedTodo.num} onChange={e => setUpdatedTodo({...updatedTodo, num: parseInt(e.target.value)})}/> : <p>{post.num}</p>}
            <button onClick={() => handleUpdate(post)}>{ update && updatedId === post._id ? 'Update' : 'Edit' }</button>
            <button onClick={() => handleDelete(post)}>Delete</button>
            <button onClick={() => getSpecifiedPost(post)}>Fetch One</button>
            <button onClick={() => increment(post)}>Inc</button>
            <button onClick={() => decrement(post)}>Dec</button>
            <button onClick={() => deleteOptionTwo(post)}>Delete Option Two</button>
          </div>
        )
      })}
      <button onClick={updateAll}>Update All</button>
      <button onClick={updateAllAnother}>Update All Another</button>
      <button onClick={deleteAll}>Delete All</button>
      {/* <h1>{numPosts}</h1> */}
    </div>
  )
}

export default App
