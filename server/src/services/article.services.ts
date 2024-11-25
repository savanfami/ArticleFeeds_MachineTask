import { IArticle } from "../types";
import { IArticleRepo } from "../interfaces/IArticleRepo";
import ErrorResponse from "../utils/errorResponse";

export class ArticleService {
    private articleRepository: IArticleRepo
    constructor(articleRepository: IArticleRepo) {
        this.articleRepository = articleRepository
    }

    async createArticle(data: IArticle): Promise<IArticle | null> {
        try {
            return await this.articleRepository.create(data)
        } catch (error) {
            throw ErrorResponse.badRequest('Error while creating article')
        }
    }

    async getArticleByUser(id: string): Promise<any | null> {
        try {
            return await this.articleRepository.getArticleByUser(id)
        } catch (error) {
            throw ErrorResponse.badRequest('Error while getting article')

        }
    }
    async editArticleByUser(id: string,data:any): Promise<any | null> {
        try {
            return await this.articleRepository.editArticleByUser(id,data)
        } catch (error) {
            throw ErrorResponse.badRequest('Error while editing article')
        }
    }
    async deleteArticleByUser(id: string): Promise<any | null> {
        try {
            return await this.articleRepository.deleteArticleByUser(id)
        } catch (error) {
            throw ErrorResponse.badRequest('Error while deleting article')
        }
    }
    async getArticlesByPreference(id: string): Promise<IArticle[] | null> {
        try {
            return await this.articleRepository.getArticlesByPreference(id)
        } catch (error) {
            throw ErrorResponse.badRequest('Error while deleting article')
        }
    }
    async getUserInteractions(id: string,articleId:string,type:string): Promise<IArticle | null> {
        try {
            return await this.articleRepository.getUserInteractions(id,articleId,type)
        } catch (error) {
            throw ErrorResponse.badRequest('Error while deleting article')
        }
    }


}