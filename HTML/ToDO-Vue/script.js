const app = new Vue ({
    el: '#app',

    data () {
        const data = {}
        data.list = []
        const item = {
            id: 1,
            content: 'Купить хлеба',
            selected: false,
        }

        data.list.push(item)

        const item2 = {
            id: 2,
            content: 'Купить молока',
            selected: false,
        }

        data.list.push(item2)
        data.input = ''

        return data
    },

    methods: {
        inputHandler () {
            const input = this.input.trim();

            if(!input) {
                return
            }

            const item = {
                id: this.list.length + 1,
                content: input,
                selected: false,
            }

            this.list.unshift(item)
            this.input = ''
        },
        selectAll() {
            for(const item of this.list) {
                if (item.selected === true) {
                    item.selected = false
                } else {
                    item.selected = true
                }
            }
        }
    }


});