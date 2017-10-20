Vue.component('display-time', {
	data: function () {
		var t = this.determineTime();

		return {
			time: t
		};
	},
	methods: {
		determineTime: function () {
			var now = new Date(),
				hours = now.getHours(),
				minutes = now.getMinutes();

			if (hours > 12) {
				hours = hours - 12;
			}

			if (hours < 10) {
				hours = "0" + hours;
			}
			if (minutes < 10) {
				minutes = "0" + minutes;
			}

			return hours + ":" + minutes;
		},
	},
	mounted: function () {
		var _ = this;
		window.setInterval(function() {
			_.time = _.determineTime();
		}, 5000);
	},
	template: `<div class="time">
		{{ time }}
	</div>`
});