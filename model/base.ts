
import AxiosService from "./axios"

export default  class BaseService extends AxiosService {

    private prefix: any = {}

    constructor( prefix: any = {} )
    {   
        super( )
        this.prefix = prefix
    }

    public create = async (param:any) => {
        return await this.post(`${this.prefix?.create}`, param )
    }

    public readOnly = async (id: any) => {
      return await this.get(`${this.prefix?.read}/${id}` )
  }

    public read = async (param: any) => {
        return await this.get(`${this.prefix?.read}`, { params: param  } )
    }

    public update = async (id: any, param: any) => {
      return await this.put(`${this.prefix?.update}/${id}`, param )
    }

    public destroy = async (id: any) => {
      return await this.delete( `${this.prefix?.delete}/${id}` )
    }

}
