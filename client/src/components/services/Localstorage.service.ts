class LocalstorageService {
    Localstorage: Storage | undefined = undefined

    constructor() {
        if (typeof window !== 'undefined') {
            this.Localstorage = localStorage
        }
    }

    setItem<T>(key: string, value: T): void {
        this.Localstorage?.setItem(key, JSON.stringify(value))
    }

    getItem<T>(key: string): T | null {
        const item = this.Localstorage?.getItem(key)
        if (!item) {
            return null
        }
        return JSON.parse(item) as T
    }

    removeItem(key: string): void {
        this.Localstorage?.removeItem(key)
    }
}

export default new LocalstorageService()
