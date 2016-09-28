/* global describe before after beforeEach afterEach it chai expect spyOn jasmine*/

// expect({}).toEqual(jasmine.any(Object))
// expect(foo).toHaveBeenCalledWith(12, jasmine.anything()) // not null or undefined
// expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({bar: "baz"}))
// expect(callback).toHaveBeenCalledWith(jasmine.arrayContaining([4, 2, 3]))

describe("A spy", function() {
  var foo, bar = null;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      },
      getBar:  function(value) {
        return bar;
      }
    };

    spyOn(foo, 'setBar');
    // spyOn(foo, 'getBar')
    //   .and.callThrough()
    //   .and.returnValues("fetched first", "fetched second")
    //   .and.callFake(function(arguments, can, be, received) {return 1001;})
    //   .and.throwError("quux")

    foo.setBar(123);
    foo.setBar(456, 'baz');
  });


  it("tracks that the spy was called", function() {
    expect(foo.setBar).toHaveBeenCalled();
    // expect(foo.setBar.calls.any()).toEqual(false)
  });

  it("tracks that the spy was called x times", function() {
    expect(foo.setBar).toHaveBeenCalledTimes(2);
    // expect(foo.setBar.calls.count()).toEqual(2);
  });
  it("tracks all the arguments of its calls", function() {
    expect(foo.setBar).toHaveBeenCalledWith(123);
    expect(foo.setBar).toHaveBeenCalledWith(456, 'baz');
    // expect(foo.setBar.calls.argsFor(0)).toEqual([123]);
    // expect(foo.setBar.calls.argsFor(1)).toEqual([456, "baz"]);
    // expect(foo.setBar.calls.allArgs()).toEqual([[123],[456, "baz"]]);
    // expect(foo.setBar.calls.all()).toEqual([{object: foo, args: [123], returnValue: undefined}]);
    // expect(foo.setBar.calls.mostRecent()).toEqual({object: foo, args: [456, "baz"], returnValue: undefined});
    // expect(foo.setBar.calls.first()).toEqual({object: foo, args: [123], returnValue: undefined});
  });

  it("can be reset", function() {
    expect(foo.setBar.calls.any()).toBe(true);

    foo.setBar.calls.reset();

    expect(foo.setBar.calls.any()).toBe(false);
  });

  it("stops all execution on a function", function() {
    expect(bar).toBeNull();
  });
});

describe("A spy, when created manually", function() {
  var whatAmI;

  beforeEach(function() {
    whatAmI = jasmine.createSpy('whatAmI');

    whatAmI("I", "am", "a", "spy");
  });

  it("is named, which helps in error reporting", function() {
    expect(whatAmI.and.identity()).toEqual('whatAmI');
  });

  it("tracks all the arguments of its calls", function() {
    expect(whatAmI).toHaveBeenCalledWith("I", "am", "a", "spy");
  });
});

describe("Multiple spies, when created manually", function() {
  var tape;

  beforeEach(function() {
    tape = jasmine.createSpyObj('tape', ['play', 'pause', 'stop', 'rewind']);

    tape.play();
    tape.pause();
    tape.rewind(0);
  });

  it("creates spies for each requested function", function() {
    expect(tape.play).toBeDefined();
    expect(tape.pause).toBeDefined();
    expect(tape.stop).toBeDefined();
    expect(tape.rewind).toBeDefined();
  });
});

describe("Manually ticking the Jasmine Clock", function() {
  var timerCallback;

  beforeEach(function() {
    timerCallback = jasmine.createSpy("timerCallback");
    jasmine.clock().install();
  })

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it("causes a timeout to be called synchronously", function() {
    setTimeout(function() {
      timerCallback();
    }, 100);

    expect(timerCallback).not.toHaveBeenCalled();

    jasmine.clock().tick(101);

    expect(timerCallback).toHaveBeenCalled();
  });

  describe("Mocking the Date object", function(){
    it("mocks the Date object and sets it to a given time", function() {
      var baseTime = new Date(2013, 9, 23);
      jasmine.clock().mockDate(baseTime);

      jasmine.clock().tick(50);
      expect(new Date().getTime()).toEqual(baseTime.getTime() + 50);
    });
  });
});

describe("long asynchronous specs", function() {
  // just like mocha
  beforeEach(function(done) {
    done();
  }, 1000);

  it("takes a long time", function(done) {
    setTimeout(function() {
      done();
    }, 9000);
  }, 10000);

  it("takes a long time", function(done) {
    setTimeout(function() {
      done();
    }, 9000);
  }, 10000);

  afterEach(function(done) {
    done();
  }, 1000);
});

describe("A spec using done.fail", function() {
  var foo = function(x, callBack1, callBack2) {
    if (x) {
      setTimeout(callBack1, 0);
    } else {
      setTimeout(callBack2, 0);
    }
  };

  it("should not call the second callBack", function(done) {
    foo(true,
      done,
      function() {
        done.fail("Second callback has been called");
      }
    );
  });
});
