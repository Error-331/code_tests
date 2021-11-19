'use strict';

// external imports

// internal imports

// implementation
void dfs(int s) {
    if (visited[s]) return;
    visited[s] = true;
// обработать вершину s
    for (auto u: adj[s]) {
        dfs(u);
    }
}

// exports
