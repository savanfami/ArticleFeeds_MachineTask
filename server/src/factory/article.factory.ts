import { ArticleService } from "../services/article.services"
import { ArticleRepository } from "../repository/article.repository"

export class ArticleFactory {
    static CreateArticleFactory(): ArticleService {
        const articleRepository = new ArticleRepository()
        const articleService = new ArticleService(articleRepository)
        return articleService
    }
}