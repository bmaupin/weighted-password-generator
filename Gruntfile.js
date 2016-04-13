module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['*.js', 'src/*.js'],
      options: {
        quotmark: 'single'
      }
    },
    // Minify
    uglify: {
      dist:{
        files: {
          'dist/weighted-passgen-<%= pkg.version %>.min.js': ['src/weighted-passgen.js'],
        },
      },
    },
  });

  grunt.registerTask('default', ['jshint', 'uglify']);
};
