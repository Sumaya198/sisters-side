module.exports = {
    async redirects() {
        return [
            {
                source: '/mosques/:mosqueId',
                destination: '/mosques/:mosqueId',
                permanent: true,
            },
        ]
    },
}
