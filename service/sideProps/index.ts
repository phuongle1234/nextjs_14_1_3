export const SideProps = async (context: any) => {

    const { req } = context

    let auth =  req?.headers['auth-ct5']
        auth = auth ? JSON.parse( req?.headers['auth-ct5'] as string ) : {}
    
    return { props: { auth } }
}