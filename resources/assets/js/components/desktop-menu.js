Vue.component('desktop-menu', {
	data: function () {
		var _ = this;
		return {
			display: 'hidden',
			items: {
				'Programs': {
					name: 'Programs',
					submenu: {
						'MS-DOS Prompt': {
							name: 'MS-DOS Prompt',
							opens: 'dos'
						},
						'Windows Explorer': {
							name: 'Windows Exporer'
						}
					}
				},
				'Documents': {
					name: 'Documents'
				},
				'Settings': {
					name: 'Settings'
				},
				'Find': {
					name: 'Find'
				},
				'Help': {
					name: 'Help'
				},
				'Run': {
					name: 'Run'
				},
				'<hr>': {
					name: '<hr>'
				},
				'Shut Down...': {
					name: 'Shut Down...'
				}
			},
			EventBus: Vue.config.EventBus
		}
	},
	methods: {
		show: function () {
			this.display = '';
		},
		hide: function () {
			this.display = 'hidden';
		},
		toggle: function () {
			if (this.display === 'hidden') {
				this.show();
				return;
			}
			this.hide();
			return;
		},
		addWindow: function (e) {
			this.hide();
			this.EventBus.$emit('deactivate-start-button');
			this.EventBus.$emit('add-window', e.target.getAttribute('data-opens'));
		}
	},
	mounted: function () {
		var _ = this;
		this.EventBus.$on('toggle-desktop-menu', function () {
			_.toggle();
		});
		this.EventBus.$on('hide-desktop-menu', function () {
			_.hide();
		});
		this.EventBus.$on('show-desktop-menu', function () {
			_.show();
		});
	},
	template: `<div :class="'desktop-menu ' + display">
		<template v-for="item in items">
			<template v-if="item.name === '<hr>'">
				<div class="menu-item hr"><hr /></div>
			</template>
			<template v-if="item.name !== '<hr>'">
				<div class="menu-item">
					{{ item.name }}
					<template v-if="item.submenu !== undefined">
						<span class="glyphicon glyphicon-triangle-right"></span>
						<div class="menu-item-sub-menu">
							<template v-for="submenuitem in item.submenu">
								<div class="menu-item-sub-menu-item" v-on:click="addWindow" :data-opens="submenuitem.opens">{{ submenuitem.name }}</div>
							</template>
						</div>
					</template>
				</div>
			</template>
		</template>
	</div>`
});