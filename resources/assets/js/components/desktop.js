Vue.component('desktop', {
	data: function () {
		return {
			EventBus: Vue.config.EventBus
		};
	},
	methods: {
		desktop_clickHandler: function () {
			this.EventBus.$emit('hide-desktop-menu');
			this.EventBus.$emit('deactivate-start-button');
			this.EventBus.$emit('defocus-all');
		}
	},
	template: `<div class="desktop" v-on:click="desktop_clickHandler">

	</div>`
});