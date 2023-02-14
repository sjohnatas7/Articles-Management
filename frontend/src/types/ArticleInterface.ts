export default interface IArticle{
    imageUrl: string,
    id: number | null | string,
    userId: number | null,
    categoryId: number | null,
    description: string ,
    content: string,
    name: string
}