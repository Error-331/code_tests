на англ о стасе и жене
о моряках и их универе
о куммунизме и работе в нем

Refactor

Samina Khan Jim Sugg I am still trying to launch Bacon using `reafactor` branches and I was able to actually launch it 'partially' (still having some errors when visiting content tab - but no errors during intial startup). One thing bothers me. I were investigation the issue with ba-uw-dm and found that the function baUwDmIsValidUwDmState now accepts two parameters (state and store) - before recent changes this function was accepting only one parameter - `state`. I think it is not very good - since we are passing the whole app state to  and one of its parts  simultaneously to this function. If we really need to use the whole state we should refactor this function and utilize selectors. Please correct me if I am wrong.
