import { Request, Response, NextFunction } from 'express';
import ErrorResponse from "../utils/errorResponse";
import { JwtPayload } from "jsonwebtoken";
import { ArticleFactory } from '../factory/article.factory';

interface CustomJwtPayload extends JwtPayload {
    id: string;
}
export interface ModifiedRequest extends Request {
    user: CustomJwtPayload;
}


export class ArticleController {
    private articleService = ArticleFactory.CreateArticleFactory()
    async createArticle(req: ModifiedRequest, res: Response, next: NextFunction) {
        try {
            const { data }: { data: any } = req.body
            console.log(data, 'data form create article')
            const { id } = req.user
            const updatedBody = {
                ...data,
                userId: id
            }
            const article = await this.articleService.createArticle(updatedBody)
            console.log(article, 'articlessdds')
            if (!article) throw ErrorResponse.badRequest('Cant create article')
            res.status(200).json({ success: true, data: article, message: 'article created succesfully' })
        } catch (error) {
            next(error)
        }
    }

    async getArticlesByUser(req: ModifiedRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.user
            const article = await this.articleService.getArticleByUser(id)
            if (!article) throw ErrorResponse.badRequest('Cant get article')
            res.status(200).json({ success: true, data: article, message: 'article fetched succesfully' })
        } catch (error) {
            next(error)
        }
    }

    async editArticleByUser(req: ModifiedRequest, res: Response, next: NextFunction) {
        try {
            const {articleId}=req.params
            const article = await this.articleService.editArticleByUser(articleId,req.body)
            if (!article) throw ErrorResponse.badRequest('Cant update article')
            res.status(200).json({ success: true, data: article, message: 'article updated succesfully' })
        } catch (error) {
            next(error)
        }
    }
    async deleteArticleByUser(req: ModifiedRequest, res: Response, next: NextFunction) {
        try {
            const {articleId}=req.params
            const article = await this.articleService.deleteArticleByUser(articleId)
            if (!article) throw ErrorResponse.badRequest('Cant delete article')
            res.status(200).json({ success: true, data: article, message: 'article deleted succesfully' })
        } catch (error) {
            next(error)
        }
    }

}

