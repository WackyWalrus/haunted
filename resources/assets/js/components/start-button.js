Vue.component('start-button', {
	data: function () {
		return {
			active: '',
			EventBus: Vue.config.EventBus
		};
	},
	methods: {
		activate: function () {
			this.active = 'active';
		},
		deactivate: function () {
			this.active = '';
		},
		toggle: function () {
			if (this.active === 'active') {
				this.deactivate();
				return;
			}
			this.activate();
		},
		startButton_clickHandler: function () {
			this.EventBus.$emit('toggle-desktop-menu');
			this.toggle();
			return;
		}
	},
	mounted: function () {
		var _ = this;
		this.EventBus.$on('activate-start-button', function () {
			_.activate();
		});
		this.EventBus.$on('deactivate-start-button', function () {
			_.deactivate();
		});
	},
	template: `<div :class="'start-button ' + active " v-on:click="startButton_clickHandler">
		Start
	</div>`
});