export const label = {
    email: "メールアドレス",
    password: "パスワード"
}


export const from = {
    email: { 'string_email': `${label?.email} should be a type of 'text'` },
    password: { 
                'string_base': `${label?.password} be a type of 'text'`,
                'string_empty': `${label?.password} cannot be an empty field`,
                'string_min': `${label?.password} should have a minimum length of {#limit}`,
                'any_required': `${label?.password} is a required field`
            },
}