// Import necessary modules and functions from cache.js
goog.require('spf.cache');

describe('Cache', function() {
  beforeEach(function() {
    // Reset the cache before each test
    spf.cache.clear();
  });

  it('should retrieve data from the cache if it exists and is valid', function() {
    // Add data to the cache
    spf.cache.set('key', 'data', 1000);

    // Retrieve the data from the cache
    var result = spf.cache.get('key');

    // Expect the retrieved data to be the same as the original data
    expect(result).toEqual('data');
  });

  it('should not retrieve data from the cache if it does not exist', function() {
    // Retrieve data from the cache
    var result = spf.cache.get('nonexistent_key');

    // Expect the result to be undefined
    expect(result).toBeUndefined();
  });

  it('should not retrieve data from the cache if it exceeds the data lifetime', function() {
    // Add data to the cache with a short lifetime
    spf.cache.set('key', 'data', 1);

    // Wait for the data to expire
    setTimeout(function() {
      // Retrieve the expired data from the cache
      var result = spf.cache.get('key');

      // Expect the result to be undefined
      expect(result).toBeUndefined();
    }, 10);
  });

  it('should set data in the cache with the specified lifetime', function() {
    // Set data in the cache with a lifetime of 1000 milliseconds
    spf.cache.set('key', 'data', 1000);

    // Retrieve the data from the cache
    var result = spf.cache.get('key');

    // Expect the retrieved data to be the same as the original data
    expect(result).toEqual('data');
  });

  it('should not set data in the cache if the lifetime is less than 1', function() {
    // Set data in the cache with a negative lifetime
    spf.cache.set('key', 'data', -1);

    // Retrieve the data from the cache
    var result = spf.cache.get('key');

    // Expect the result to be undefined
    expect(result).toBeUndefined();
  });

  it('should remove data from the cache', function() {
    // Add data to the cache
    spf.cache.set('key', 'data', 1000);

    // Remove the data from the cache
    spf.cache.remove('key');

    // Retrieve the removed data from the cache
    var result = spf.cache.get('key');

    // Expect the result to be undefined
    expect(result).toBeUndefined();
  });

  it('should clear the entire cache', function() {
    // Add data to the cache
    spf.cache.set('key1', 'data1', 1000);
    spf.cache.set('key2', 'data2', 1000);

    // Clear the cache
    spf.cache.clear();

    // Retrieve the data from the cache
    var result1 = spf.cache.get('key1');
    var result2 = spf.cache.get('key2');

    // Expect the results to be undefined
    expect(result1).toBeUndefined();
    expect(result2).toBeUndefined();
  });

  it('should trigger garbage collection when setting data in the cache', function(done) {
    // Spy on the collect function
    spyOn(spf.cache, 'collect');

    // Set data in the cache
    spf.cache.set('key', 'data', 1000);

    // Expect the collect function to be called after a delay
    setTimeout(function() {
      expect(spf.cache.collect).toHaveBeenCalled();
      done();
    }, 1000);
  });

  it('should remove expired data during garbage collection', function() {
    // Add expired data to the cache
    spf.cache.set('key1', 'data1', 1);
    spf.cache.set('key2', 'data2', 1);

    // Trigger garbage collection
    spf.cache.collect();

    // Retrieve the expired data from the cache
    var result1 = spf.cache.get('key1');
    var result2 = spf.cache.get('key2');

    // Expect the results to be undefined
    expect(result1).toBeUndefined();
    expect(result2).toBeUndefined();
  });

  it('should trim the cache when it exceeds the maximum size', function() {
    // Set the maximum cache size to 2
    spf.config.set('cache-max', 2);

    // Add data to the cache
    spf.cache.set('key1', 'data1', 1000);
    spf.cache.set('key2', 'data2', 1000);
    spf.cache.set('key3', 'data3', 1000);

    // Retrieve the trimmed data from the cache
    var result1 = spf.cache.get('key1');
    var result2 = spf.cache.get('key2');
    var result3 = spf.cache.get('key3');

    // Expect the first two results to be undefined and the third result to be 'data3'
    expect(result1).toBeUndefined();
    expect(result2).toBeUndefined();
    expect(result3).toEqual('data3');
  });
});
