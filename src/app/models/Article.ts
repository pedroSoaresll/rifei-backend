import { Schema, model, Document } from 'mongoose'

export interface Tag {
  name: string;
}

export interface Article {
  createdAt: string;
  type: string;
  title: string;
  shortDescription: string;
  tags: Tag[];
  link: string;
}

export interface ArticleDocument extends Article, Document {}

const tagsSchema = new Schema({
  name: {
    required: true,
    type: String
  }
})

const schema = new Schema({
  createdAt: {
    required: true,
    type: String
  },
  type: {
    required: true,
    type: String
  },
  title: {
    required: true,
    type: String
  },
  shortDescription: {
    type: String
  },
  tags: {
    required: true,
    type: [tagsSchema]
  },
  link: {
    required: true,
    type: String
  },
})

export default model<ArticleDocument>('Article', schema)
