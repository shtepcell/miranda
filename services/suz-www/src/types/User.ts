export interface User {
    name: string;
    login: string;
    email?: string;
    phone?: string;
    created: Date;
    lastVisited?: Date;
    firtVisited?: Date;
}