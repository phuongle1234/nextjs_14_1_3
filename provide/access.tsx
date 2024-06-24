
import React from "react";
import { clearFrom, setFormData, setFromContruct } from "@/store/fieldData";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { io } from "socket.io-client";
import getConfig from "next/config";
import { setAttributes as setAuth } from "@/store/Auth";
import * as archive from "@/store/Kernel"
import Joi from "Joi"
import { intItems, initFormInfo } from "@/traits/store";
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
	setFromName: () => { },
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

	const [ownStore, setOwnStore]: any = React.useState<string>("")

	const [fromName, setFromName]: any = React.useState<string>("")

	let storeInfo: any = { name: "", module: {} }

	const hasOwnStore: boolean =  ownStore ? archive.hasOwnProperty(ownStore as string) : false

	if (hasOwnStore) {
		const module: any = archive		
		storeInfo = { name: ownStore.replace(/Slice/g, "").toLowerCase(), module: module[ownStore as string]?.actions }
	}
	
	const stage = useSelector((stage: any) => (stage[storeInfo?.name as string])) || { ...intItems, ...initFormInfo }
	const auth = useSelector((stage: any) => stage?.auth?.attributes )

	const intContruct = ( Object.keys(fields).length >= 1 ) && hasOwnStore
	
	const intAterContruct = Object.keys(stage?.fields).length ? JSON.stringify(stage?.fields) : false
	
    React.useEffect( () =>{
        
        if(intContruct)
            setFromConturct()

        return () => { resetFrom() }

    }, [intContruct] )

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

	const setFromConturct = async () => {

		// if(hasOwnStore) {}

		dispatch(
			storeInfo?.module?.setFromContruct({
				data: Object.keys(fields).reduce((acc: any, cur: any) => {
					let obj: any = {}
					obj[cur as string] = fields[cur as string]?.val
					return ({ ...acc, ...obj })
				}, {}),
				filed: fromName
			})
		)

		const hasValidate = Object.keys(fields).filter((res: any) => (fields[res as string]?.val != ""))

		if (hasValidate?.length) {
			const validate: any = await hasValidate.reduce(async (cur: any, acc: any) => ({ ...(await cur), ...joiValidate({ name: acc, fields, value: fields[acc as string].val })?.joi }), Promise.resolve({}))
			dispatch(storeInfo?.module?.changeStage({ validate }))
		}


	}

	const resetFrom = () => dispatch(clearFrom())
	
	const setFormFiled = (event: any) => {

		const { name, value, checked } = event.target
		
		const { data, error } = joiValidate({ fields, value, name, checked })
		
		dispatch(storeInfo?.module?.setFormData({ data, error }))

	}
	
	// hasFetchLoadMore, setFetchLoadMore

	const fetchs = async (modelView: any) => {

        try {
			
            const res: any =  await modelView.read(stage?.fields)
			let data: any =  { ...res.data }
			

			data['items'] = stage?.fields?.page > 1 ? [ ...stage?.items, ...data?.data ] 
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
            dispatch( storeInfo?.module?.setFormData({  data: { page } }) )
        }
        
    }

	const handleChangeKeyWord: any = debounce( (e:any) => { 
		dispatch( storeInfo?.module?.setFormData({  data: { page: 1 } }) )
		setFormFiled(e) 
	}, 800 )

	return (
		<AccessContext.Provider value={{
			auth, router, storeInfo, 
			stage : stage, setFiled, 
			fields, intAterContruct,
			handleChangeKeyWord,
			fromName, setFromName, filedData: {}, 
			socket: initialContext?.socket,
			hasOwnStore,
			ownStore,
			setOwnStore,
			useSelector,
			dispatch, fetchs, handleLoadMore,
			resetFrom,
			setFormFiled,
			setFromConturct,
		}}>
			{children}
		</AccessContext.Provider >
	)
}