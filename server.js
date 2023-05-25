import express from "express"
const app = express()
import cors from 'cors'

import { getPosts, addPost, deletePost, likePost } from "./index.js"

// middleware
app.use(express.json())
app.use(cors())

app.listen(3001, console.log('!Servidor encendido¡'))

app.get('/posts', async (req, res) => {
    try {
        const posts = await getPosts()
        res.json(posts)

    } catch (error) {
        console.error(error)
        res.status(500).send('Error al obtener los posts')
    }

})

app.post('/posts', async (req, res) => {
    try {
        const { titulo, img, descripcion, likes } = req.body
        const post = await addPost(titulo, img, descripcion, likes)
        res.json('Post agregado')
    } catch (error) {
        console.error(error)
        throw new Error('Error al registrar post')
    }
})

app.delete('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params
        await deletePost(id)
        res.send('Posts eliminado con éxito')
    } catch (error) {
        console.error(error)
        throw new Error('Post eliminado con éxito')
    }
})

app.put('/posts/like/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { likes } = req.body;
        likePost(id, likes);
        res.sendStatus(200);
    } catch (error) {
        throw new Error('Error en dar like')
    }
   
  });