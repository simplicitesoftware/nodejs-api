var simplicite = require('./simplicite');

var debug = true;

var app = simplicite.session({
	scheme: process.env.TEST_SIMPLICITE_SCHEME || 'https',
	host: process.env.TEST_SIMPLICITE_HOST || 'dev40.dev.simplicite.io',
	port: parseInt(process.env.TEST_SIMPLICITE_PORT) || 443,
	root: process.env.TEST_SIMPLICITE_ROOT || '',
	username: process.env.TEST_SIMPLICITE_USERNAME || 'designer',
	password: process.env.TEST_SIMPLICITE_PASSWORD || 'S1mplicite_',
	debug: debug
}), sys, usr;

// Using promise-style functions
app.login().then(function(params) {
	if (debug) console.log(params);
	console.log('Logged in as ' + params.username);
	return app.getGrant({ inlinePicture: true }).then(function(grant) {
		if (debug) console.log(grant);
		console.log('Hello ' + grant.getFirstName() + ' ' + grant.getLastName() + ' (' + grant.getLogin() + ')');
		if (app.grant.hasResponsibility('ADMIN')) console.log('Beware, you are platform administrator!');
		return app.getAppInfo();
	}).then(function(appinfo) {
		if (debug) console.log(appinfo);
		console.log('Application title: ' + appinfo.title);
		return app.getSysInfo();
	}).then(function(sysinfo) {
		if (debug) console.log(sysinfo);
		console.log('Memory: ' + sysinfo.heapmaxsize);
		sys = app.getBusinessObject('SystemParam');
		return sys.getMetaData();
	}).then(function(metadata) {
		if (debug) console.log(metadata);
		console.log('Name: ' + sys.getName());
		console.log('Instance: ' + sys.getInstance());
		console.log('Label: ' + sys.getLabel());
		console.log('Help: ' + sys.getHelp());
		console.log('RowId.name: ' + sys.getRowIdField().name);
		console.log('Fields.length: ' + sys.getFields().length);
		console.log('Links.length: ' + sys.getLinks().length);
		return sys.getCount({ sys_code: 'EASYMODE%' });
	}).then(function(count) {
		if (debug) console.log(count);
		console.log('Count: ' + count);
		return sys.search({ sys_code: 'EASYMODE%' });
	}).then(function(list) {
		if (debug) console.log(list);
		console.log('Found ' + list.length + ' items');
		for (var i = 0; i < list.length; i++) {
			var item = list[i];
			console.log('  item[' + i + ']: ' + item.row_id + ' ' + item.sys_code + ' ' + item.sys_value);
		}
		return sys.get(2);
	}).then(function(item) {
		if (debug) console.log(item);
		console.log('Got item for rowId 2!');
		console.log('item: ' + item.row_id + ' ' + item.sys_code + ' ' + item.sys_value);
		return sys.getForCreate();
	}).then(function(item) {
		if (debug) console.log(item);
		console.log('Got new item for creation!');
		item.sys_code = 'TEST';
		item.sys_value = 'Test';
		return sys.create(item);
	}).then(function(item) {
		if (debug) console.log(item);
		console.log('Created new item!');
		return sys.del(item);
	}).then(function() {
		console.log('Deleted item!');
		usr = app.getBusinessObject('User');
		return usr.search(null, { inlineThumbs: true });
	}).then(function() {
		console.log('Got users list with thumbnails!');
		return usr.get(1, { treeView: 'TreeUser' });
	}).then(function(tree) {
		console.log('Got user treeview!');
		if (debug) console.log(tree);
		return app.logout();
	}).then(function() {
		console.log('Logged out');
	});
}).fail(function(reason) {
	console.error('Login failed (status: ' + reason.status + ', message: ' + reason.message + ')');
});
