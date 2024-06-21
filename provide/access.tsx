
import React from "react";
import { clearFrom, setFormData, setFromContruct } from "@/store/fieldData";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { io } from "socket.io-client";
import getConfig from "next/config";
import * as archive from "@/store/Kernel"
import Joi from "Joi"

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
	socket: io(SOCKET_URL ?? "http://localhost:4500")
};

export const AccessContext: any = React.createContext(initialContext);
//AuthlSlice

export default function AccessProvide({ children }: any) {

	const dispatch = useDispatch()

	const router = useRouter()

	const [fields, setFiled]: any = React.useState({})

	const [ownStore, setOwnStore]: any = React.useState<string>("")

	const [fromName, setFromName]: any = React.useState<string>("")

	let storeInfo: any = { name: "", module: {} }

	const hasOwnStore: boolean = archive.hasOwnProperty(ownStore as string)

	if (hasOwnStore) {
		const module: any = archive
		storeInfo = { name: ownStore.replace(/Slice/g, "").toLowerCase(), module: module[ownStore as string]?.actions }
	}

	const stage = useSelector((stage: any) => (stage[storeInfo?.name as string]))

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

	return (
		<AccessContext.Provider value={{
			router,
			storeInfo,
			stage,
			setFiled,
			fields,
			fromName,
			setFromName,
			filedData: {},
			socket: initialContext?.socket,
			hasOwnStore,
			ownStore,
			setOwnStore,
			dispatch,
			resetFrom,
			setFormFiled,
			setFromConturct
		}}>
			{children}
		</AccessContext.Provider >
	)
}