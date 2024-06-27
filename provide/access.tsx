
import React from "react";
//import { clearFrom, setFormData, setFromContruct } from "@/store/fieldData";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { io } from "socket.io-client";
import getConfig from "next/config";
import { setAttributes as setAuth } from "@/store/Auth";
import * as archive from "@/store/Kernel"
import Joi from "Joi"
import { intItems, initFormInfo } from "@/traits/store";
import { initMutiFormInfo } from "@/traits/store/multi_rows";
import debounce from 'debounce';

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
			setFromConturct()
        
    }, [fields ] )

	// listen change auth
	React.useEffect( () =>{
		
		dispatch( setAuth( { ...authProps } ) )
		

        return () => { 
			setAuth( { } )
		 }

    }, [ JSON.stringify(authProps) ] )




	const joiValidate = ({ name, fields, value, checked = false }: any) => {
		
		let data: { [key: string]: any } = {}
		data[name] = ((fields[name] || {})?.type == 'boolean') ? checked : value

		const hasJoi = fields[name as string].hasOwnProperty("Joi")

		let joi: any = {}
		joi[name] = fields[name as string]?.Joi
		
		const error = hasJoi ? Joi.object().keys(joi).validate(data)?.error?.message : "";

		joi[name] = { success: !error, error: error }

		return { data, joi, error }
	}

	const mapValueFileds = Object.keys(fields).reduce((acc: any, cur: any) => {
								let obj: any = {}
								obj[cur as string] = fields[cur as string]?.val
								return ({ ...acc, ...obj })
							}, {})

	const setFromConturct = async () => {
		
		if( !Object.keys( stage[type as string] ).length )
		{			
			dispatch(
				storeInfo?.module?.setFromContruct({
					data: mapValueFileds,
					filed: type
				})
			)

			const hasValidate = Object.keys(fields).filter((res: any) => (fields[res as string]?.val != ""))

			if (hasValidate?.length) {
				const validate: any = await hasValidate.reduce(async (cur: any, acc: any) => ({ ...(await cur), ...joiValidate({ name: acc, fields, value: fields[acc as string].val })?.joi }), Promise.resolve({}))
				dispatch(storeInfo?.module?.changeStage({ validate }))
			}
		}

	}

	const resetFrom = () => {  
		if( storeInfo?.name )
			dispatch( storeInfo?.module?.clearFrom() ) 
	}
	
	const setFormFiled = (event: any) => {

		const { name, value, checked } = event.target
		const { data, error } = joiValidate({ fields, value, name, checked })
		// 'filter' | 'fileds' | 'mutiFields
		switch(type)
		{
			case "fields":
				dispatch(storeInfo?.module?.setFormData({ data, error, type })); break;
			case "mutiFields":
				const index = event.target.getAttribute("data-index")
				let fils: any = [ ...stage?.mutiFields ]

				const _thisRow = fils[index as number]
				let erorr = { ... (_thisRow?.error || {} ) }
					erorr[name as string] = error
					fils[index as number] = {  ..._thisRow , ... data, error: erorr } 
					
					dispatch(storeInfo?.module?.changeStage({ mutiFields: fils }) ); 
					break;
				
				break;
		}
		
		

	}
	
	// hasFetchLoadMore, setFetchLoadMore

	const fetchs = async (modelView: any) => {

        try {
			
            const res: any =  await modelView.read(stage?.filter)
			let data: any =  { ...res.data }
			

			data['items'] = stage?.filter?.page > 1 ? [ ...stage?.items, ...data?.data ] 
													: data?.data
			
			delete 	data?.data
            dispatch( storeInfo.module?.changeStage( { ...data } ) )
            
        } catch (err: any) {
            console.log( { err } );
			
        }
	}
	
	const handleLoadMore = (e: any) => {
        
        const  { scrollTop, clientHeight, scrollHeight }  = e?.target;

        const page = ( Number(stage?.currentPage) +1 as number);

        let _percentage: number = Math.round( (scrollTop + clientHeight) / scrollHeight * 100);

        if ( _percentage == 100 && ( Number(stage?.lastPage)>Number(stage?.currentPage) ) && (page != Number(fields.page) ) )
        {            
            dispatch( storeInfo?.module?.setFormData({  data: { page }, type }) )
        }
        
    }

	const handleChangeKeyWord: any = debounce( (e:any) => { 
		dispatch( storeInfo?.module?.setFormData({  data: { page: 1 }, type }) )
		setFormFiled(e) 
	}, 800 )

	const checkValidMutiRow = (fields: any)=> (
		! Object.keys(
			fields?.find( (cur: any, acc: any) => {

				const _row = fields[acc as number]

				if(!_row?.error)
					return true
				
				return Object.keys(_row?.error)?.filter( (res:any) => _row?.error[res as string]!= undefined )?.length
				
				}) || {}
		)?.length
	)

	const handleAddRow = (e:any) => 
		(
			checkValidMutiRow(stage?.mutiFields) && dispatch(storeInfo?.module?.changeStage({ mutiFields: [ ...stage?.mutiFields, { ...mapValueFileds } ] }) )
		)
	
	const handleDeleteRow = (e:any) => 
		{
			const index = Number( e.target.getAttribute("data-index") || 0 )

			const data = stage?.mutiFields.filter( (res:any, ind: number) => ind != index )
			
			if(data?.length)
			dispatch(storeInfo?.module?.changeStage({ mutiFields: [ ...data ] }) )
		}
    

	return (
		<AccessContext.Provider value={{
			auth, router, storeInfo, 
			stage : stage, setFiled, setType,
			fields, handleChangeKeyWord, filedData: {},
			socket: initialContext?.socket,
			hasOwnStore,
			ownStore,
			setOwnStore,
			useSelector,
			dispatch, fetchs, handleLoadMore, handleAddRow, handleDeleteRow,
			resetFrom,
			setFormFiled,
			setFromConturct,
		}}>
			{children}
		</AccessContext.Provider >
	)
}