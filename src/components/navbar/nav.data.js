
export const navData = [
    {
        title: 'Walk through',
        link: '/'
    },
    {
        title: 'Career',
        link: '/'
    },
    {
        title: 'Help',
        link: '/'
    },
    {
        title: 'Sign Up',
        link: '/'
    }
];

export const zulistNavData = (user) => [
    {
        title: 'Home',
        link: `/${user.name}`
    },
    {
        title: 'Discover',
        link: '/discover'
    },
    {
        title: 'Logout',
        link: '/'
    }
];