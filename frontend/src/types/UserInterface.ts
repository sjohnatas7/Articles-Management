export default interface IUser{
    id: string | number,
    name: string,
    email: string,
    admin : boolean,
    confirmPassword? :string
}