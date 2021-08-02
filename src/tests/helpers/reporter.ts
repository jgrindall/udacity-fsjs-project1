import SpecResult = jasmine.SpecResult;

jasmine.getEnv().clearReporters();

jasmine.getEnv().addReporter({
    specDone: function(result:SpecResult) {
        console.log('Spec: ' + result.description + ' : ' + result.status);
        for(let i = 0; i < result.failedExpectations.length; i++) {
            console.log('Failure: ' + result.failedExpectations[i].message);
            console.log(result.failedExpectations[i].stack);
        }
        console.log('Passed ' + result.passedExpectations.length);
    },
    suiteDone: function(result:SpecResult) {
        console.log('Suite: ' + result.description + ' was ' + result.status);
        for(let i = 0; i < result.failedExpectations.length; i++) {
            console.log('Suite ' + result.failedExpectations[i].message);
            console.log(result.failedExpectations[i].stack);
        }
    }
});
