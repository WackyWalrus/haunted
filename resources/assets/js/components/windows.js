Vue.component('windows', {
	data: function () {
		return {
			windowList: [],
			EventBus: Vue.config.EventBus
		};
	},
	mounted: function () {
		var _ = this;

		function resetIndex() {
			var emittable = {};

			for (var i = 0; i < _.windowList.length; i += 1) {
				emittable[_.windowList[i].index] = i;
				_.windowList[i].index = i;
			}

			_.EventBus.$emit('update-window-index', emittable);
		}

		this.EventBus.$on('add-window', opens => {
			_.EventBus.$emit('defocus-all');
			var windowData = {
				window: opens,
				index: _.windowList.length
			};
			_.windowList.push(windowData);
		});
		this.EventBus.$on('exit-window', index => {
			resetIndex();
			_.windowList.splice(index, 1);
		});
		this.EventBus.$on('restack-windows', index => {
			_.windowList.push(_.windowList[index]);
			_.windowList.splice(index, 1);
			resetIndex();
		});
	},
	template: `<div class="windows">
		<component v-for="window in windowList" :key="window.index" :is="window.window" :index="window.index"></component>
	</div>`
});