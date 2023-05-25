import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '689101101024Edu',
    database: 'likeme',
    allowExitOnIdle: true
})

const getPosts = async () => {
    try {
        const consulta = "SELECT * FROM posts"
        const result = await pool.query(consulta)
        return result.rows
    } catch (error) {
        console.error(error)
        res.status(500).send('Error en la consulta para obtener los posts')
    }

}

const addPost = async (titulo, img, descripcion, likes) => {
    try {
        const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)"
        const values = [titulo, img, descripcion, likes]
        await pool.query(consulta, values)
    } catch (error) {
        console.error(error)
        throw new Error("Error al intentar registrar un post")
    }
}

const deletePost = async (id) => {
    try {
        const consulta = "DELETE FROM posts WHERE id = $1"
        const values = [id]
        await pool.query(consulta, values)
    } catch (error) {
        console.error(error)
        throw new Error("Error al eliminar el posts")
    }
}

const likePost = async (id, likes) => {
    try {
        const consulta = "UPDATE posts SET likes = $2 WHERE id = $1"
        const values = [id, likes]
        console.log(values)
        await pool.query(consulta, values)
    } catch (error) {
        throw new Error('Error al dar like')
    }
}


export { getPosts, addPost, deletePost, likePost }