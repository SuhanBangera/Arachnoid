import { ArachnoidMiddleware, Middleware } from "./types";

const createMiddleware = (middleware:Middleware, ignore?:string[]):ArachnoidMiddleware=>{
    return {
        middleware, 
        ignore
    }
}; 

export default createMiddleware;