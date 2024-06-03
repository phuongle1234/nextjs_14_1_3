import { Stream } from "stream";
import CryptoJS from "crypto-js";
import getConfig from "next/config";
import { getCookie } from "cookies-next";


// const { AES_KEY, AES_IV }: any = process.env

// const key = CryptoJS.enc.Utf8.parse(AES_KEY);
// const iv = CryptoJS.enc.Utf8.parse(AES_IV);

// export const parseUtf8 = (data :any) => {
//     return CryptoJS.AES.encrypt( JSON.stringify(data), key, { iv: iv } );
// }

// export const decodeUtf8 = (data :any) => {    
//     const bytes = CryptoJS.AES.decrypt(data, key, {iv: iv,});
//     return JSON.parse( bytes.toString(CryptoJS.enc.Utf8) );
// }

class cryptoUtf8 {
    private key: any
    private iv: any

    constructor(){
        const { AES_KEY, AES_IV }: any = process.env
        
        this.key = CryptoJS.enc.Utf8.parse(AES_KEY)
        this.iv = CryptoJS.enc.Utf8.parse(AES_IV)
    }

    public parse = (data :any) => {
        return CryptoJS.AES.encrypt( JSON.stringify(data), this.key, { iv: this.iv } );
    }

    public decode = (data :any) => {
        return CryptoJS.AES.decrypt( JSON.stringify(data), this.key, { iv: this.iv } );
    }
}

export const cryptoAES = new cryptoUtf8()



 
