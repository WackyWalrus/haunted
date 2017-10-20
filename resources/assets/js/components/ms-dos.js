Vue.component('dos', {
	data: function () {
		return {
			title: 'MS-DOS',
			classname: 'dos-window',
			logs: "<br>Microsoft(R) Windows 95<br>(C)Copyright Microsoft Corp 1981-1995",
			location: 'C:\\',
			command: ''
		};
	},
	props: ['index'],
	methods: {
		focusHiddenInput: function (e) {
			this.$refs.commandEditor.focus();
		},
		runCommand: function () {
			var _ = this,
				command = _.command,
				i,
				x,
				filesystem = Vue.config.filesystem,
				locationString = '',
				printThis = '<br><br>' + _.location + '>' + command;

			_.command = '';

			function search(array, locations = []) {
				var start,
					place = 0,
					i;

				start = Vue.config.filesystem;

				for (i = 0; i < locations.length; i += 1) {
					if (start[locations[i]] !== undefined) {
						start = start[locations[i]];
						place = i + 1;
					}

					if (start.contains !== undefined) {
						start = start.contains;
					}
				}

				if (array[place] !== '') {
					for (i = 0; i < start.length; i += 1) {
						if (start[i].name === array[place]) {
							locations.push(i);
							return search(array, locations);
						}
					}
				}

				if ((array.length - 1) !== locations.length) {
					return false;
				}

				return start;
			}

			if (command === 'help') {
				_.logs += printThis + '<br>Available commands are:<br><br>help<br>dir<br>cd';
			}

			if (command === 'dir') {
				// find current location in the file system
				var split = _.location.replace(':', '');
				split = split.split('\\');
				var results = search(split);

				for (var i = 0; i < results.length; i += 1) {
					printThis += '<br>';
					if (results[i].type === 'file') {
						printThis += results[i].name + '.' + results[i].fileType;
					} else {
						printThis += results[i].name;
					}
				}

				_.logs += printThis;
			}

			if (command.substr(0, 3) === 'cd ') {
				var location = command.split(' ');
				if (location[1] === undefined ||
						location[1] === null ||
						location[1] === ''||
						location[1] === ' ') {
					return;
				}
				location = location[1];

				var results;
				var newLocation;

				if (location.substr(1, 2) === ':\\') {
					newLocation = location;
					location = location.replace(':', '').split('\\');
					results = search(location);
				} else {
					if (location.substr(0, 1) === '\\') {
						return;
					}
					location = _.location + location + '\\';
					newLocation = location;
					location = location.replace(':', '');
					location = location.split('\\');
					results = search(location);
				}

				if (results !== false) {
					_.location = newLocation;
				}
			}
		}
	},
	mounted: function () {
		this.focusHiddenInput();
	},
	template: `
		<window :classname="classname" :title="title" :index="index">
			<div class="ms-dos" v-on:click="focusHiddenInput">
				<div class="logs" v-html="logs"></div><br>
				<div class="fake-input">{{ location }}>{{ command }}<span class="flicker"></span>▊</div>
				<input type="text" ref="commandEditor" v-on:keyup.enter="runCommand" v-model="command" style="position:absolute;left:-99999px" />
			</div>
		</window>
	`
});