module.exports = {
    apps : [{
        name   : "Prosocial Frontend App",
        script : "npm",
        exec_mode: 'cluster',
        instances: 1,
        args: 'start'
    }]
}