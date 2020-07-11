println 'List examples';
println '=============';
println '';

def exampleList1 = [1, 2];
def exampleList2 = [2, 3, 4] as LinkedList;

LinkedList exampleList3 = [3, 4, 5, 7, 29, 31, 40];

def exampleList4 = [[1, 0], [3, 2], [5, 4]];
def exampleList5 = ['a', 'b',  *exampleList2, 'c'];

print 'exampleList1.getClass(): ';
println exampleList1.getClass(); // java.util.ArrayList
println '';

print '["Rod", "Carlos", "Chris"].findAll{it.size() < 4}.each{println it}: '
["Rod", "Carlos", "Chris"].findAll{it.size() < 4}.each{print it}
println '';

print 'exampleList1 << 3: ';
exampleList1 << 3;
println exampleList1;

println '';

print 'exampleList3[2..5]: ';
println exampleList3[2..5];

print 'exampleList3[2..<5]: ';
println exampleList3[2..<5];

print 'exampleList4[1][0]: ';
println exampleList4[1][0];

println '';

print 'exampleList1[1]: ';
println exampleList1[1];

print 'exampleList1?[3]: ';
println exampleList1?[3];

println '';

print 'exampleList5: ';
println exampleList5;