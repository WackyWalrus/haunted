
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

var EventBus = new Vue();

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.config.EventBus = EventBus;
Vue.config.filesystem = [
	{
		type: 'drive',
		name: 'C',
		contains: [
			{
				type: 'file',
				name: 'spooky',
				fileType: 'txt',
				contains: 'wow oh wow wee'
			},
			{
				type: 'directory',
				name: 'folder',
				contains: [
					{
						type: 'file',
						name: 'scary',
						fileType: 'txt',
						contains: 'spooky'
					}
				]
			}
		]
	}
];

require('./components/desktop.js');
require('./components/taskbar.js');
require('./components/start-button.js');
require('./components/dock.js');
require('./components/display-time.js');
require('./components/desktop-menu.js');

require('./components/windows.js');
require('./components/window.js');
require('./components/ms-dos.js');

Vue.component('app', {
	template: `
		<div class="app">
			<desktop></desktop>
			<windows></windows>
			<taskbar></taskbar>
			<desktop-menu></desktop-menu>
		</div>
	`
});

const app = new Vue({
    el: '#app'
});
