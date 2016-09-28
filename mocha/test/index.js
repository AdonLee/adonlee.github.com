/* global describe before after beforeach aftereach it chai*/
var assert = typeof require == 'function' ? require('assert') : chai.assert

// bdd describe|context it before after beforEach afterEach
// tdd suite            test setup teardown suiteSetup suiteTeardown
// qunit flat bdd
// exports {
//      before: func,
//      after: func,
//      beforEach: func,
//      afterEach: func,
//      'context desc': {
//          'it desc': func
//      }
// }


// alias context('identifier', function() {})
describe('Array', function() {
    // Retry all tests in this suite up to 4 times
    this.retries(4);
    // Suite-level timeouts may be applied to entire test “suites”,
    this.timeout(500)
    // or disabled via this.timeout(0).
    this.timeout(0)

    before('start to test array', function() {
        console.log('skdfjksjfksjfks');
    })
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal(-1, [1,2,3].indexOf(4))
            // [1,2,3].indexOf(0).should.equal(-1);
        })
    })
})


describe('async test', function() {
    before(function() {
        // hook level timeout
        this.timeout(100)
    })
    // suite level timeout
    this.timeout(200)
    // 异步测试
    it('should async fail by timeout', function(done) {
        // test level timeout
        this.timeout(300)
        setTimeout(function(){
            done('some err msg')
        }, 500)
    })
    // 异步测试
    it('should async fail', function(done) {
        setTimeout(function(){
            done('some err msg')
        })
    })

    it('should async work', function(done) {
        setTimeout(function(){
            done()
        })
    })


    it('should return -1 when the value is not present');
})

// describe('exclusive tests', function() {

//     it.only('the only test execute', function() {
//         // > Best practice: Don’t do nothing! A test should make an assertion or use this.skip().
//         this.skip()
//     })

//     it.skip('this test will be skipped', function() {
//         this.skip()

//     })

//     it('this test do not execute', function() {
//         this.skip()

//     })
// })
