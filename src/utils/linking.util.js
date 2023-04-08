const config = {
    screens: {
        VerifyEmail: {
            path: 'verify',
            parse: {
                email: email => `${email}`,
                password: password => `${password}`
            }
        },
        ResetPassword: {
            path: 'reset-password',
        },
    }
}

const linking = {
    prefixes: ['http://mizule/', 'https://mizule/', 'mizule://'], config
}

export default linking