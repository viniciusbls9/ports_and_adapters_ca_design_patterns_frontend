import Observable from "./Observable"

export default class TodoList extends Observable {
    items: any

    constructor(items?: any) {
        super();
        this.items = []
        if (items) {
            for (const item of items) {
                this.items.push({ id: item.id, description: item.description, done: item.done })
            }
        }
    }

    async addItem(description: string) {
        if (!description) return
        if (this.items.some((item: any) => item.description === description)) return
        if (this.items.filter((item: any) => !item.done).length > 4) return

        const item = { id: Math.random().toString(36).slice(2, 7), description, done: false }
        this.items.push(item)
        this.notify('addItem', item)
    }

    async removeItem(item: any) {
        this.items.splice(this.items.indexOf(item), 1)
        this.notify('removeItem', item)
    }

    async toggleDone(item: any) {
        item.done = !item.done
        this.notify('toggleDone', item)
    }

    getItem(description: string) {
        return this.items.find((item: any) => item.description === description)
    }

    getCompleted() {
        const total = this.items?.length
        if (total === 0) return 0
        const done = this.items?.filter((item: any) => item.done).length
        return Math.round((done / total) * 100)
    }
}