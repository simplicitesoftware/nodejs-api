/**
 * Simplicite(R) platform Javascript API client module (for node.js and browser).
 * @module simplicite
 * @version 1.1.2
 * @license Apache-2.0
 */
var Q = require('q');
var axios = require('axios');
var buffer = require('buffer');

/**
 * Constants
 * @constant
*/
var constants = {
	/**
	 * Default row ID field name
	 * @const {string}
	 */
	DEFAULT_ROW_ID_NAME: 'row_id',

	/**
	 * Default row ID value
	 * @const {string}
	 */
	DEFAULT_ROW_ID: '0',

	/**
	 * Default context
	 * @const {number}
	 */
	CONTEXT_NONE: 0,
	/**
	 * Search context
	 * @const {number}
	 */
	CONTEXT_SEARCH: 1,
	/**
	 * List context
	 * @const {number}
	 */
	CONTEXT_LIST: 2,
	/**
	 * Creation context
	 * @const {number}
	 */
	CONTEXT_CREATE: 3,
	/**
	 * Copy context
	 * @const {number}
	 */
	CONTEXT_COPY: 4,
	/**
	 * Update context
	 * @const {number}
	 */
	CONTEXT_UPDATE: 5,
	/**
	 * Delete context
	 * @const {number}
	 */
	CONTEXT_DELETE: 6,
	/**
	 * Chart context
	 * @const {number}
	 */
	CONTEXT_GRAPH: 7,
	/**
	 * Pivot table context
	 * @const {number}
	 */
	CONTEXT_CROSSTAB: 8,
	/**
	 * Publication context
	 * @const {number}
	 */
	CONTEXT_PRINTTMPL: 9,
	/**
	 * Bulk update context
	 * @const {number}
	 */
	CONTEXT_UPDATEALL: 10,
	/**
	 * Reference selection context
	 * @const {number}
	 */
	CONTEXT_REFSELECT: 11,
	/**
	 * Datamap selection context
	 * @const {number}
	 */
	CONTEXT_DATAMAPSELECT: 12,
	/**
	 * Pre validation context
	 * @const {number}
	 */
	CONTEXT_PREVALIDATE: 13,
	/**
	 * Post validation context
	 * @const {number}
	 */
	CONTEXT_POSTVALIDATE: 14,
	/**
	 * State transition context
	 * @const {number}
	 */
	CONTEXT_STATETRANSITION: 15,
	/**
	 * Export context
	 * @const {number}
	 */
	CONTEXT_EXPORT: 16,
	/**
	 * Import context
	 * @const {number}
	 */
	CONTEXT_IMPORT: 17,
	/**
	 * Association context
	 * @const {number}
	 */
	CONTEXT_ASSOCIATE: 18,
	/**
	 * Panle list context
	 * @const {number}
	 */
	CONTEXT_PANELLIST: 19,

	/**
	 * Foreign key (reference) type
	 * @const {number}
	 */
	TYPE_ID: 0,
	/**
	 * Integer type
	 * @const {number}
	 */
	TYPE_INT: 1,
	/**
	 * Decimal type
	 * @const {number}
	 */
	TYPE_FLOAT: 2,
	/**
	 * Short string type
	 * @const {number}
	 */
	TYPE_STRING: 3,
	/**
	 * Date type
	 * @const {number}
	 */
	TYPE_DATE: 4,
	/**
	 * Date and time type
	 * @const {number}
	 */
	TYPE_DATETIME: 5,
	/**
	 * Time type
	 * @const {number}
	 */
	TYPE_TIME: 6,
	/**
	 * Simple enumeration type
	 * @const {number}
	 */
	TYPE_ENUM: 7,
	/**
	 * Boolean type
	 * @const {number}
	 */
	TYPE_BOOLEAN: 8,
	/**
	 * Password type
	 * @const {number}
	 */
	TYPE_PASSWORD: 9,
	/**
	 * URL type
	 * @const {number}
	 */
	TYPE_URL: 10,
	/**
	 * HTML content type
	 * @const {number}
	 */
	TYPE_HTML: 11,
	/**
	 * Email type
	 * @const {number}
	 */
	TYPE_EMAIL: 12,
	/**
	 * Long string type
	 * @const {number}
	 */
	TYPE_LONG_STRING: 13,
	/**
	 * Multiple enumeration type
	 * @const {number}
	 */
	TYPE_ENUM_MULTI: 14,
	/**
	 * Validated string type
	 * @const {number}
	 */
	TYPE_REGEXP: 15,
	/**
	 * Document type
	 * @const {number}
	 */
	TYPE_DOC: 17,
	/**
	 * Decimal type
	 * @const {number}
	 * @deprecated
	 */
	TYPE_FLOAT_EMPTY: 18,
	/**
	 * External file type
	 * @const {number}
	 * @deprecated
	 */
	TYPE_EXTFILE: 19,
	/**
	 * Image type
	 * @const {number}
	 */
	TYPE_IMAGE: 20,
	/**
	 * Notepad type
	 * @const {number}
	 */
	TYPE_NOTEPAD: 21,
	/**
	 * Phone number type
	 * @const {number}
	 */
	TYPE_PHONENUM: 22,
	/**
	 * RGB color type
	 * @const {number}
	 */
	TYPE_COLOR: 23,
	/**
	 * Object type
	 * @const {number}
	 */
	TYPE_OBJECT: 24,
	/**
	 * Geocoordinates type
	 * @const {number}
	 */
	TYPE_GEOCOORDS: 25,

	/**
	 * Not visible
	 * @const {number}
	 */
	VIS_NOT: 0,
	/**
	 * Hiiden (same as not visible)
	 * @const {number}
	 */
	VIS_HIDDEN: 0,
	/**
	 * Visible on lists only
	 * @const {number}
	 */
	VIS_LIST: 1,
	/**
	 * Visible on forms only
	 * @const {number}
	 */
	VIS_FORM: 2,
	/**
	 * Visible on both lists and forms only
	 * @const {number}
	 */
	VIS_BOTH: 3,

	/**
	 * No search
	 * @const {number}
	 */
	SEARCH_NONE: 0,
	/**
	 * Simple search
	 * @const {number}
	 */
	SEARCH_MONO: 1,
	/**
	 * Multiple search (checkboxes)
	 * @const {number}
	 */
	SEARCH_MULTI_CHECK: 2,
	/**
	 * Multiple search (listbox)
	 * @const {number}
	 */
	SEARCH_MULTI_LIST: 3,
	/**
	 * Search by period (date/time)
	 * @const {number}
	 */
	SEARCH_PERIOD: 4,

	/**
	 * True
	 * @constant {string}
	 */
	TRUE: '1',
	/**
	 * False
	 * @constant {string}
	 */
	FALSE: '0',

	/**
	 * Fatal error level
	 * @const {number}
	 */
	ERRLEVEL_FATAL: 1,
	/**
	 * Error level
	 * @const {number}
	 */
	ERRLEVEL_ERROR: 2,
	/**
	 * Warning level
	 * @const {number}
	 */
	ERRLEVEL_WARNING: 3
};

/**
 * Timeout (seconds, defaults to 30)
 * @var
 */
var timeout = 30;

/**
 * Username
 * @var
 */
var username;

/**
 * Password
 * @var
 */
var password;

/**
 * Auth token
 * @var
 */
var authtoken;
 
/**
 * Parameters
 * @constant
 */
var parameters;

/**
 * Debug enabled? (defaults to false)
 * @private
 */
var _debug = false;

/**
 * Log handler
 * @param {any} arg Argument
 * @function
 */
