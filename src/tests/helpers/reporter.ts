jasmine.getEnv().clearReporters();

jasmine.getEnv().addReporter({
    specDone: function(result:any) {
        console.log('Spec: ' + result.description + ' : ' + result.status);
        for(let i = 0; i < result.failedExpectations.length; i++) {
            console.log('Failure: ' + result.failedExpectations[i].message);
            console.log(result.failedExpectations[i].stack);
        }
        console.log('Passed ' + result.passedExpectations.length);
    },
    suiteDone: function(result:any) {
        console.log('Suite: ' + result.description + ' was ' + result.status);
        for(let i = 0; i < result.failedExpectations.length; i++) {
            console.log('Suite ' + result.failedExpectations[i].message);
            console.log(result.failedExpectations[i].stack);
        }
    },
    jasmineDone: function(result:any) {
        console.log('Finished suite: ' + result.overallStatus);
        for(let i = 0; i < result.failedExpectations.length; i++) {
            console.log('Global ' + result.failedExpectations[i].message);
            console.log(result.failedExpectations[i].stack);
        }
    }
});
