'use client'
import React  from "react"; 
import { setFormData, setFromContruct } from "@/store/fieldData";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Value } from "sass";


type Props = {
	children: React.ReactNode;
};

const initialContext = {
	check: {}
};

export const FiledContext = React.createContext( initialContext ) as any;


export default function FiledProvider({ children }: any) {
	
	const dispatch = useDispatch()
	
	const [setFiled, fields]: any = React.useState({})
	const [fromName, setFromName]: any = React.useState<string>("")

	const filedData = useSelector( (stage:any) => stage?.filedData )

	const setFromConturct = () => {
		dispatch( setFromContruct({ data: fields, filed: fromName }) )
	}

    const setFormFiled =  (event :any) => {

       
            const { name, value, checked } = event.target

            if( !Object.keys(fields).includes(name as string) )
                return false

       
            let data: {[key: string] : any } = {}
                data[name] = ( ( fields[name] || {} )?.type == 'boolean' ) ? checked : value

    
            dispatch( setFormData({ data, field: fromName }) )

    }

	return (
		<FiledContext.Provider Value={{
			setFiled, fields,
			fromName, setFromName,
			filedData,
			dispatch,
			setFormFiled
		}}>
			{children}
		</FiledContext.Provider>
	)
}