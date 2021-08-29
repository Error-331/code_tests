println 'Closures examples';
println '=================';
println '';

def tempVar1 = 5;

def tempClosure1 = { tempVar1++; };
def tempClosure2 = { tempClVar1, tempClVar2 -> tempClVar1 + tempClVar2 };

println 'example 1: ';
println '';

print 'tempVar1: ';
println tempVar1;

print 'tempClosure1(): ';
println tempClosure1();

print 'empVar1: ';
println tempVar1;

println '';
println 'example 2: ';
println '';

print 'tempClosure2(5, 6): ';
println tempClosure2(5, 6);


