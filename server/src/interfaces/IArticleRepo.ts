import { IArticle } from "../types";


export interface IArticleRepo {
    create(data: IArticle): Promise<IArticle>;
    getArticleByUser(id:string):Promise<any>
    editArticleByUser(id:string,data:any):Promise<boolean>
    deleteArticleByUser(id:string):Promise<boolean>
    getArticlesByPreference(id:string):Promise<IArticle[]|null>
    getUserInteractions(id:string,articleId:string,type:string):Promise<IArticle|null>
}