let gulp = require('gulp');
let clean = require('gulp-clean');
let concat = require('gulp-concat');
let replace = require('gulp-just-replace');
let through = require('through2');
const os = require('os');

gulp.task('cleanTypes', function () {
  return gulp.src('./temp/decl/*',  {read: false})
    .pipe(clean({force: true}));
});

let declSrc = [
  // add all *.d.ts files to be included in index.d.ts
  './temp/decl/lib/utils.d.ts',
  './temp/decl/lib/plDmContentItems.d.ts',
  './temp/decl/lib/plDmDefaults.d.ts',
  './temp/decl/lib/plDmError.d.ts',
  './temp/decl/lib/plDmInterfaces.d.ts',
  './temp/decl/lib/plDmClasses.d.ts',
  './temp/decl/lib/actions/actionAssetMap.d.ts',
  './temp/decl/lib/actions/actionBase.d.ts',
  './temp/decl/lib/actions/actionContentItems.d.ts',
  './temp/decl/lib/actions/actionPlaylist.d.ts',
  './temp/decl/lib/actions/actionCustomFields.d.ts',
  './temp/decl/lib/reducers/base.d.ts',
  './temp/decl/lib/reducers/reducerAssetMap.d.ts',
  './temp/decl/lib/reducers/reducerContentItems.d.ts',
  './temp/decl/lib/reducers/reducerPlaylist.d.ts',
  './temp/decl/lib/reducers/reducerCustomFields.d.ts',
  './temp/decl/lib/selectors/base.d.ts',
  './temp/decl/lib/selectors/selectorPlaylistEntityDetail.d.ts',
  './temp/decl/lib/selectors/selectorAssetMap.d.ts',
  './temp/decl/lib/selectors/selectorContentItems.d.ts',
  './temp/decl/lib/selectors/selectorPlaylist.d.ts',
  './temp/decl/lib/selectors/selectorModifiedTime.d.ts',
  './temp/decl/lib/selectors/selectorCustomFields.d.ts',
];

function consolidateImports(isCp) {
  const getImportSet = (src, rxp) => {
    const array = [];
    while (true) {
      let result = rxp.exec(src);
      if (result) {
        array.push(result[1]);
      } else {
        break;
      }
    }
    const set = new Set();
    let splitRxp = /[, ]+/;
    array.forEach(str => {
      let values = str.split(splitRxp);
      values.forEach(val => {
        if (val) {
          set.add(val);
        }
      });
    });
    //console.log(set);
    return set;
  };
  return through.obj(function (file, enc, cb) {
    let src = file.contents.toString();

    let rxp = /import\s{\s*(.*)}.*@brightsign\/bscore.*(\r)?\n/g;
    let importStringsCore = getImportSet(src, rxp);

    rxp = /import\s{\s*(.*)}.*'redux'.*(\r)?\n/g;
    let importStringsRedux = getImportSet(src, rxp);

    rxp = /import\s{\s*(.*)}.*'redux-thunk.*(\r)?\n/g;
    let importStringsReduxThunk = getImportSet(src, rxp);

    let newSrc = '/* tslint:disable:quotemark max-line-length trailing-comma */' + os.EOL;
    if (importStringsCore.size) {
      newSrc = newSrc + 'import {' + [...importStringsCore].join(', ') + `} from '${isCp ? './bscore' : '@brightsign/bscore'}';` + os.EOL;
    }
    //console.log(newSrc);
    rxp = /import\s{\s*(.*)}.*(@brightsign\/bscore).*(\r)?\n/g;
    newSrc = newSrc + src.replace(rxp, '');
    file.contents = new Buffer(newSrc);
    this.push(file);
    cb();
  });
}

let replaceSpec = [
  {
    search: /export declare/g,
    replacement: 'export'
  },
  {
    search: /import\s((?!(redux|@brightsign\/bscore)).)*(\r)?\n/g,
    replacement: ''
  }
];

gulp.task('indexTypescript',function() {
  return gulp.src(declSrc)
    .pipe(replace(replaceSpec))
    .pipe(concat('index.d.ts'))
    .pipe(consolidateImports())
    .pipe(gulp.dest('.'));
});

gulp.task('indexTypescriptCp', function () {
  return gulp.src(declSrc)
    .pipe(replace(replaceSpec))
    .pipe(concat('./dist/cp/bs-playlist-dm.d.ts'))
    .pipe(consolidateImports(true))
    .pipe(gulp.dest('.'));
});
