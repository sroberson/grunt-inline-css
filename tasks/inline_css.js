/*
 * grunt-inline-css
 * https://github.com/jgallen23/grunt-inline-css
 *
 * Copyright (c) 2013 Greg Allen
 * Licensed under the MIT license.
 */

'use strict';

var juice = require('juice')
    , path = require('path')
    , async = require('async')
    , count
    , done;


module.exports = function (grunt) {

    var options = {
        underscoresAsPartials: true
    };

    var compileInlineFile = function (filepath, destination, nextFile, options) {

        /*
            This plugin has been changed to handle a directory globbing pattern,
            instead of having to list out the files directly.

            The directory listing is working, but the single file does not currently work.
        */
        var juicedFile,
            outputFilename = path.resolve(destination, path.basename(filepath));

        grunt.log.debug("outputfile is " + outputFilename);

        juicedFile = juice(grunt.file.read(filepath), options);

        //grunt.log.debug("Derived html: " + juicedFile);
        grunt.log.ok("Writing to : " + path.basename(filepath));

        if (juicedFile) {
            grunt.file.write(outputFilename, juicedFile );
            count++;
        } else {
            return grunt.log.error("File " + outputFilename + " error");
            return false;
        }
        nextFile();
    };

    grunt.registerMultiTask('inlinecss', 'Takes an html file with css link and turns inline.  Great for emails.', function () {

        var opts = grunt.util._.defaults(this.options(), options);
        count = 0;

        var done = this.async();

        async.each(this.files, function(fileGlob, nextGlob) {

            var destination = fileGlob.dest;
            grunt.log.debug("FileGlob: " + fileGlob.src);

            async.each(fileGlob.src, function(filepath, nextFile) {

                if (grunt.file.exists(filepath) || grunt.file.exists(filepath)) {
                    compileInlineFile(filepath, destination, nextFile, opts);
                } else {
                    nextGlob();
                }

            }, function() {
                // When we are done with all files in this glob
                // continue to the next glob
                nextGlob();
            });
        }, function() {
            // When we are done with all globs
            // call done to tell the Grunt task we are done
            done();
        });

        grunt.log.ok("Compiled " + count + " files.");

    });

};
