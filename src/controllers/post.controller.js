import fs from "fs"
import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiServices.js";


export async function listarPosts(req, res) {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body;

    try {
        const postCriado = await criarPost(novoPost);
        res.status(201).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            "Erro": "Falhar na requisicao"
        })
    }

}

export async function uploadImagem(req, res) {

    const novoPost = {
        Descricao: "gato post",
        ImgUrl: req.file.originalname,
        Alt: "gato fazendo um post"
    }
    try {
        const postCriado = await criarPost(novoPost);
        const arquivoAtualizado = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, arquivoAtualizado)
        res.status(201).json(postCriado);
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            "Erro": "Falha na requisicao"
        })
    }

}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:2908/${id}.png`

    try {
        const imgBuffer = fs.readFileSync("uploads/" + id + ".png")
        const descricao = await gerarDescricaoComGemini(imgBuffer)
        const postAtualizado = {
            ImgUrl: urlImagem,
            Descricao: descricao,
            Alt: req.body.alt
        }
        const postCriado = await atualizarPost(id, postAtualizado);
        res.status(201).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            "Erro": "Falhar na requisicao"
        })
    }

}