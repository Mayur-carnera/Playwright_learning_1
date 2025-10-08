if (true) {
    let testStatus = "PASSED";

    function runTest() {
        console.log("Before:", testStatus);
        let testStatus = "FAILED";
        console.log("After:", testStatus);
    }

    runTest();
}