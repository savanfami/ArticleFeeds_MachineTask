import { ArticlModel } from "../models/articleModel";
import { IArticle } from "../types";
import { IArticleRepo } from "../interfaces/IArticleRepo";
import { UserModel } from "../models/userModel";



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
    async getArticlesByPreference(id: string): Promise<IArticle[] | null> {
        const userPreferences = await UserModel.findOne({ _id: id }, { preferences: 1, _id: 0 })
        const getArticles = await ArticlModel.find({
            references: { $in: userPreferences?.preferences },
        }).populate("userId", "firstName");
        if (getArticles) {
            return getArticles as unknown as IArticle[]
        } else {
            return null
        }
    }
    async getUserInteractions(userId: any, articleId: string, type: string): Promise<IArticle | null> {
        try {
            const article = await ArticlModel.findById(articleId);

            if (!article) {
                return null;
            }

            if (typeof article.likes !== 'number') article.likes = 0;
            if (typeof article.dislikes !== 'number') article.dislikes = 0;

            const existingInteractionIndex = article.userInteractions.findIndex(
                (interaction) => interaction.userId.toString() === userId
            );

            if (existingInteractionIndex !== -1) {
                const existingType = article.userInteractions[existingInteractionIndex].type;

                if (existingType === 'like') article.likes = Math.max(0, article.likes - 1);
                if (existingType === 'dislike') article.dislikes = Math.max(0, article.dislikes - 1);

                article.userInteractions.splice(existingInteractionIndex, 1);
            }

            if (type) {
                article.userInteractions.push({ userId, type });

                if (type === 'like') article.likes++;
                if (type === 'dislike') article.dislikes++;
            }

            await article.save();

            return article as unknown as IArticle;
        } catch (error) {
            console.error(error);
            return null;
        }
    }



}