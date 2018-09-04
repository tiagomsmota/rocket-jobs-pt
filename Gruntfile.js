module.exports = function(grunt) {
    //project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        //tasks
        sass: {
            dist: {
                src: "assets/stylesheets/sass/main.scss",
                dest: "assets/stylesheets/css/style.css"
            }
        },
        watch: {
            sass: {
                files: ["assets/stylesheets/sass/**/*.scss"],
                tasks: ["sass"]
            }
        }
    });

    //load plugins
    grunt.loadNpmTasks("grunt-node-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");
    //default task
    grunt.registerTask("default", ["watch"]);
};