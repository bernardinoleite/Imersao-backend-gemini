import "dotenv/config"
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)
// const dbs = await conexao.db().admin().listDatabases();
// console.log(dbs);


export async function getTodosPosts() {
    const db = conexao.db("Imersao-instabytes")
    const colecao = db.collection("posts")

    return await colecao.find().toArray()
}


export async function criarPost(novoPost) {

    const db = conexao.db("Imersao-instabytes")
    const colecao = db.collection("posts")

    return colecao.insertOne(novoPost)

}

export async function atualizarPost(id, postAtualizado) {
    const db = conexao.db("Imersao-instabytes")
    const colecao = db.collection("posts")
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: postAtualizado })
}