const appRoot = require('app-root-path');

class ResizerConfig{
    get inputPath(){
        return appRoot + "/assets";
    }
    get outputPath(){
        return appRoot + "/assets/out"
    }
}

export default new ResizerConfig();
