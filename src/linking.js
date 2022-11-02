const config = {
    screens: {
        ResetPassword:
        {
            path: 'resetpassword/:user_id',
            parse: {
                user_id: (user_id) => `${user_id}`
            }
        }
    }
}

const linking = {
    prefixes: ['reset://app', 'https://mizule.com', 'http://194.163.43.5'], config
}

export default linking