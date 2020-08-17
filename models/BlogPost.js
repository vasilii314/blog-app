// Файл с объектом-шаблоном поста в блоге
// Объект-шаблон задает вид постов, которые будут храниться в БД

const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema; //  Возвращает конструктор Schema
// Schema определяет вид модели Model

const BlogPostSchema = new Schema({
  title: String,
  body: String,
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  datePosted: {
    type: Date,
    default: new Date(),
  },
  image: String,
});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema); // метод model получает доступ к подключенной базе данных
// и создает там коллекцию, имя которой есть множественное число первого аргумента данного метода

module.exports = BlogPost;
