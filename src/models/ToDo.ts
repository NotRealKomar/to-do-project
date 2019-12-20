export default class ToDo{
    id: string;
    title: string;
    content: string;
    datePublished: Date;

    constructor(id: string, title: string, content: string){
        this.id = id;
        this.title = title;
        this.content = content;
        this.datePublished = new Date();
    }
}