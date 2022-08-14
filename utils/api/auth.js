

export const AuthApi = (instance) => ({
    async login(data) {
        return instance.post('/auth/login', data);
    },

    async getMe() {
        return instance.get('/auth/get-me');
    },
})