/**
 * contains configuration for the input and output paths
 **/

import appRoot from "app-root-path";

class ResizerConfig{
    get inputPath(){
        return appRoot + "/assets/";
    }
    get outputPath(){
        return appRoot + "/assets/out/"
    }
}

export default new ResizerConfig();
