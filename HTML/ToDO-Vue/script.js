const app = new Vue ({
	el: '#app',

	data () {
		const data = {}
		data.list = []
		const item1 = {
			id: 1,
			content: 'Купить хлеба',
			selected: false,
			done: false
		}

		data.list.push(item1)

		const item2 = {
			id: 2,
			content: 'Купить молока',
			selected: false,
			done: false
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
				done: false
			}

			this.list.unshift(item)
			this.input = ''
		},
		selectAll() {
		    const newState = !this.someSelected

			for(const item of this.list) {
				item.selected = newState
			}
		},
		done(item) {
			item.done = true
		},
		restore(item){
			item.done = false
		},
		remove(itemRemove) {
			const list = []

			for (const item of this.list) {
				if(item !== itemRemove) {
					list.push(item)
					item.id = list.length
				}
			}

			this.list = list
		},
		doneAll(){
			for(const item of this.list) {
				if (item.selected === true && item.done === false) {
					item.done = true
				}
			}
		},
		restoreAll(){
			for(const item of this.list) {
				if (item.selected === true && item.done === true) {
                    item.done = false
				}
			}
		},
		removeAll(){
            const newlist = []

            for (const item of this.list) {
                if(!item.selected) {
                    newlist.push(item)
                    item.id = newlist.length
                }
            }

            this.list = newlist
		},
	},

    computed: {
	    someSelected(){
	        let number = 0
	        for(const item of this.list) {
	            if (item.selected) {
                    number++
                    if(number > 1) {
                        return true
                    }
                }
            }
	        return false
        }
    }


});
