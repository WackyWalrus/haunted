Vue.component('window', {
	data: function () {
		var _ = this;
		return {
			focused: 'focused',
			dragging: false,
			startX: 0,
			startY: 0,
			windowX: 0,
			windowY: 0,
			fakeWindowActive: '',
			realIndex: 0,
			zIndex: (_.index + 1) * 2,
			EventBus: Vue.config.EventBus
		};
	},
	props: ['classname', 'title', 'index'],
	mounted: function () {
		var _ = this;
		this.realIndex = this.index;
		this.EventBus.$on('defocus-all', function () {
			_.focused = '';
		});
		this.EventBus.$on('update-window-index', object => {
			var i;
			for (i in object) {
				if (parseInt(i, 10) === _.realIndex) {
					_.realIndex = object[i];
					_.zIndex = (_.realIndex + 1) * 2;
					break;
				}
			}
		});
	},
	methods: {
		focusWindow: function () {
			var _ = this;
			this.EventBus.$emit('defocus-all');
			this.EventBus.$emit('restack-windows', _.realIndex);
			if (this.focused === '') {
				this.focused = 'focused';
			}
			this.$slots.default[0].elm.click();
		},
		startDrag: function (e) {
			if (this.dragging === false) {
				this.dragging = true;
				this.focusWindow();
				this.fakeWindowActive = 'big';
				this.startX = e.clientX;
				this.startY = e.clientY;
			}
		},
		endDrag: function (e) {
			this.dragging = false;
			this.fakeWindowActive = '';
		},
		doDrag: function (e) {
			if (this.dragging === false) {
				return false;
			}

			this.windowX = this.windowX + (e.clientX - this.startX);
			this.windowY = this.windowY + (e.clientY - this.startY);
			this.startX = e.clientX;
			this.startY = e.clientY;
		},
		exitWindow: function (e) {
			var _ = this;
			this.EventBus.$emit('exit-window', _.realIndex);
		}
	},
	template: `
		<div :class="'window ' + classname + ' ' + focused" :style="'top:' + windowY + 'px;left:' + windowX + 'px;z-index:' + zIndex">
			<div :class="'fake-window ' + fakeWindowActive" @mousedown="startDrag" @mouseup="endDrag" @mouseleave="endDrag" @mousemove="doDrag" ref="fakeWindow" :style="'z-index:' + (zIndex - 1)"></div>
			<div :class="'window-bar ' + focused" :style="'z-index:' + (zIndex - 2)">
				<div class="window-title">{{ title }} {{ realIndex }}</div>
				<div class="window-actions">
					<span class="window-close" v-on:click="exitWindow">X</span>
				</div>
			</div>
			<slot></slot>
		</div>
	`
});