var log = function(arg) {
	console.log(arg);
};

/**
 * Info handler
 * @param {any} arg Argument
 * @function
 */
var info = function(arg) {
	console.info(arg);
};

/**
 * Warning handler
 * @param {any} arg Argument
 * @function
 */
var warn = function(arg) {
	console.warn(arg);
};

/**
 * Error handler
 * @param {any} arg Argument
 * @function
 */
var error = function(arg) {
	console.error(arg);
};

/**
 * Debug handler
 * @param {any} arg Argument
 * @function
 */
var debug = function(arg) {
	if (_debug)
		console.log(arg);
};

/**
 * Simplicite application session
 * @param {Object} params Parameters
 * @param {string} params.url Base URL of the Simplicite application
 * @param {string} params.scheme URL scheme (e.g. <code>'https'</code>) of the Simplicite application (not needed if <code>url</code> is set)
 * @param {string} params.host Hostname or IP address (e.g. <code>'myhost.mydomain.com'</code>) of the Simplicite application (not needed if <code>url</code> is set)
 * @param {number} params.port Port (e.g. <code>443</code>) of the Simplicite application (not needed if <code>url</code> is set)
 * @param {string} params.root Root context URL (e.g. <code>'/myapp'</code>) the Simplicite application (not needed if <code>url</code> is set)
 * @param {string} params.username <strong>Optional</strong> username
 * @param {string} params.password <strong>Optional</strong> password
 * @param {string} params.authtoken² <strong>Optional</strong> auth token (if set, username and password are not needed)
 * @param {boolean} params.debug <strong>Optional</strong> debug mode? (defaults to <code>false</code>)
 * @param {function} params.debugHandler <strong>Optional</strong> debug handler function
 * @param {function} params.infoHandler <strong>Optional</strong> info handler function
 * @param {function} params.warningHandler <strong>Optional</strong> warning handler function
 * @param {function} params.errorHandler <strong>Optional</strong> error handler function
 * @param {function} params.logHandler <strong>Optional</strong> log handler function
 * @function
 */
function session(params) {
	params = params || {};

	_debug = !!params.debug;

	if (params.logHandler) info = params.logHandler;
	if (params.infoHandler) info = params.infoHandler;
	if (params.warningHandler) warn = params.warningHandler;
	if (params.errorHandler) error = params.errorHandler;
	if (params.debugHandler) debug = params.debugHandler;

	this.username = params.username || params.login; // naming flexibility
	this.password = params.password || params.pwd; // naming flexibility
	this.authtoken = params.authtoken || params.authToken || params.token; // naming flexibility

	this.timeout = params.timeout;

	if (params.url) {
		try {
			params.scheme = params.url.replace(/:.*$/, '');
			var u = params.url.replace(new RegExp('^' + params.scheme + '://'), '').split(':');
			if (u.length === 1) {
				params.host = u[0].replace(/\/.*$/, '');
				params.port = params.scheme === 'http' ? 80 : 443;
				params.root = u[0].replace(new RegExp('^' + params.host + '/?'), '');
			} else {
				params.host = u[0];
				params.port = parseInt(u[1].replace(/\/.*$/, ''), 10);
				if (isNaN(params.port))
					throw new Error('Incorrect port');
				params.root = u[1].replace(new RegExp('^' + params.port + '/?'), '');
			}
			if (params.root === '/')
				params.root = '';
		} catch (e) {
			error('Unable to parse URL [' + params.url + ']: ' + e.message);
			return;
		}
	}
	
	var scheme = params.scheme || (params.port === 443 ? 'https' : 'http');
	if (scheme !== 'http' && scheme !== 'https') {
		error('Incorrect scheme [' + params.scheme + ']');
		return;
	}
	var host = params.host || 'localhost';
	var port = params.port || 8080;
	var root = params.root || '';
	if (root === '/')
		root = '';
	
	var url = scheme + '://' + host;
	if ((scheme === 'http' && port != 80) || (scheme === 'https' && port != 443))
		url += ':' + port;
	if (root !== '')
		url += root.startsWith('/') ? root : '/' + root;
	this.debug('[simplicite] Base URL = ' + url);

	this.parameters = {
		scheme: scheme,
		host: host,
		port: port,
		root: root,
		url: url
	};

	return this;
}

/**
 * Set username
 * @param {string} usr Username
 * @function
 */
function setUsername(usr) {
	this.username = usr;
}

/**
 * Set password
 * @param {string} pwd Password
 * @function
 */
function setPassword(pwd) {
	this.password = pwd;
}

/**
 * Basic HTTP authorization header
 * @private
 */
function getBasicAuthHeader() {
	return this.username && this.password
		? 'Basic ' + (buffer.Buffer.from ? buffer.Buffer.from(this.username + ':' + this.password) : new buffer.Buffer(this.username + ':' + this.password)).toString('base64')
		: null;
}

/**
 * Set auth token
 * @param {string} t Auth token
 * @function
 */
function setAuthToken(tkn) {
	this.authtoken = tkn;
}

/**
 * Get bearer token header
 * @private
 */
function getBearerTokenHeader() {
	return this.authtoken
		? 'Bearer ' + this.authtoken
		: null;
}

/**
 * Request parameters
 * @param {object} data Data
 * @private
 */
function reqParams(data) {
	var p = '';
	if (!data) return p;
	var n = 0;
	for (var i in data) {
		var d = data[i] || '';
		if (d.name && d.content) { // Document ?
			if (d.content.startsWith('data:')) // Flexibility = extract content fron data URL
				d.content = d.content.replace(/data:.*;base64,/, '');
			p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent('id|' + (d.id ? d.id : '0') + '|name|' + d.name + '|content|' + d.content);
		} else if (d.object && d.row_id) { // Object ?
			p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent('object|' + d.object + '|row_id|' + d.row_id);
		} else if (d.sort) { // Array ?
			for (var j = 0; j < d.length; j++)
				p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent(d[j]);
		} else {
			p += (n++ !== 0 ? '&' : '') + i + '=' + encodeURIComponent(d);
		}
	}
	return p;
}

/**
 * Request
 * @param {string} path Path
 * @param {object} data Data
 * @param {function} callback Callback
 * @param {function} error Error handler
 * @private
 */
