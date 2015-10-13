'use strict';
 
module.exports = function (grunt) {

    grunt.initConfig();
     
    // WATCH
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.config('watch', {
        less: {
       	 	options: {
      			event: ['changed'],
    		},
			files: "_less/*.less",
			tasks: ["on-less-change","macreload"]
		},
		jekyll: {
			options: {
      			event: ['changed'],
    		},
			files: ["_includes/*.html","./*.{xml,html}","./_posts/*.md"],
			tasks: ["on-jekyll-content-change","macreload"]
		},
		reload: {
			options: {
      			event: ['changed'],
    		},
			files: ["./.gruntreload"],
			tasks: ["on-jekyll-content-change","macreload"]
		}
    });
    
    // CLEAN
    
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.config('clean', {
        "hash-json-data" : {src:['_data/hash.json']},
        "vendor":  {src:['./**/vendor/*.*','!_dist/**/*.*']},
        "hash-files":  {src:['./js/*.*.js','!./js/*.min.js','!_dist/**/*.*', './css/*.*.css','!./css/*.min.css']},
        "non-hash-dist-assets": {src:['_dist/**/*.{css,js}','!_dist/**/*.*.{css,js}','_dist/**/*.min.{css,js}']},
        "image-cache": {src:['_dist/img-resized/**']}
    });
    
    // COPY
    
    grunt.loadNpmTasks('grunt-contrib-copy');   
    grunt.config('copy', {		
	});
	
	// MAKEDIR
	grunt.loadNpmTasks('grunt-mkdir');  
	grunt.config('mkdir', {	
	});
	
	// RENAME
	
	grunt.loadNpmTasks('grunt-contrib-rename');   
    grunt.config('rename', {	
	});
    
    // BOWER COPY
    
    grunt.loadNpmTasks('grunt-bowercopy');
    
    grunt.config('bowercopy',    
   		{
			options: {
				srcPrefix: '_bower_components'
			},
			javascript: {
				options: {
					destPrefix:'./js/vendor'
				},
				files: {
					'/':[	'jquery/dist/*.js',
							'bootstrap/dist/js/*.js',
							'modernizr/modernizr.js',
							'swfobject/swfobject/src/swfobject.js',
							'picturefill/dist/picturefill.min.js'] // Update this to 2.0.0 
				}
			},
			fonts: {
				options: {
					destPrefix: './fonts/vendor'
				},
				files: {
					'/':'bootstrap/dist/fonts/*.*',
				}
			},
			swfs: {
				options: {
					destPrefix: './fl/vendor'
				},
				files: {
					'/':'swfobject/swfobject/expressInstall.swf',
				}
			}
		}
    );
    
    // JS MIN
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.config('uglify', {    
			js: {
			  files: {
				'./js/vendor/modernizr.min.js'	: './js/vendor/modernizr.js',
				'./js/vendor/swfobject.min.js'	: './js/vendor/swfobject.js'
			  }
			}
	});
    
    // LESS CSS
    
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.config('less', {    
		development: {
			options: {
				// Specifies directories to scan for @import directives when parsing. 
				// Default value is the directory of the source, which is probably what you want.
				paths: ["./_less/","_bower_components/bootstrap/less/"],
			},
			files: {
				// compilation.css  :  source.less
				"./css/theme.css": "./_less/theme.less"
			}
		},
		minify: {
			options: {
			  cleancss: true,
			  report: 'min'
			},
			files: {
			  './css/theme.min.css': './css/theme.css'
			}
		}
	});
    
    // CACHE HASH
    
    grunt.loadNpmTasks('grunt-hash');
    grunt.config('hash-actual', {
       options: {
			mapping: './_data/hash.json', // mapping file so your server can serve the right files
			srcBasePath: '', // the base Path you want to remove from the `key` string in the mapping file
			destBasePath: '', // the base Path you want to remove from the `value` string in the mapping file
			flatten: false, // Set to true if you don't want to keep folder structure in the `key` value in the mapping file
			hashLength: 8, // hash length, the max value depends on your hash function
			hashFunction: function(source, encoding){ // default is md5
				return require('crypto').createHash('sha1').update(source, encoding).digest('hex');
			}
		},
		js: {
			src: './js/vendor/*.min.js',  //all your js that needs a hash appended to it
			dest: './js/vendor/' //where the new files will be created
		},
		css: {
			src: './css/*.min.css',  
			dest: './css/'
		}
    });
    
	// JECKYLL
	
	grunt.loadNpmTasks('grunt-jekyll');
	grunt.config('jekyll-actual', {
		options: {                          
			src: './'
		},
		dist: {
			options: {
			dest: './_dist/',
			config: './_config.yml'
			}
		}
	});
	
	// CONVERT
	
	grunt.loadNpmTasks('grunt-convert');
	grunt.config('convert', {
		options: {
		  explicitArray: false,
		},
		"hash-json-to-yml": {		  
		  src: ['./_data/hash.json'],
		  dest: './_data/hash.yml'			
		}
	});
    
    // GITHUB PAGES
    
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.config('gh-pages', {
        options: {
     		base: '_dist',
     		message: 'Deploy to |gh-pages| branch.'
    	},
    	src: ['**']
    });
    
    // LOCAL SERVER
    
    // Mimic .htaccess redirects to suppress .html extensions when running local server
    var rewriteModule = require('http-rewrite-middleware');
    
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.config('connect', {
        options: {
			  port: 1235,
			  base: './_dist/',
			  keepalive:false,
			  open:true		
		}, 
		// Simulate mod_rewrite behaviour on local server
		development: {
			options: {
				middleware: function (connect, options) {
					var middlewares = [];

					// RewriteRules support
					middlewares.push(rewriteModule.getMiddleware([
						// ... list of rules here : 
						//{from: '^/([^.]+)\/$', to: '/$1/index.html'},
						//{from: '^/(?blog)([^\.]+)(!?\.html)$', to: '/$1', redirect: 'permanent'}
						//{from: '^/(?!page)([^\.]+)\/$', to: '/$1', redirect: 'permanent'}, 	// Trailing slash gets removed unless is page
						//{from: '^/(?!page)([^\.]+)\.html$', to: '/$1', redirect: 'permanent'}, 		// .html gets removed
						//{from: '^/(?!page)index$', to: '/', redirect: 'permanent'},					// Remove index
						//{from: '^/(?!page)([^\.]+)\/$', to: '/$1/index.html'}			 			// directs to corresponding .html file
					], 
					{verbose: true}));

					if (!Array.isArray(options.base)) {
						options.base = [options.base];
					}

					var directory = options.directory || options.base[options.base.length - 1];
					options.base.forEach(function (base) {
						// Serve static files.
						middlewares.push(connect.static(base));
					});

					// Make directory browse-able.
					middlewares.push(connect.directory(directory));

					return middlewares;
				}
			}
		}
    });
   
    // MAC RELOAD
    // For local testing
    grunt.loadNpmTasks('grunt-macreload');
    grunt.config('macreload', {
        chrome: {
    		browser: 'chrome'
  		}
    });
    
    // TASKS
	
	// Bundle cleanup tasks with jekyll
    
    grunt.renameTask('jekyll', 'jekyll-actual');
	grunt.registerTask('jekyll', ['jekyll-actual','clean:non-hash-dist-assets']);
	
	// Bundle cleanup tasks with hash
	
	grunt.renameTask('hash', 'hash-actual');
	grunt.registerTask(
		'hash', 
		['clean:hash-files','hash-actual','convert:hash-json-to-yml','clean:hash-json-data']
	);
	
	// Watch callbacks

	grunt.registerTask(
		'on-less-change', 
		['less','hash','jekyll']
	)
	grunt.registerTask(
		'on-jekyll-content-change', 
		['jekyll']
	)
	
	// Rebuild entire site
	
	grunt.registerTask(
		'build', 
		['clean:vendor','bowercopy','uglify', 'less', 'hash', 'jekyll']
	);
	
	// Work locally
	
	grunt.registerTask(
		'dev', 
		[ 'build','connect','watch']
	);
	
	grunt.registerTask(
		'default', 
		[ 'dev']
	);
	
	// Pass command line arg |msg| to gh-pages task
	if (grunt.option('msg')){
		grunt.config.set('gh-pages.options.message', grunt.option('msg'));
	}
	
	// Dist
	// Usage: grunt dist --msg='Changed xyz'
	grunt.registerTask(
		'dist', 
		['build', 'gh-pages']
	);
	
	// Dist - purges resized images and regenerates them
	grunt.registerTask(
		'dist:purge', 
		['clean:image-cache', 'dist', 'gh-pages']
	);
	
};