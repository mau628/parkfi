export default defineNuxtPlugin(() => {
    return {
        provide: {
            epochAToken: (epoch: string) => `Token ${epoch}!`,
            tokenAEpoch: (token: string) => `#123456#`
        }
    }
})