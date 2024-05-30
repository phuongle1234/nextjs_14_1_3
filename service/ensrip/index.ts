import { Stream } from "stream";
import CryptoJS from "crypto-js";
import getConfig from "next/config";
import { getCookie } from "cookies-next";


const { AES_KEY, AES_IV }: any = process.env

const key = CryptoJS.enc.Utf8.parse(AES_KEY);
const iv = CryptoJS.enc.Utf8.parse(AES_IV);

export const parseUtf8 = (data :any) => {
    return CryptoJS.AES.encrypt( JSON.stringify(data), key, { iv: iv } );
}

export const decodeUtf8 = (data :any) => {    
    const bytes = CryptoJS.AES.decrypt(data, key, {iv: iv,});
    return JSON.parse( bytes.toString(CryptoJS.enc.Utf8) );
}



 
