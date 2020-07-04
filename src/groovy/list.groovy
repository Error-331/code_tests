println 'List examples';
println '=============';
println '';

def  exampleList1 = [1, 2];

print 'exampleList1.getClass(): ';
println exampleList1.getClass(); // java.util.ArrayList
println '';

print '["Rod", "Carlos", "Chris"].findAll{it.size() < 4}.each{println it}: '
["Rod", "Carlos", "Chris"].findAll{it.size() < 4}.each{print it}
println '';