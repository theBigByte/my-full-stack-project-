export interface User
{
id:number;
name:string;
email:string;
created_at:Date;
}
export interface ApiResponse<T>
{
success:boolean;
data?:T;
message?:string;
error?:string;
}
// properties// Example: Extend Express Request with custom properties
import {Request} from 'express';
export interface CustomRequest extends Request
{
userId?:number;
}