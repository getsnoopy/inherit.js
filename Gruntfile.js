module.exports = function( grunt ) {

    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),

        uglify: {
            options: {
                preserveComments: 'some'
            },
            build: {
                src: 'src/inherit.js',
                dest: 'dist/inherit.min.js'
            },
        }

    });

    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.registerTask( 'default', ['uglify'] );

};