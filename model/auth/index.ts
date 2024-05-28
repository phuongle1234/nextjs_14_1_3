
import axios from "axios";

class AuthModelView {
    private prefix: any = "/auth"

    public login = async (param:any) => {
        return axios.post(this.prefix, param )
    }

}

export const Auth = new AuthModelView()