function req(path, data, callback, error) {
	var self = this;
	var m = data ? 'post' : 'get';
	var h = {};
	if (data)
		h['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
	var b = getBearerTokenHeader.call(this);
	if (b) {
		self.debug('[simplicite.req] Using bearer token header = ' + b);
		h['X-Simplicite-Authorization'] = b;
	} else {
		b = getBasicAuthHeader.call(this);
		if (b) {
			self.debug('[simplicite.req] Using basic auth header = ' + b);
			h.Authorization = b;
		}
	}
	axios.request({
		baseURL: self.parameters.url,
		url: path || '/',
		method: m,
		headers: h,
		timeout: timeout * 1000,
		withCredentials: true,
		data: data
	}).then(function (res) {
		if (callback)
			callback.call(self, res.data, res.status);
	}).catch(function(err) {
		if (error)
			error.call(self, err);
		else
			throw err;
	});
}

/**
 * Get error object
 * @param {object} err Error
 * @param {string} err.message Error message
 * @param {number} status Error status
 * @function
 */
function getError(err, status) {
	return typeof err === 'string' ? { message: err, status: status } : err;
}

/**
 * Parse result
 * @param {object} res Response to parse
 * @param {number} status HTTP status
 * @private
 */
function parse(res, status) {
	try {
		if (status !== 200)
			return { type: 'error', response: getError('HTTP status: ' + status, status) };
		return typeof res === 'object' ? res : JSON.parse(res);
	} catch (e) {
		return { type: 'error', response: getError('Parsing error: ' + e.message, status) };
	}
}

/**
 * Is used within generic UI?
 * @constant
 */
var ui = typeof window !== 'undefined' && typeof window.$ui !== 'undefined';

/**
 * Health check service path
 * @private
 */
var healthpath = (ui ? '/ui/' : '') + '/health?format=json';

/**
 * Get health check (no need to be authenticated)
 * @param {function} callback Callback (called upon success)
 * @param {object} opts Options
 * @private
 */
function _getHealth(callback, opts) {
	var self = this;
	opts = opts || {};
	req.call(self, healthpath + '&full=' + !!opts.full, undefined, function(res, status) {
		var r = parse(res, status);
		self.debug('[simplicite._getHealth] HTTP status = ' + status + ', response type = ' + res);
		if (r.type === 'error') {
			(opts.error ? opts.error : error).call(self, r.response);
		} else {
			if (callback)
				callback.call(self, r);
		}
	}, function(e) {
		(opts.error ? opts.error : error).call(self, e);
	});
}

/**
 * Get health check (no need to be authenticated)
 * @param {object} opts Options
 * @param {boolean} opts.full <strong>Optional</strong> full health check? (defaults to <code>false</code>)
 * @param {function} opts.error <strong>Optional</strong> error handler function
 * @function
 */
function getHealth(opts) {
	var d = Q.defer();
	opts = opts || {};
	opts.error = function(e) { var err = getError(e); d.reject(err); };
	_getHealth.call(this, function(health) { health = health || {}; d.resolve(health); }, opts);
	return d.promise;
}

/**
 * Application services path
 * @private
 */
var apppath = '/' + (ui ? 'ui' : 'api') + '/json/app';

/**
 * Business object services path
 * @private
 */
var objpath = '/' + (ui ? 'ui' : 'api') + '/json/obj';

/*
 * Business processes services path
 * @private
var pcspath = '/' + (ui ? 'ui' : 'api') + '/json/pcs';
 */

/*
 * External object services path
 * @private
var extpath = '/' + (ui ? 'ui' : 'api') + '/ext';
 */

/**
 * Clears all data (credentials, objects, ...)
 * @function
 */
function clear() {
	this.username = undefined;
	this.password = undefined;
	this.authtoken = undefined;
	this.sessionid = undefined;

	this.grant = undefined;

	this.appinfo = undefined;
	this.sysinfo = undefined;
	this.userinfo = undefined;

	businessObjectCache = {};
}

/**
 * Login
 * @param {function} callback Callback (called upon success)
 * @param {object} opts Options
 * @private
 */
function _login(callback, opts) {
	var self = this;
	opts = opts || {};
	if (opts.username || opts.login) {
		clear();
		self.username = opts.username || opts.login;
		if (opts.password || opts.pwd)
			self.password = opts.password || opts.pwd;	
	}
	req.call(self, apppath + '?action=session', undefined, function(res, status) {
		var r = parse(res, status);
		self.debug('[simplicite.login] HTTP status = ' + status + ', response type = ' + r.type);
		if (r.type === 'error') {
			(opts.error ? opts.error : error).call(self, r.response);
		} else {
			self.sessionid = r.response.id;
			self.debug('[simplicite.login] Session ID = ' + self.sessionid);
			self.username = r.response.login;
			if (self.username)
				self.debug('[simplicite.login] Username = ' + self.username);
			self.authtoken = r.response.authtoken;
			if (self.authtoken)
				self.debug('[simplicite.login] Auth token = ' + self.authtoken);
			// Minimal grant from session data
			self.grant = {
				login: r.response.login,
				userid: r.response.userid,
				firstname: r.response.firstanme,
				lastname: r.response.lastname,
				email: r.response.email
			};
			if (callback)
				callback.call(self, r.response);
		}
	}, function(e) {
		(opts.error ? opts.error : error).call(self, e);
	});
}

/**
 * Login
 * @param {object} opts Options
 * @param {string} opts.username <strong>Optional</strong> username
 * @param {string} opts.password <strong>Optional</strong> password
 * @param {function} opts.error <strong>Optional</strong> error handler function
 * @function
 */
function login(opts) {
	var d = Q.defer();
	opts = opts || {};
	opts.error = function(e) { d.reject(e); };
	_login.call(this, function(res) { d.resolve(res); }, opts);
	return d.promise;
}

/**
 * Logout
 * @param {function} callback Callback (called upon success)
 * @param {object} opts Options
 * @private
 */
function _logout(callback, opts) {
	var self = this;
	opts = opts || {};
	req.call(self, apppath + '?action=logout', undefined, function(res, status) {
		var r = parse(res, status);
		self.debug('[simplicite.logout] HTTP status = ' + status + ', response type = ' + r.type);
		if (r.type === 'error') {
			(opts.error ? opts.error : error).call(self, r.response);
		} else {
			clear.call(self);
			if (callback)
				callback.call(self, r.response);
		}
	}, function(e) {
		if (e.status === 401) // Removes (expired or deleted) token if any
			self.authtoken = undefined;
		(opts.error ? opts.error : error).call(self, e);
	});
}

/**
 * Logout
 * @param {function} callback Callback (called upon success)
 * @param {object} opts Options
 * @param {function} opts.error <strong>Optional</strong> error handler function
 * @function
 */
function logout(opts) {
	var d = Q.defer();
	opts = opts || {};
	opts.error = function(e) { d.reject(e); };
	_logout.call(this, function(res) { d.resolve(res); }, opts);
	return d.promise;
}

/**
 * Grant
 * @var
 */
var grant;

/**
 * Get user (grant)
 * @param {function} callback Callback (called upon success)
 * @param {object} opts Options
 * @private
 */
function _getGrant(callback, opts) {
	var self = this;
	opts = opts || {};
	var p = '';
	if (opts.inlinePicture)
		p += '&inline_picture=' + !!opts.inlinePicture;
	req.call(self, apppath + '?action=getgrant' + p, undefined, function(res, status) {
		var r = parse(res, status);
		self.debug('[simplicite.getGrant] HTTP status = ' + status + ', response type = ' + r.type);
		if (r.type === 'error') {
			(opts.error ? opts.error : error).call(self, r.response);
		} else {
			self.grant = r.response;
			/*if (self.grant.picture) {
				self.grant.picture.url = self.documentURL('User', 'usr_image_id', self.grant.userid, self.grant.picture.id);
				self.grant.picture.thumbnailurl = self.grant.picture.url + '&thumbnail=true';
			}*/
			self.grant.getUserId = function() { return this.userid; };
			self.grant.getLUsername = function() { return this.login; };
			self.grant.getLogin = self.grant.getLUsername; // Naming flexibility
			self.grant.getLang = function() { return this.lang; };
			self.grant.getEmail = function() { return this.email; };
			self.grant.getFirstname = function() { return this.firstname; };
			self.grant.getFirstName = self.grant.getFirstname;
			self.grant.getLastname = function() { return this.lastname; };
			self.grant.getLastName = self.grant.getLastname; // Naming flexibility
			self.grant.hasResponsibility = function(group) { return this.responsibilities && this.responsibilities.indexOf(group) !== -1; };
			if (callback)
				callback.call(self, self.grant);
		}
	}, function(e) {
		(opts.error ? opts.error : error).call(self, e);
	});
}

/**
 * Get grant (current user data)
 * @param {object} opts Options
 * @param {boolean} opts.inlinePicture <strong>Optional</strong> inline user picture?
 * @param {function} opts.error <strong>Optional</strong> error handler function
 * @function
 */
function getGrant(opts) {
	var d = Q.defer();
	opts = opts || {};
	opts.error = function(e) { d.reject(e); };
	_getGrant.call(this, function(grant) { d.resolve(grant); }, opts);
	return d.promise;
}

/**
 * Change password
 * @param {function} callback Callback (called upon success)
 * @param {object} opts Options
 * @private
 */
function _changePassword(callback, password, opts) {
	var self = this;
	opts = opts || {};
	req.call(self, apppath + '?action=setpassword&password=' + password, undefined, function(res, status) {
		var r = parse(res, status);
		self.debug('[simplicite.changePassword] HTTP status = ' + status + ', response type = ' + r.type);
		if (r.type === 'error') {
			(opts.error ? opts.error : error).call(self, r.response);
		} else {
			if (callback)
				callback.call(self, self.r.response);
		}
	}, function(e) {
		(opts.error ? opts.error : error).call(self, e);
	});
}

/**
 * Change password
 * @param {object} opts Options
 * @param {function} opts.error <strong>Optional</strong> error handler function
 * @function
 */
function changePassword(opts) {
	var d = Q.defer();
	opts = opts || {};
	opts.error = function(e) { d.reject(e); };
	_changePassword.call(this, function(res) { d.resolve(res); }, opts);
	return d.promise;
}

/**
 * Get application info
 * @param {function} callback Callback (called upon success)
 * @param {object} opts Options
 * @private
 */
function _getAppInfo(callback, opts) {
	var self = this;
	opts = opts || {};
	req.call(self, apppath + '?action=getinfo', undefined, function(res, status) {
		var r = parse(res, status);
		self.debug('[simplicite.getAppInfo] HTTP status = ' + status + ', response type = ' + r.type);
		if (r.type === 'error') {
			(opts.error ? opts.error : error).call(self, r.response);
		} else {
			self.appinfo = r.response;
			if (callback)
				callback.call(self, self.appinfo);
		}
	}, function(e) {
		(opts.error ? opts.error : error).call(self, e);
	});
}

/**
 * Get application info
 * @param {object} opts Options
 * @param {function} opts.error <strong>Optional</strong> error handler function
 * @function
 */
function getAppInfo(opts) {
	var d = Q.defer();
	opts = opts || {};
	opts.error = function(e) { d.reject(e); };
	_getAppInfo.call(this, function(appinfo) { d.resolve(appinfo); }, opts);
	return d.promise;
}

/**
 * Get system info
 * @param {function} callback Callback (called upon success)
 * @param {object} opts Options
 * @private
 */
function _getSysInfo(callback, opts) {
	var self = this;
	opts = opts || {};
	req.call(self, apppath + '?action=sysinfo', undefined, function(res, status) {
		var r = parse(res, status);
		self.debug('[simplicite.getSysInfo] HTTP status = ' + status + ', response type = ' + r.type);
		if (r.type === 'error') {
			(opts.error ? opts.error : error).call(self, r.response);
		} else {
			self.sysinfo = r.response;
			if (callback)
				callback.call(self, self.sysinfo);
		}
	}, function(e) {
		(opts.error ? opts.error : error).call(self, e);
	});
}

/**
 * Get system info
 * @param {object} opts Options
 * @param {function} opts.error <strong>Optional</strong> error handler function
 * @function
 */
function getSysInfo(opts) {
	var d = Q.defer();
	opts = opts || {};
	opts.error = function(e) { d.reject(e); };
	_getSysInfo.call(this, function(sysinfo) { d.resolve(sysinfo); }, opts);
	return d.promise;
}

/**
 * Get user info
 * @param {function} callback Callback (called upon success)
 * @param {string} userlogin User login
 * @param {object} opts Options
 * @private
 */
function _getUserInfo(callback, userlogin, opts) {
	var self = this;
	opts = opts || {};
	req.call(self, apppath + '?action=userinfo' + (userlogin ? '&login=' + userlogin: ''), undefined, function(res, status) {
		var r = parse(res, status);
		self.debug('[simplicite.getUserInfo] HTTP status = ' + status + ', response type = ' + r.type);
		if (r.type === 'error') {
			(opts.error ? opts.error : error).call(self, r.response);
		} else {
			self.userinfo = r.response;
			if (callback)
				callback.call(self, self.userinfo);
		}
	}, function(e) {
		(opts.error ? opts.error : error).call(self, e);
	});
}

/**
 * Get user info
 * @param {string} userlogin User login
 * @param {object} opts Options
 * @param {function} opts.error <strong>Optional</strong> error handler function
 * @function
 */
function getUserInfo(userlogin, opts) {
	var d = Q.defer();
	if (opts === undefined) opts = {};
	opts.error = function(e) { d.reject(e); };
	_getUserInfo.call(this, function(userinfo) { d.resolve(userinfo); }, userlogin, opts);
	return d.promise;
}

/**
 * Get news
 * @param {function} callback Callback (called upon success)
 * @param {object} opts Options
 * @private
 */
function _getNews(callback, opts) {
	var self = this;
	opts = opts || {};
	var p = '';
	if (opts.inlineImages)
		p += '&inline_images=' + opts.inlineImages;
	req.call(self, apppath + '?action=news' + p, undefined, function(res, status) {
		var r = parse(res, status);
		self.debug('[simplicite.getNews] HTTP status = ' + status + ', response type = ' + r.type);
		if (r.type === 'error') {
			(opts.error ? opts.error : error).call(self, r.response);
		} else {
			self.news = r.response;
			if (callback)
				callback.call(self, self.news);
		}
	}, function(e) {
		(opts.error ? opts.error : error).call(self, e);
	});
}

/**
 * Get news
 * @param {object} opts Options
 * @param {boolean} opts.inlineImages <strong>Optional</strong> Inline news images?
 * @param {function} opts.error <strong>Optional</strong> error handler function
 * @function
 */
function getNews(opts) {
	var d = Q.defer();
	opts = opts || {};
	opts.error = function(e) { d.reject(e); };
	_getNews.call(this, function(news) { d.resolve(news); }, opts);
	return d.promise;
}

/**
 * Business objects cache
 * @type {object}
 * @private
 */
var businessObjectCache = {};

/**
 * Get business object cache key
 * @param {string} name Business object name
 * @param {string} instance <strong>Optional</strong> business object instance name
 * @returns Business object cache key
 * @function
 */
function getBusinessObjectCacheKey(name, instance) {
	return name + ':' + (instance || 'js_' + name);
}

/**
 * Business object meta data.
 * <br/><span style="color: red;">You <strong>should never</strong> instanciate this class directly
 * but rather use it from the <code>metadata</code> variable of your <code>BusinessObject</code> instances</span>.
 * @param {string} name Business object name
 * @param {string} instance <strong>Optional</strong> business object instance name
 * @class
 */
function BusinessObjectMetadata (name, instance) {
	/**
	 * Name
	 * @constant {string}
	 */
	this.name = name;

	/**
	 * Instance name
	 * @constant {string}
	 */
	this.instance = instance;

	/**
	 * Row ID field name
	 * @var {string}
	 */
	this.rowidfield = constants.DEFAULT_ROW_ID_NAME;

	/**
	 * Display label
	 * @var {string}
	 */
	this.label = name;

	/**
	 * Help
	 * @var {string}
	 */
	this.help = '';

	/**
	 * Fields definitions
	 * @var {Array}
	 */
	this.fields = [];
}

/**
 * Business object.
 * <br/><span style="color: red;">ou <strong>should never</strong> instanciate this class directly
 * but rather call <code>getBusinessObject</code> to get a cached instance</span>.
 * @param {object} session Session
 * @param {string} name Business object name
 * @param {string} instance <strong>Optional</strong> business object instance name
 * @class
 */
function BusinessObject(session, name, instance) {
	instance = instance || 'js_' + name;

	/**
	 * Session
	 * @private
	 */
	this.session = session;

	/**
	 * Object metadata
	 * @var {BusinessObjectMetadata}
	 */
	this.metadata = new BusinessObjectMetadata(name, instance);

	/**
	 * cache key
	 * @constant {string}
	 */
	this.cacheKey = getBusinessObjectCacheKey(name, instance);

	/**
	 * Path
	 * @constant {string}
	 */
	this.path = objpath + '?object=' + name + '&inst=' + instance;

	/**
	 * Current item
	 * @var {Object}
	 */
	this.item = {};

	/**
	 * Current filters
	 * @var {Object}
	 */
	this.filters = {};

	/**
	 * Current list
	 * @var {Object[]}
	 */
	this.list = [];

	/**
	 * Get meta data
	 * @param {function} callback Callback (called upon success)
	 * @param {object} opts Options
	 * @private
	 */
	function _getMetaData(callback, opts) {
		var self = this;
		opts = opts || {};
		var p = '';
		if (opts.context)
			p += '&context=' + opts.context;
		if (opts.contextParam)
			p += '&contextparam=' + opts.contextParam;
		req.call(self.session, self.path + '&action=metadata' + p, undefined, function(res, status) {
			var r = parse(res, status);
			this.debug('[simplicite.BusinessObject.getMetaData] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : error).call(self, r.response);
			} else {
				self.metadata = r.response;
				if (callback)
					callback.call(self, self.metadata);
			}
		}, function(e) {
			(opts.error ? opts.error : error).call(self, e);
		});
	}

	/**
	 * Get meta data
	 * @param {object} opts Options
	 * @param {number} opts.context <strong>Optional</strong> context
	 * @param {string} opts.contextParam <strong>Optional</strong> context parameter
	 * @param {function} opts.error <strong>Optional</strong> error handler function
	 * @function
	 */
	this.getMetaData = function(opts) {
		var d = Q.defer();
		_getMetaData.call(this, function(metadata) { d.resolve(metadata); }, opts);
		return d.promise;
	};

	/**
	 * Get name
	 * @returns {string} Name
	 * @function
	 */
	this.getName = function() {
		return this.metadata.name;
	};

	/**
	 * Get instance name
	 * @returns {string} Instance name
	 * @function
	 */
	this.getInstance = function() {
		return this.metadata.instance;
	};

	/**
	 * Get display label
	 * @returns {string} Display label
	 * @function
	 */
	this.getLabel = function() {
		return this.metadata.label;
	};

	/**
	 * Get help
	 * @returns {string} Help
	 * @function
	 */
	this.getHelp = function() {
		return this.metadata.help;
	};

	/**
	 * Get all fields definitions
	 * @returns {Array} Array of field definitions
	 * @function
	 */
	this.getFields = function() {
		return this.metadata.fields;
	};

	/**
	 * Get a field definition
	 * @param {string} fieldName Field name
	 * @returns {Object} Field definition
	 * @function
	 */
	this.getField = function(fieldname) {
		var n = 0;
		var fs = this.getFields();
		while (n < fs.length && fs[n].name !== fieldname) n++;
		if (n < fs.length)
			return fs[n];
	};

	/**
	 * Get row ID field name
	 * @returns {string} Row ID field name
	 * @function
	 */
	this.getRowIdFieldName = function() {
		return this.metadata.rowidfield;
	};

	/**
	 * Get row ID field definition
	 * @returns {Object} Row ID field definition
	 * @function
	 */
	this.getRowIdField = function() {
		return this.getField(this.getRowIdFieldName());
	};

	/**
	 * Get links
	 * @returns {Array} Array of links
	 * @function
	 */
	this.getLinks = function() {
		return this.metadata.links;
	};

	/**
	 * Get list value of field fro code
	 * @param {Object} field Field definition
	 * @param {string} code Code
	 * @returns {string} Value
	 * @function
	 */
	this.getValueForCode = function(field, code) {
		var n = 0;
		var l = field.listOfValues;
		if (l === undefined)
			return code;
		while (n < l.length && l[n].code !== code) n++;
		return n === l.length ? code : l[n].value;
	};

	/**
	 * Get list value for code
	 * @param {list} list List of values
	 * @param {string} code Code
	 * @returns {string} Value
	 * @function
	 */
	this.getListValue = function(list, code) {
		for (var i = 0; i < list.length; i++) {
			var l = list[i];
			if (l.code === code)
				return l.value;
		}
	};

	/**
	 * Is the field the row ID field?
	 * @param {Object} field Field definition
	 * @returns True if the field is the row ID field
	 * @function
	 */
	this.isRowIdField = function(field) {
		return !field.ref && field.name === this.metadata.rowidfield;
	};

	/**
	 * Is the field a timestamp field?
	 * @param {Object} field Field definition
	 * @returns True if the field is a timestamp field
	 * @function
	 */
	this.isTimestampField = function(field) {
		var n = field.name;
		return !field.ref && (n === 'created_by' || n === 'created_dt' || n === 'updated_by' || n === 'updated_dt');
	};

	/**
	 * Get current filters
	 * @param {function} callback Callback (called upon success)
	 * @param {object} opts Options
	 * @private
	 */
	function _getFilters(callback, opts) {
		var self = this;
		opts = opts || {};
		var p = '';
		if (opts.context)
			p += '&context=' + opts.context;
		if (opts.reset)
			p += '&reset=' + !!opts.reset;
		req.call(self.session, self.path + '&action=filters' + p, undefined, function(res, status) {
			var r = parse(res, status);
			this.debug('[simplicite.BusinessObject.getFilters] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : error).call(self, r.response);
			} else {
				self.item = r.response;
				if (callback)
					callback.call(self, self.filters);
			}
		}, function(e) {
			(opts.error ? opts.error : error).call(self, e);
		});
	}

	/**
	 * Get current filters
	 * @param {object} opts Options
	 * @param {number} opts.context <strong>Optional</strong> context
	 * @param {boolean} opts.rest <strong>Optional</strong> reset filters?
	 * @param {function} opts.error <strong>Optional</strong> error handler function
	 * @function
	 */
	this.getFilters =function(opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = function(e) { d.reject(e); };
		_getFilters.call(this, function(filters) { d.resolve(filters); }, opts);
		return d.promise;
	};

	/**
	 * Build options parameters
	 * @param {object} options Options
	 * @private
	 */
	function _getOptions(options) {
		var opts = '';
		if (options.context)
			opts += '&context=' + options.context;
		var id = options.inlineDocs;
		if (!id)
			id = options.inlineDocuments;
		if (id)
			opts += '&inline_documents=' + (id.join ? id.join(',') : id);
		var it = options.inlineThumbs;
		if (!it)
			it = options.inlineThumbnails;
		if (it)
			opts += '&inline_thumbnails=' + (it.join ? it.join(',') : it);
		var io = options.inlineObjs;
		if (!io)
			io = options.inlineObjects;
		if (io)
			opts += '&inline_objects=' + (io.join ? io.join(',') : io);
		return opts;
	}

	/**
	 * Count
	 * @param {function} callback Callback (called upon success)
	 * @param {object} filters Filters (defaults to current filters)
	 * @param {object} opts Options
	 * @private
	 */
	function _count(callback, filters, opts) {
		var self = this;
		opts = opts || {};
		self.filters = filters || {};
		req.call(self.session, self.path + '&action=count', reqParams(self.filters), function(res, status) {
			var r = parse(res, status);
			this.debug('[simplicite.BusinessObject.getCount] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : error).call(self, r.response);
			} else {
				self.count = r.response.count;
				self.page = r.response.page >= 0 ? r.response.page + 1 : undefined;
				self.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : undefined;
				self.list = [];
				if (callback)
					callback.call(self, self.count);
			}
		}, function(e) {
			(opts.error ? opts.error : error).call(self, e);
		});
	}

	/**
	 * Count
	 * @param {object} filters Filters (defaults to current filters)
	 * @param {object} opts Options
	 * @param {function} opts.error <strong>Optional</strong> error handler function
	 * @function
	 */
	this.count = function(filters, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = function(e) { d.reject(e); };
		_count.call(this, function(count) { d.resolve(count); }, filters, opts);
		return d.promise;
	};

	/**
	 * Count, **deprecated**: use <code>count</code> instead
	 * @deprecated
	 * @function
	 */
	this.getCount = this.count;

	/**
	 * Search
	 * @param {function} callback Callback (called upon success)
	 * @param {object} filters Filters (defaults to current filters)
	 * @param {object} opts Options
	 * @private
	 */
	function _search(callback, filters, opts) {
		var self = this;
		opts = opts || {};
		var p = _getOptions(opts);
		if (opts.page > 0)
			p += '&page=' + (opts.page - 1);
		if (opts.metadata===true) p += '&_md=true';
		if (opts.visible===true) p += '&_visible=true';
		self.filters = filters || {};
		req.call(self.session, self.path + '&action=search' + p, reqParams(self.filters), function(res, status) {
			var r = parse(res, status);
			this.debug('[simplicite.BusinessObject.search] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : error).call(self, r.response);
			} else {
				if (res.meta)
					self.metadata = r.response.meta;
				self.count = r.response.count;
				self.page = r.response.page >= 0 ? r.response.page + 1 : undefined;
				self.maxpage = r.response.maxpage >= 0 ? r.response.maxpage + 1 : undefined;
				self.list = r.response.list;
				if (callback)
					callback.call(self, self.list);
			}
		}, function(e) {
			(opts.error ? opts.error : error).call(self, e);
		});
	}

	/**
	 * Search
	 * @param {object} filters Filters (defaults to current filters)
	 * @param {object} opts Options
	 * @param {number} opts.page <strong>Optional</strong> page number
	 * @param {boolean} opts.metadata <strong>Optional</strong> refresh meta data?
	 * @param {boolean} opts.visible <strong>Optional</strong> only visible fields?
	 * @param {function} opts.error <strong>Optional</strong> error handler function
	 * @function
	 */
	this.search = function(filters, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = function(e) { d.reject(e); };
		_search.call(this, function(list) { d.resolve(list); }, filters, opts);
		return d.promise;
	};

	/**
	 * Get
	 * @param {function} callback Callback (called upon success)
	 * @param {string} rowId Row ID
	 * @param {object} opts Options
	 * @private
	 */
	function _get(callback, rowId, opts) {
		var self = this;
		opts = opts || {};
		var p = _getOptions(opts);
		var tv = opts.treeView;
		if (tv)
			p += '&treeview=' + tv;
		if (opts.fields) {
			for (var i = 0; i < opts.fields.length; i++) {
				p += '&fields=' + opts.fields[i].replace('.', '__');
			}
		}
		if (opts.metadata) p += '&_md=true';
		if (opts.social) p += '&_social=true';
		req.call(self.session, self.path + '&action=get&' + self.metadata.rowidfield + '=' + rowId + p, undefined, function(res, status) {
			var r = parse(res, status);
			this.debug('[simplicite.BusinessObject.get] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : error).call(self, r.response);
			} else {
				if (res.meta)
					self.metadata = r.response.meta;
				if (res.data)
					self.item = tv ? r.response.data.item : r.response.data;
				else
					self.item = tv ? r.response.item : r.response;
				if (callback)
					callback.call(self, tv ? r.response : self.item);
			}
		}, function(e) {
			(opts.error ? opts.error : error).call(self, e);
		});
	}

	/**
	 * Get
	 * @param {string} rowId Row ID
	 * @param {object} opts Options
	 * @param {boolean} opts.metadata <strong>Optional</strong> refresh meta data?
	 * @param {string[]} opts.fields <strong>Optional</strong> return only these fields
	 * @param {string} opts.treeview <strong>Optional</strong> return named tree view
	 * @param {function} opts.error <strong>Optional</strong> error handler function
	 * @function
	 */
	this.get = function(rowId, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = function(e) { d.reject(e); };
		_get.call(this, function(itm) { d.resolve(itm); }, rowId, opts);
		return d.promise;
	};

	/**
	 * Get for create
	 * @param {function} callback Callback (called upon success)
	 * @param {object} opts Options
	 * @private
	 */
	function _getForCreate(callback, opts) {
		opts = opts || {};
		delete opts.treeview; // Inhibited in this context
		delete opts.fields; // Inhibited in this context
		opts.context = constants.CONTEXT_CREATE;
		_get.call(this, callback, this.session.constants.DEFAULT_ROW_ID, opts);
	}

	/**
	 * Get for create
	 * @param {object} opts Options
	 * @param {boolean} opts.metadata <strong>Optional</strong> refresh meta data?
	 * @param {function} opts.error <strong>Optional</strong> error handler function
	 * @function
	 */
	this.getForCreate = function(opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = function(e) { d.reject(e); };
		_getForCreate.call(this, function(itm) { d.resolve(itm); }, opts);
		return d.promise;
	};

	/**
	 * Get for update
	 * @param {function} callback Callback (called upon success)
	 * @param {string} rowId Row ID
	 * @param {object} opts Options
	 * @private
	 */
	function _getForUpdate(callback, rowId, opts) {
		opts = opts || {};
		delete opts.treeview; // Inhibited in this context
		delete opts.fields; // Inhibited in this context
		opts.context = constants.CONTEXT_UPDATE;
		_get.call(this, callback, rowId, opts);
	}

	/**
	 * Get for update
	 * @param {string} rowId Row ID
	 * @param {object} opts Options
	 * @param {boolean} opts.metadata <strong>Optional</strong> refresh meta data?
	 * @param {function} opts.error <strong>Optional</strong> error handler function
	 * @function
	 */
	this.getForUpdate = function(rowId, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = function(e) { d.reject(e); };
		_getForUpdate.call(this, function(itm) { d.resolve(itm); }, rowId, opts);
		return d.promise;
	};

	/**
	 * Get for copy
	 * @param {function} callback Callback (called upon success)
	 * @param {string} rowId Row ID to copy
	 * @param {object} opts Options
	 * @private
	 */
	function _getForCopy(callback, rowId, opts) {
		opts = opts || {};
		delete opts.treeview; // Inhibited in this context
		delete opts.fields; // Inhibited in this context
		opts.context = constants.CONTEXT_COPY;
		_get.call(this, callback, rowId, opts);
	}

	/**
	 * Get for copy
	 * @param {string} rowId Row ID to copy
	 * @param {object} opts Options
	 * @param {boolean} opts.metadata <strong>Optional</strong> refresh meta data?
	 * @param {function} opts.error <strong>Optional</strong> error handler function
	 * @function
	 */
	this.getForCopy = function(rowId, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = function(e) { d.reject(e); };
		_getForCopy.call(this, function(itm) { d.resolve(itm); }, rowId, opts);
		return d.promise;
	};

	/**
	 * Get for delete
	 * @param {function} callback Callback (called upon success)
	 * @param {string} rowId Row ID
	 * @param {object} opts Options
	 * @private
	 */
	function _getForDelete(callback, rowId, opts) {
		opts = opts || {};
		delete opts.treeview; // Inhibited in this context
		delete opts.fields; // Inhibited in this context
		opts.context = constants.CONTEXT_CREATE;
		_get.call(this, callback, rowId, opts);
	}

	/**
	 * Get for delete
	 * @param {string} rowId Row ID
	 * @param {object} opts Options
	 * @param {boolean} opts.metadata <strong>Optional</strong> refresh meta data?
	 * @param {function} opts.error <strong>Optional</strong> error handler function
	 * @function
	 */
	this.getForDelete = function(rowId, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = function(e) { d.reject(e); };
		_getForDelete.call(this, function(itm) { d.resolve(itm); }, rowId, opts);
		return d.promise;
	};

	/**
	 * Get current item's row ID value
	 * @returns Current item's row ID value
	 * @function
	 */
	this.getRowId = function() {
		if (this.item)
			return this.item[this.getRowIdFieldName()];
	};

	/**
	 * Populate
	 * @param {function} callback Callback (called upon success)
	 * @param {string} rowId Row ID
	 * @param {object} opts Options
	 * @private
	 */
	function _populate(callback, rowId, opts) {
		var self = this;
		opts = opts || {};
		var p = _getOptions(opts);
		req.call(self.session, self.path + '&action=populate&' + self.metadata.rowidfield + '=' + rowId + p, undefined, function(res, status) {
			var r = parse(res, status);
			this.debug('[simplicite.BusinessObject.populate] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : error).call(self, r.response);
			} else {
				self.item = r.response;
				if (callback)
					callback.call(self, self.item);
			}
		}, function(e) {
			(opts.error ? opts.error : error).call(self, e);
		});
	}

	/**
	 * Populate
	 * @param {string} rowId Row ID
	 * @param {object} opts Options
	 * @param {function} opts.error <strong>Optional</strong> error handler function
	 * @function
	 */
	this.populate = function(itm, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = function(e) { d.reject(e); };
		_populate.call(this, function(i) { d.resolve(i); }, itm, opts);
		return d.promise;
	};

	/**
	 * Save
	 * @param {function} callback Callback (called upon success)
	 * @param {object} item Item (defaults to current item)
	 * @param {object} opts Options
	 * @private
	 */
	function _save(callback, item, opts) {
		if (item)
			this.item = item;
		var rowId = this.item[this.metadata.rowidfield];
		if (!rowId || rowId === constants.DEFAULT_ROW_ID)
			_create.call(this, callback, item, opts);
		else
			_update.call(this, callback, item, opts);
	}
	
	/**
	 * Save
	 * @param {object} item Item (defaults to current item)
	 * @param {object} opts Options
	 * @param {function} opts.error <strong>Optional</strong> error handler function
	 * @function
	 */
	this.save = function(itm, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = function(e) { d.reject(e); };
		_save.call(this, function(i) { d.resolve(i); }, itm, opts);
		return d.promise;
	};

	/**
	 * Create (create or update)
	 * @param {function} callback Callback (called upon success)
	 * @param {object} item Item (defaults to current item)
	 * @param {object} opts Options
	 * @private
	 */
	function _create(callback, item, opts) {
		var self = this;
		if (item)
			self.item = item;
		opts = opts || {};
		var p = _getOptions(opts);
		req.call(self.session, self.path + '&action=create' + p, reqParams(self.item), function(res, status) {
			var r = parse(res, status);
			this.debug('[simplicite.BusinessObject.create] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : error).call(self, r.response);
			} else {
				self.item = r.response.data ? r.response.data : r.response;
				if (callback)
					callback.call(self, self.item);
			}
		}, function(e) {
			(opts.error ? opts.error : error).call(self, e);
		});
	}

	/**
	 * Create (create or update)
	 * @param {object} item Item (defaults to current item)
	 * @param {object} opts Options
	 * @param {function} opts.error <strong>Optional</strong> error handler function
	 * @function
	 */
	this.create = function(itm, opts) {
		itm.row_id = this.session.constants.DEFAULT_ROW_ID;
		var d = Q.defer();
		opts = opts || {};
		opts.error = function(e) { d.reject(e); };
		_create.call(this, function(i) { d.resolve(i); }, itm, opts);
		return d.promise;
	};

	/**
	 * Update
	 * @param {function} callback Callback (called upon success)
	 * @param {object} item Item (defaults to current item)
	 * @param {object} opts Options
	 * @private
	 */
	function _update(callback, item, opts) {
		var self = this;
		if (item)
			self.item = item;
		opts = opts || {};
		var p = _getOptions(opts);
		req.call(self.session, self.path + '&action=update' + p, reqParams(self.item), function(res, status) {
			var r = parse(res, status);
			this.debug('[simplicite.BusinessObject.update] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : error).call(self, r.response);
			} else {
				self.item = r.response.data ? r.response.data : r.response;
				if (callback)
					callback.call(self, self.item);
			}
		}, function(e) {
			(opts.error ? opts.error : error).call(self, e);
		});
	}

	/**
	 * Update
	 * @param {object} item Item (defaults to current item)
	 * @param {object} opts Options
	 * @param {function} opts.error <strong>Optional</strong> error handler function
	 * @function
	 */
	this.update = function(itm, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = function(e) { d.reject(e); };
		_update.call(this, function(i) { d.resolve(i); }, itm, opts);
		return d.promise;
	};

	/**
	 * Delete
	 * @param {function} callback Callback (called upon success)
	 * @param {object} item Item (defaults to current item)
	 * @param {object} opts Options
	 * @private
	 */
	function _del(callback, item, opts) {
		var self = this;
		if (item)
			self.item = item;
		opts = opts || {};
		req.call(self.session, self.path + '&action=delete&' + self.metadata.rowidfield + '=' + self.item[self.metadata.rowidfield], undefined, function(res, status) {
			var r = parse(res, status);
			this.debug('[simplicite.BusinessObject.del] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : error).call(self, r.response);
			} else {
				self.item = undefined;
				delete r.response.undoredo;
				if (callback)
					callback.call(self, r.response);
			}
		}, function(e) {
			(opts.error ? opts.error : error).call(self, e);
		});
	}

	/**
	 * Delete
	 * @param {object} item Item (defaults to current item)
	 * @param {object} opts Options
	 * @param {function} opts.error <strong>Optional</strong> error handler function
	 * @function
	 */
	this.del = function(itm, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = function(e) { d.reject(e); };
		_del.call(this, function(r) { d.resolve(r); }, itm, opts);
		return d.promise;
	};

	/**
	 * Invoke a custom action
	 * @param {function} callback Callback (called upon success)
	 * @param {string} action Action name
	 * @param {string} rowId <strong>Optional</strong> row ID
	 * @param {object} opts Options
	 * @private
	 */
	function _action(callback, action, rowId, opts) {
		var self = this;
		opts = opts || {};
		req.call(self.session, self.path + '&action=' + action + (opts.rowId ? '&row_id=' + rowId : ''), undefined, function(res, status) {
			var r = parse(res, status);
			this.debug('[simplicite.BusinessObject.action(' + action + ')] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : error).call(self, r.response);
			} else {
				var result = r.response.result;
				if (callback)
					callback.call(self, result);
			}
		}, function(e) {
			(opts.error ? opts.error : error).call(self, e);
		});
	}

	/**
	 * Invoke a custom action
	 * @param {string} action Action name
	 * @param {object} opts Options
	 * @param {function} opts.error <strong>Optional</strong> error handler function
	 * @function
	 */
	this.action = function(act, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = function(e) { d.reject(e); };
		_action.call(this, function(res) { d.resolve(res); }, act, opts);
		return d.promise;
	};

	/**
	 * Build a pivot table
	 * @param {function} callback Callback (called upon success)
	 * @param {string} crosstab Pivot table name
	 * @param {object} opts Options
	 * @private
	 */
	function _crosstab(callback, crosstab, opts) {
		var self = this;
		opts = opts || {};
		if (opts.filters)
			self.filters = opts.filters;
		req.call(self.session, self.path + '&action=crosstab&crosstab=' + crosstab, reqParams(self.filters), function(res, status) {
			var r = parse(res, status);
			this.debug('[simplicite.BusinessObject.crosstab(' + crosstab + ')] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : error).call(self, r.response);
			} else {
				self.crosstabdata = r.response;
				if (callback)
					callback.call(self, self.crosstabdata);
			}
		}, function(e) {
			(opts.error ? opts.error : error).call(self, e);
		});
	}

	/**
	 * Build a pivot table
	 * @param {string} crosstab Pivot table name
	 * @param {object} opts Options
	 * @param {Object} opts.filters <strong>Optional</strong> filters
	 * @param {function} opts.error <strong>Optional</strong> error handler function
	 * @function
	 */
	this.crosstab = function(ctb, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = function(e) { d.reject(e); };
		_crosstab.call(this, function(res) { d.resolve(res); }, ctb, opts);
		return d.promise;
	};

	/**
	 * Build a custom publication
	 * @param {function} callback Callback (called upon success)
	 * @param {string} prt Publication name
	 * @param {object} opts Options
	 * @private
	 */
	function _print(callback, prt, opts) {
		var self = this;
		opts = opts || {};
		if (opts.filters)
			self.filters = opts.filters;
		var p = '';
		if (opts.all)
			p += '&all=' + opts.all;
		if (opts.mailing)
			p += '&mailing=' + opts.mailing;
		req.call(self.session, self.path + '&action=print&printtemplate=' + prt + p, undefined, function(res, status) {
			var r = parse(res, status);
			this.debug('[simplicite.BusinessObject.print(' + prt + ')] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : error).call(self, r.response);
			} else {
				var result = r.response.result;
				if (callback)
					callback.call(self, result);
			}
		}, function(e) {
			(opts.error ? opts.error : error).call(self, e);
		});
	}

	/**
	 * Build a custom publication
	 * @param {string} prt Publication name
	 * @param {object} opts Options
	 * @param {function} opts.error <strong>Optional</strong> error handler function
	 * @function
	 */
	this.print = function(pt, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = function(e) { d.reject(e); };
		_print.call(this, function(res) { d.resolve(res); }, pt, opts);
		return d.promise;
	};

	/**
	 * Set an object parameter
	 * @param {function} callback Callback (called upon success)
	 * @param {string} param Parameter name
	 * @param {string} value Parameter value
	 * @param {object} opts Options
	 * @private
	 */
	function _setParameter(callback, param, value, opts) {
		var self = this;
		opts = opts || {};
		var p = { name: param };
		if (value) p.value = value;
		req.call(self.session, self.path + '&action=setparameter', reqParams(p), function(res, status) {
			var r = parse(res, status);
			this.debug('[simplicite.BusinessObject.setParameter(' + p.name + ')] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : error).call(self, r.response);
			} else {
				var result = r.response.result;
				if (callback)
					callback.call(self, result);
			}
		}, function(e) {
			(opts.error ? opts.error : error).call(self, e);
		});
	}

	/**
	 * Set an object parameter
	 * @param {string} param Parameter name
	 * @param {string} value Parameter value
	 * @param {object} opts Options
	 * @param {function} opts.error <strong>Optional</strong> error handler function
	 * @function
	 */
	this.setParameter = function(param, value, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = function(e) { d.reject(e); };
		_setParameter.call(this, function() { d.resolve(); }, param, value, opts);
		return d.promise;
	};

	/**
	 * Get an object parameter
	 * @param {function} callback Callback (called upon success)
	 * @param {string} param Parameter name
	 * @param {object} opts Options
	 * @private
	 */
	function _getParameter(callback, param, opts) {
		var self = this;
		opts = opts || {};
		var p = { name: param };
		req.call(self.session, self.path + '&action=getparameter', reqParams(p), function(res, status) {
			var r = parse(res, status);
			this.debug('[simplicite.BusinessObject.getParameter(' + p.name + ')] HTTP status = ' + status + ', response type = ' + r.type);
			if (r.type === 'error') {
				(opts.error ? opts.error : error).call(self, r.response);
			} else {
				var result = r.response.result;
				if (callback)
					callback.call(self, result);
			}
		}, function(e) {
			(opts.error ? opts.error : error).call(self, e);
		});
	}

	/**
	 * Get an object parameter
	 * @param {string} param Parameter name
	 * @param {object} opts Options
	 * @param {function} opts.error <strong>Optional</strong> error handler function
	 * @function
	 */
	this.getParameter = function(param, opts) {
		var d = Q.defer();
		opts = opts || {};
		opts.error = function(e) { d.reject(e); };
		_getParameter.call(this, function(value) { d.resolve(value); }, param, opts);
		return d.promise;
	};
}

/**
 * Get business object
 * @param {string} name Business object name
 * @param {string} instance Optional business object instance name
 * @returns {BusinessObject} Business object
 * @function
 */
function getBusinessObject(name, instance) {
	var cacheKey = getBusinessObjectCacheKey(name, instance);

	var obj = businessObjectCache[cacheKey];
	if (!obj) {
		obj = new BusinessObject(this, name, instance);
		businessObjectCache[cacheKey] = obj;
	}

	return obj;
}

/**
 * Get a business process
 * @param {string} name Business process name
 * @function
 */
function getBusinessProcess(name) {
	return {
		metadata: { name: name }
	};
}

/**
 * Get an external object
 * @param {string} External object name
 * @function
 */
function getExternalObject(name) {
	return {
		metadata: { name: name }
	};
}

module.exports = {
	constants: constants,
	log: log,
	info: info,
	warn: warn,
	error: error,
	debug: debug,
	parameters: parameters,
	username: username,
	password: password,
	authtoken: authtoken,
	timeout: timeout,
	session: session,
	setUsername: setUsername,
	setLogin: setUsername, // Naming flexibility
	setPassword: setPassword,
	setAuthToken: setAuthToken,
	setToken: setAuthToken, // Naming flexibility
	clear: clear,
	getError: getError,
	getHealth: getHealth,
	login: login,
	logout: logout,
	getGrant: getGrant,
	grant: grant,
	changePassword: changePassword,
	getAppInfo: getAppInfo,
	getSysInfo: getSysInfo,
	getUserInfo: getUserInfo,
	getNews: getNews,
	getBusinessObject: getBusinessObject,
	getBusinessProcess: getBusinessProcess,
	getExternalObject: getExternalObject,
	BusinessObject: BusinessObject,
	BusinessObjectMetadata: BusinessObjectMetadata
};
