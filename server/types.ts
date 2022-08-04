


import { RequestHandler } from "express"

export interface student {
    id : string , 
    name : string , 
    phone : string , 
    parentPhone : string 
    grade : string  ,
    group : String  , 
    type : string 
}


/* Type checking */

export type  typeValidation<req , res>  = RequestHandler<
any,
Partial<message<res>> , 
Partial<req> , 
any
> 

export type message<T> = T & {message : string }