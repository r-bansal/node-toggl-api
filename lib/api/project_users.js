'use strict'

var TogglClient = require('../client')
  , utils = require('../utils')




/**
 * Add user to project
 *
 * @see https://github.com/toggl/toggl_api_docs/blob/master/chapters/project_users.md
 * @public
 * @param {number|string} projectId Project ID
 * @param {number|string} userId User ID
 * @param {object} [options] Project user options
 * @param {string[]} [fields] List of User fields to populate
 * @param {function} callback Accepts arguments: (err, projectUser)
 */
TogglClient.prototype.addProjectUser = function(projectId, userId, options, fields, callback) {
  if (arguments.length === 3) {
    callback = options
    options = {}
    fields = null
  }
  else if (arguments.length === 4) {
    if (!Array.isArray(options)) {
      callback = fields
      fields = null
    }
    else {
      callback = fields
      fields = options
      options = {}
    }
  }

  options.pid = projectId
  options.uid = userId

  if (fields) {
    options.fields = fields.join()
  }

  if (!this.validateOptions('project-user-add', options, callback)) {
    return
  }

  var req = {
    method: 'POST',
    body:   {
      project_user: options
    }
  }

  this.apiRequest('/api/v8/project_users', req, utils.wrapDataCallback(callback))
}




/**
 * Add several users to project
 *
 * @see https://github.com/toggl/toggl_api_docs/blob/master/chapters/project_users.md
 * @public
 * @param {number|string} projectId Project ID
 * @param {number[]|string[]} userIds User IDs
 * @param {object} [options] Project user options
 * @param {string[]} [fields] List of User fields to populate
 * @param {function} callback Accepts arguments: (err, projectUsers)
 */
TogglClient.prototype.addProjectUsers = function(projectId, userIds, options, fields, callback) {
  this.addProjectUser(projectId, userIds.join(), options, fields, callback)
}




/**
 * Delete project user
 *
 * @see https://github.com/toggl/toggl_api_docs/blob/master/chapters/project_users.md
 * @public
 * @param {number|string} puID Project user ID
 * @param {function} callback Accepts arguments: (err)
 */
TogglClient.prototype.deleteProjectUser = function(puID, callback) {
  var req = {
    method: 'DELETE'
  }

  this.apiRequest('/api/v8/project_users/' + puID, req, callback)
}




/**
 * Delete project users
 *
 * @see https://github.com/toggl/toggl_api_docs/blob/master/chapters/project_users.md
 * @public
 * @param {number[]|string[]} puIDs Project user IDs
 * @param {function} callback Accepts arguments: (err)
 */
TogglClient.prototype.deleteProjectUsers = function(puIDs, callback) {
  this.deleteProjectUser(puIDs.join(), callback)
}




/**
 * Update project user data
 *
 * @see https://github.com/toggl/toggl_api_docs/blob/master/chapters/project_users.md
 * @public
 * @param {number|string} puID Project user ID
 * @param {object} options Project user options
 * @param {string[]} [fields] List of User fields to populate
 * @param {function} callback Accepts arguments: (err, projectUser)
 */
TogglClient.prototype.updateProjectUser = function(puID, options, fields, callback) {
  if (arguments.length === 3) {
    callback = fields
    fields = null
  }

  if (fields) {
    options.fields = fields.join()
  }

  var req = {
    method: 'PUT',
    body:   {
      project_user: options
    }
  }

  this.apiRequest('/api/v8/project_users/' + puID, req, utils.wrapDataCallback(callback))
}




/**
 * Update data for several project users
 *
 * @see https://github.com/toggl/toggl_api_docs/blob/master/chapters/project_users.md
 * @public
 * @param {number[]|string[]} puIDs Project user IDs
 * @param {object} options Project user options
 * @param {string[]} [fields] List of User fields to populate
 * @param {function} callback Accepts arguments: (err, projectUsers)
 */
TogglClient.prototype.updateProjectUsers = function(puIDs, options, fields, callback) {
  this.updateProjectUser(puIDs.join(), options, fields, callback)
}