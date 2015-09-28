var path = require('path');

var dirs = {};
dirs.fonts = 'fonts';
dirs.images = 'images';
dirs.scripts = 'scripts';
dirs.styles = 'styles';
dirs.views = 'views';

var paths = {};
paths.base = '.';
paths.src = paths.base + '/assets';
paths.build = paths.src + '/build';

paths.fonts = path.join(paths.src, dirs.fonts);
paths.images = path.join(paths.src, dirs.images);
paths.scripts = path.join(paths.src, dirs.scripts);
paths.styles = path.join(paths.src, dirs.styles);
paths.views = path.join('application', dirs.views);
paths.vendor = 'node_modules';

module.exports = {
  paths: paths,

  clean: [
    paths.build + '/*'
  ],

  browserify: {
    bundles: [{
      entries: './' + paths.scripts + '/index.js',
      dest: path.join(paths.build, dirs.scripts),
      outputName: 'app.js'
    }]
  },

  sass: {
    src: paths.styles,
    dest: path.join(paths.build, dirs.styles),
    options: {
      includePaths: [
        paths.vendor + '/bootstrap-sass/assets/stylesheets',
        paths.vendor + '/font-awesome/scss'
      ]
    },
    autoprefixer: {
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
      cascade: false
    }
  },

  sprites: {
    src: paths.images + '/sprites/*.png',
    dest: {
      css: path.join(paths.styles, 'config'),
      image: path.join(paths.build, dirs.images)
    },
    options: {
      cssName: '_sprites.scss',
      imgName: 'sprites.png',
      imgPath: path.join('../', dirs.images, '/sprites.png'),
      cssVarMap: function(sprite) {
        sprite.name = 'sprite-' + sprite.name;
      }
    }
  },

  fonts: {
    dest: path.join(paths.build, dirs.fonts),
    vendors: {
      'bootstrap': paths.vendor + '/bootstrap-sass/assets/fonts/bootstrap/*',
      'font-awesome': paths.vendor + '/font-awesome/fonts/*'
    }
  },

  // production build stuff

  uglify: {
    src: path.join(paths.build, dirs.scripts),
    dest: path.join(paths.build, dirs.scripts),
    options: {}
  },

  minify: {
    src: path.join(paths.build, dirs.styles),
    dest: path.join(paths.build, dirs.styles),
    options: {
      keepSpecialComments: 0 // remove all
    }
  },

  imagemin: {
    src: path.join(paths.build, dirs.images) + '/**',
    dest: path.join(paths.build, dirs.images),
    options: {
      progressive: true
    }
  }
};
