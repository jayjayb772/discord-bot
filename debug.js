
const consoleDebug = function(str){
    if(process.env.debug === "on"){
        console.log(str);
    }
};

module.exports = {consoleDebug};