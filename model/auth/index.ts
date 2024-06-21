
import axiosService from "../axios";

export class AuthModelView extends axiosService {
    private prefix: any = "/auth"

    constructor( request: any = null )
    {        
        super( request );
    }

    public login = async (param:any) => {
        return await this.post(`${this.prefix}/login`, param )
    }

    public me = async () => {
        return await this.get(`${this.prefix}/me` )
    }

}

export default new AuthModelView()