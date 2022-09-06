

export const ChannelsApi = (instance) => ({

    async getMarks() {
        return instance.get('/auth/user/channels/get-marks')
    },

    async addMark(mark) {
        return instance.post('/auth/user/channels/add-mark', mark)
    },

    async updateMark(id, mark) {
        return instance.post(`/auth/user/channels/${id}/update-mark`, mark)
    },

    async deleteMark(id) {
        return instance.get(`/auth/user/channels/${id}/delete-mark`)
    },

    async getChannels() {
        return instance.get('/auth/user/channels')
    },

    async addChannel(formData) {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return instance.post('/auth/user/channels/add', formData, config);
    },

    async launchChannel(id) {
        return instance.get(`/auth/user/channels/${id}/launch`)
    },

    async updateChannel(id, channel_id, api_key) {
        return instance.post(`/auth/user/channels/${id}/update`, {channel_id: channel_id, api_key: api_key})
    },

    async deleteChannel(id, channel_id) {
        return instance.post(`/auth/user/channels/${id}/delete`, {channel_id: channel_id})
    },

    async editChannel(id, comment, count_commented_videos) {
        return instance.post(`/auth/user/channels/${id}/edit-comment`, {comment: comment, count_commented_videos: Number(count_commented_videos)})
    },

    async editProxy(id, proxy) {
        return instance.post(`/auth/user/channels/${id}/edit-proxy`, {proxy: proxy})
    },

    async editMark(channel_id, mark_id) {
        return instance.post(`/auth/user/channels/${channel_id}/edit-mark`, {mark: mark_id})
    },
})