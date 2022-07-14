
const { response, request } = require('express');

const usersGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'GET API - Controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usersPost = (req = request, res = response) => {

    const { nombre, edad } = req.body; 

    res.json({
        msg: 'POST API - Controlador',
        nombre,
        edad
    })
}

const usersPut = (req = request, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'PUT API - Controlador',
        id
    })
}

const usersPatch = (req = request, res = response) => {
    res.json({
        msg: 'PATCH API - Controlador'
    })
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE API - Controlador'
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}