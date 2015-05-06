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
    , reGlob = /.*\*.*/
    , count;


module.exports = function (grunt) {

    var options = {
        outputSuffix: 'inline'
    };

    var not = function (predicate) { return function () { return !predicate.apply(null, arguments); }; };
    var and = function (predicates) {
        return function () {
            var bool = true, index = 0, len = predicates.length, predicate;
            while (bool && index < len) {
                predicate = predicates[index++];
                bool = bool && predicate.apply(null, arguments);
            }
            return bool;
        };
    };

    var isUnexpandedGlob = function (file) {

        var filename = file.orig.src[0],
            expand = file.orig.expand;

        return reGlob.test(filename) && !expand;
    };

    var fileExists = function (f) { return grunt.file.exists(f); };

    var createFilename = function (destination, filepath) {
        return path.resolve(destination, path.basename(filepath, '.html') + '-' + options.outputSuffix + '.html');
    };

    var compileInlineFile = function (infile, outfile) {

        var juicedFile;

        grunt.log.debug("infile is " + infile);
        grunt.log.debug("outfile will be " + outfile);

        juicedFile = juice(grunt.file.read(infile), options);

        //grunt.log.debug("Derived html: " + juicedFile);

        grunt.log.ok("Writing to : " + path.basename(infile));
        grunt.log.debug("Writing to : " + outfile);

        if (juicedFile) {
            grunt.file.write(outfile, juicedFile );
            count++;
        } else {
            grunt.log.error("File " + outfile + " error");
            return false;
        }
    };

    grunt.registerMultiTask('inlinecss', 'Takes an html file with css link and turns inline.  Great for emails.', function () {

        var files = this.files
            , opts = grunt.util._.defaults(this.options(), options);
        count = 0;

        files.forEach(function (file) {

            // if file is a globbing pattern, then src might be a list of several files
            // otherwise file.src will contain a list of one file
            var currentSetOfInputFiles = file.src,
                destination = file.dest,
                predicates = [],
                outputFilename;

            predicates.push(fileExists);

            currentSetOfInputFiles
                .filter(and(predicates))
                .forEach(function (filepath) {
                    outputFilename = isUnexpandedGlob(file) ?
                        createFilename(destination, filepath)
                        : destination;

                    compileInlineFile(filepath, outputFilename);
                });
        });

        grunt.log.ok("Compiled " + count + " files.");

    });

};
