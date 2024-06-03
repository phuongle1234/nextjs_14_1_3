
import axiosService from "../axios";

export class AuthModelView extends axiosService {
    private prefix: any = "/auth/login"

    public login = async (param:any) => {
        return await this.post(this.prefix, param )
    }

}

//export const AuthModelView