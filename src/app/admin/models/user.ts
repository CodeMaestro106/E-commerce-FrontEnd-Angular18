export class User  {
    id: number;
    username: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    constructor(
        id: number = 0,
        username: string = '',
        email: string = '',
        createdAt: string = '',
        updatedAt: string = '',
        role : string = '',
      ) {
        this.id = id;
        this.role = role;
        this.username = username;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
      }
}