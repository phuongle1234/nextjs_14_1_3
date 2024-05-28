
import React  from "react"; 
import { clearFrom, setFormData, setFromContruct } from "@/store/fieldData";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";


type Props = {
	children: React.ReactNode;
};

const initialContext = {
	setFiled: ()=>{}, 
	fields: {},
	fromName: '', 
	setFromName: ()=>{},
	filedData: {},
	dispatch: ()=>{},
	setFormFiled: ()=>{},
	setFromConturct: ()=>{},
	resetFrom:()=>{},
};

export const filedContext: any = React.createContext( initialContext );


export default function FiledProvide({ children }: any) {
	
	const dispatch = useDispatch()
	
	const [fields, setFiled ]: any = React.useState({})
	const [fromName, setFromName]: any = React.useState<string>("")
	
	const filedData = useSelector( (stage:any) => stage?.filedData )

	const setFromConturct = () => dispatch( setFromContruct({ data: fields, filed: fromName }) )
	const resetFrom = () => dispatch( clearFrom() )

    const setFormFiled =  (event :any) => {

       
            const { name, value, checked } = event.target

            if( !Object.keys(fields).includes(name as string) )
                return false

       
            let data: {[key: string] : any } = {}
                data[name] = ( ( fields[name] || {} )?.type == 'boolean' ) ? checked : value

    
            dispatch( setFormData({ data, field: fromName }) )

    }

	return (
		<filedContext.Provider value={{
			setFiled, 
			fields,
			fromName, 
			setFromName,
			filedData,
			dispatch,
			resetFrom,
			setFormFiled,
			setFromConturct
		}}>
			{children}
		</filedContext.Provider >
	)
}