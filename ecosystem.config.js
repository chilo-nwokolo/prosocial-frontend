module.exports = {
    apps : [{
        name   : "Prosocial Frontend App",
        script : "yarn",
        exec_mode: 'cluster',
        instances: 1,
        args: 'start'
    }]
}