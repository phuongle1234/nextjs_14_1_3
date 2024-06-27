
import React from "react";
//import { clearFrom, setFormData, setFromContruct } from "@/store/fieldData";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import getConfig from "next/config";
import { setAttributes as setAuth } from "@/store/Auth";
import * as archive from "@/store/Kernel"
import { intItems, initFormInfo } from "@/traits/store";
import { initMutiFormInfo } from "@/traits/store/multi_rows";
import debounce from 'debounce';
import { checkValidMutiRow, mapValueFileds, setFiledData, setFromConturct } from "@/traits/provider/fields";
import { fetchs } from "@/traits/provider/CRUD";

type Props = {
	children: React.ReactNode;
};

const { publicRuntimeConfig } = getConfig();
const { SOCKET_URL } = publicRuntimeConfig;

const initialContext = {
	setOwnStore: () => { },
	ownStore: "",
	setFiled: () => { },
	fields: {},
	fromName: '',
	//setFromName: () => { },
	filedData: {},
	dispatch: () => { },
	setFormFiled: () => { },
	setFromConturct: () => { },
	resetFrom: () => { },
	socket:  () => { } //io(SOCKET_URL ?? "http://localhost:4500")
};

export const AccessContext: any = React.createContext(initialContext);
//AuthlSlice

export default function AccessProvide({ children, ...props }: any) {
	
	const authProps: any = props?.auth || {}
	
	const dispatch = useDispatch()

	const router = useRouter()

	const [fields, setFiled]: any = React.useState({})

	const [ type, setType]: any = React.useState <'filter' | 'fields' | 'mutiFields' > ( 'fields' )

	const [ownStore, setOwnStore]: any = React.useState<string>("")

	let storeInfo: any = { name: "", module: {} }

	const hasOwnStore: boolean =  ownStore ? archive.hasOwnProperty(ownStore as string) : false

	if (hasOwnStore) {
		const module: any = archive		
		storeInfo = { name: ownStore, module: module[ownStore as string]?.actions }
	}
	
	const stage = useSelector((stage: any) => (stage[storeInfo?.name as string])) || { ...intItems, ...initFormInfo, ...initMutiFormInfo }
	const auth = useSelector((stage: any) => stage?.auth?.attributes )


    React.useEffect( () =>{
       		
        if(Object.keys(fields).length >= 1)
			setFromConturct({ stage, dispatch, fields, type, storeInfo })
        
    }, [fields ] )

	// listen change auth
	React.useEffect( () =>{
		
		dispatch( setAuth( { ...authProps } ) )
		

        return () => { 
			setAuth( { } )
		 }

    }, [ JSON.stringify(authProps) ] )


	
			
	return (
		<AccessContext.Provider value={{
			auth, router, storeInfo, 
			stage : stage, setFiled, setType,
			fields,  
			filedData: {},
			socket: initialContext?.socket,
			hasOwnStore,
			ownStore,
			setOwnStore,
			useSelector,
			checkValidMutiRow,
			dispatch, 
			fetchs, 
			handleLoadMore: (e: any) => {
        
				const  { scrollTop, clientHeight, scrollHeight }  = e?.target;
		
				const page = ( Number(stage?.currentPage) +1 as number);
		
				let _percentage: number = Math.round( (scrollTop + clientHeight) / scrollHeight * 100);
		
				if ( _percentage == 100 && ( Number(stage?.lastPage)>Number(stage?.currentPage) ) && (page != Number(fields.page) ) )
				{            
					dispatch( storeInfo?.module?.setFormData({  data: { page }, type }) )
				}
				
			},
			handleChangeKeyWord: debounce( (event:any) => { 								
								dispatch( storeInfo?.module?.setFormData({  data: { page: 1 }, type }) )
								setFiledData({ event, fields, type, storeInfo, dispatch, stage })
							}, 800 ), 
			handleAddRow: (e:any) => 
							(			
								checkValidMutiRow(stage?.mutiFields) 
								&& dispatch(storeInfo?.module?.changeStage({ mutiFields: [ ...stage?.mutiFields, { ...mapValueFileds({ fields }) } ] }) )
							), 
			handleDeleteRow: (e:any) => 
							{
								const index = Number( e.target.getAttribute("data-index") || 0 )
						
								const data = stage?.mutiFields.filter( (res:any, ind: number) => ind != index )
								
								if(data?.length)
								dispatch(storeInfo?.module?.changeStage({ mutiFields: [ ...data ] }) )
							},
			resetFrom:  () => {  
								if( storeInfo?.name )
									dispatch( storeInfo?.module?.clearFrom() ) 
							},
			setFormFiled: (event: any) => (setFiledData({ event, fields, type, storeInfo, dispatch, stage })),
			setFromConturct,
		}}>
			{children}
		</AccessContext.Provider >
	)
}