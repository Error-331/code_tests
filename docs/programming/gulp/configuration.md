# Configuration

## Sections

### gulp.task

Task definition.

Example:

```javascript

gulp.task('template', ['minify'], function () {
// perform operations
});


```

Parameters:

- name - the name of the task, will be accessible via the CLI;
- dependencies - an optional array of tasks to be completed prior to your task (executed in parallel), Orchestrator ensures that dependent tasks are executed before this task;
- function - the function that performs the task’s operations;

### gulp.src

Will often be the first operation to perform within the task function as it collects the files from the file system on which your task will operate. 

Example:

```javascript

gulp.src('**/*.coffee', {cwd: 'scripts'});

```

Parameters:

- glob - the node-glob file pattern to read (simply refers to pattern matching based on wildcard characters);
- options - an optional parameter to further define file criteria;

### gulp.dest

Write files to the specified path and is commonly the last step in the task function.

Example:

```javascript

gulp.dest('dist');

```

Parameters:

- path - the output directory path.

### gulp.watch

Performs one or more tasks when specified files change (To avoid manually rerunning the build tasks after the developer makes changes). 

Example:

```javascript

gulp.watch('**/*.coffee', {cwd: 'scripts'}, ['coffee']);

```

Parameters:

- glob - the node-glob file pattern that indicates the files to monitor for changes; 
- options - an optional parameter to further define file criteria;
- tasks - an array of tasks to be executed when a file changes;
