# grunt-inline-css

> Takes an html file with css link and turns inline. Great for emails. It leverages the amazing [juice](https://github.com/LearnBoost/juice) library.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-inline-css --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-inline-css');
```

## The "inlinecss" task

### Overview
In your project's Gruntfile, add a section named `inlinecss` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
	inlinecss: {
		main: {
			options: {
			},
			files: {
				'out.html': 'in.html'
			}
		}
	}
})
```


You can see available options [here](https://github.com/LearnBoost/juice#juicefilepath-options-callback)


### Update
I've just updated this plugin to be able to receive a "globbing pattern" and an output directory instead of having to list the files out, directly.  I also added an option to say what the new file should be named.  The default will be to have the original name of the file suffixed by 'inline' such that a file named **promotion.html** might end up as **promotion-inline.html**.

```js
grunt.initConfig({
    inlinecss: {
        main: {
            options: {
                //outputDir: 'inline' // 'inline' is the default
            },
            //files: {
            //    'src-emails/1a-enhancement-inline.html': 'src-emails/1a-enhancement.html'
            //}
            src: ['src-emails/*.html'],
            dest: 'src-emails/'
        }
    }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
