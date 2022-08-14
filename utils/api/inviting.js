
export const InvitingApi = (instance) => ({
    async getFolders() {
        return instance.get('/auth/user/inviting/')
    },

    async createFolder(folderName) {
        return instance.post('/auth/user/inviting/create-folder', {name: folderName})
    }
})