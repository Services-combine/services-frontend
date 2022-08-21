

export const ChannelsApi = (instance) => ({
    async addChannel(formData) {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return instance.post('/auth/user/channels/add', formData, config);
    },
})