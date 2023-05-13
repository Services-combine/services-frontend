
export const InvitingApi = (instance) => ({

    async getFolders() {
        return instance.get('/auth/user/inviting/get-folders')
    },

    async getSettings() {
        return instance.get('/auth/user/inviting/get-settings')
    },

    async saveSettings(countInviting, countMailing) {
        return instance.post('/auth/user/inviting/save-settings', {countInviting: Number(countInviting), countMailing: Number(countMailing)})
    },

    async createFolder(folderName) {
        return instance.post('/auth/user/inviting/create-folder', {name: folderName})
    },

    async createFolderInFolder(folderID, folderName) {
        return instance.post(`/auth/user/inviting/${folderID}/create-folder`, {name: folderName})
    },

    async getFolderById(folderID) {
        return instance.get(`/auth/user/inviting/${folderID}`)
    },

    async getFoldedrsMove(folderID) {
        return instance.get(`/auth/user/inviting/${folderID}/folders-move`)
    },

    async renameFolder(folderID, folderName) {
        return instance.post(`/auth/user/inviting/${folderID}/rename`, {name: folderName})
    },

    async changeChat(folderID, chatName) {
        return instance.post(`/auth/user/inviting/${folderID}/change-chat`, {chat: chatName})
    },

    async addMessage(folderID, message) {
        return instance.post(`/auth/user/inviting/${folderID}/change-message`, {message: message})
    },

    async changeUsernames(folderID, usernames) {
        return instance.post(`/auth/user/inviting/${folderID}/change-usernames`, {usernames: usernames})
    },

    async changeGroups(folderID, groups) {
        return instance.post(`/auth/user/inviting/${folderID}/change-groups`, {groups: groups})
    },

    async moveFolder(folderID, path) {
        return instance.post(`/auth/user/inviting/${folderID}/move`, {path: path})
    },

    async checkBlock(folderID) {
        return instance.get(`/auth/user/inviting/${folderID}/check-block`)
    },

    async launchInviting(folderID) {
        return instance.get(`/auth/user/inviting/${folderID}/launch-inviting`)
    },

    async launchMailingUsernames(folderID) {
        return instance.get(`/auth/user/inviting/${folderID}/launch-mailing-usernames`)
    },

    async launchMailingGroups(folderID) {
        return instance.get(`/auth/user/inviting/${folderID}/launch-mailing-groups`)
    },

    async joinGroup(folderID) {
        return instance.get(`/auth/user/inviting/${folderID}/join-group`)
    },

    async deleteFolder(folderID) {
        return instance.get(`/auth/user/inviting/${folderID}/delete`)
    },

    async createAccount(folderID, formData) {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        console.log(formData)
        return instance.post(`/auth/user/inviting/${folderID}/create-account`, formData, config)
    },

    async saveSettingsAccount(folderID, accountID, name, interval, folder) {
        return instance.post(`/auth/user/inviting/${folderID}/${accountID}`, {name: name, interval: interval, folder_id: folder})
    },

    async deleteAccount(folderID, accountID) {
        return instance.get(`/auth/user/inviting/${folderID}/${accountID}/delete`)
    },

    async geterateInterval(folderID) {
        return instance.get(`/auth/user/inviting/${folderID}/generate-interval`)
    },

    async sendCodeParsing(folderID, accountID) {
        return instance.get(`/auth/user/inviting/${folderID}/${accountID}/login-api`)
    },

    async parsingApi(folderID, accountID, code) {
        return instance.post(`/auth/user/inviting/${folderID}/${accountID}/parsing-api`, {password: code})
    },

    async sendCodeSession(folderID, accountID) {
        return instance.get(`/auth/user/inviting/${folderID}/${accountID}/get-code-session`)
    },

    async createSession(folderID, accountID, code) {
        return instance.post(`/auth/user/inviting/${folderID}/${accountID}/create-session`, {password: code})
    },
})