/**
 * Expose `Support`
 */

module.exports = function(adapter) {
  var Support = {};

  /**
   * Configure helper
   * - using default redis config
   *
   * @param {String} name
   * @param {Object} definition
   */

  Support.Configure = function(name, definition) {
    return {
      identity: name,
      definition: definition
    };
  };

  /**
   * Setup function
   *
   * @param {String} collection
   * @param {Object} def
   * @param {Function} callback
   */

  Support.Setup = function(conn, name, def, callback) {
    var connection = {
      identity: conn,
      port: 6379,
      host: 'localhost',
      password: null
      //sentinels: [{ host: 'localhost', port: 26379 }],
      //name: 'master'
    };

    var collection = this.Configure(name, def);
    collection.definition.connection = conn;

    var collections = {};
    collections[name] = collection;

    adapter.registerConnection(connection, collections, callback);
  };

  /**
   * Teardown function
   *
   * @param {String} collection
   * @param {Function} callback
   */

  Support.Teardown = function(conn, collection, callback) {
    adapter.drop(conn, collection, [], function(err) {
      adapter.teardown(conn, callback);
    });
  };

  return Support;
};
