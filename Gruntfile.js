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
        },

        watch: {
		    scripts: {
		        files: ['src/*.js'],
		        tasks: ['uglify'],
		        options: {
		            spawn: false,
		        },
		    }
		}

    });

    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.registerTask( 'default', ['uglify'] );

};