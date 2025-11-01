export interface ApiResponse<T>{
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}


export interface User{
    id:number;
    name:string;
    email:string;
    created_at:Date;
}

export interface ButtonProps{
    text:string;
    onClick:()=>void;
    disabled?: boolean;
}

export interface DatabaseTime{
    timestamp:{
        now: string;
    };
}