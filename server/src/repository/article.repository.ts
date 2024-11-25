import { ArticlModel } from "../models/articleModel";
import { IArticle } from "../types";
import { IArticleRepo } from "../interfaces/IArticleRepo";



export class ArticleRepository implements IArticleRepo {
    async create(data: IArticle): Promise<IArticle> {
        return await ArticlModel.create(data) as unknown as IArticle
    }

    async getArticleByUser(id: string): Promise<any> {
        return await ArticlModel.find({ userId: id })
    }
    async editArticleByUser(id: string, data: any): Promise<any> {
        const updatedArticle = await ArticlModel.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
            }
        );
        console.log(updatedArticle, 'updted artilce')
        if (updatedArticle) {
            return true
        } else {
            return false
        }
    }
    async deleteArticleByUser(id: string): Promise<boolean> {
        const deleteArtilce = await ArticlModel.findByIdAndDelete(
            id
        )
        if (deleteArtilce) {
            return true
        } else {
            return false
        }
    }

    
}