import {
	defineStore
} from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => ({
		id: "1234567890",
		name: "请输入昵称",
		sex: "保密",
		birthday: "未知",
		tag: "无",
		url: ""
	}),
	actions: {
		updateName(newName) {
			this.name = newName;
		},
		updateSex(newSex) {
			this.sex = newSex;
		},
		updateBirthday(newBirthday) {
			this.birthday = newBirthday;
		},
		updateTag(newTag) {
			this.tag = newTag;
		},
		updateId(newId) {
			this.id = newId;
		},
		updateUrl(newUrl) {
			this.url = newUrl;
		},

		// 重置用户信息
		resetUserInfo() {
			this.name = "请输入昵称";
			this.sex = "保密";
			this.birthday = "未知";
			this.tag = "无";
			this.url="";
		},

		toggleSex() {
			this.sex = this.sex === "男" ? "女" : "男";
		}
	}
});