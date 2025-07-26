import {
	defineStore
} from 'pinia';
import {
	ref
} from 'vue';

export const useUserStore = defineStore('user', {
	state: () => ({
		id: "1234567890",
		name: "请输入昵称"
	}),
	getters: {
		userId: (state) => state.id,
		userName: (state) => state.name
	},
	actions: {
		updateName(newName) {
			this.user.name = newName;
		}
	}
});