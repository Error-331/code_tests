println 'Map examples';
println '============';
println '';

def exampleMap1 = [cars: 2, boats: 3, guns: 'none', weapons: 'none', 5: 25];
def exampleMap2 = [:];

exampleMap2.xd = 2;
exampleMap2.xt = 3;
exampleMap2.lm = 0;

exampleMap2["zd"] = 5;
exampleMap2["md"] = 5;

def exampleMap3 = [city: 'Odessa', plural: 'Odessian', car: 'Lexus', 1: 22, 2: 20, 3: 40, 4: 39];

def exampleMap4 = [
    [model: 'xd', presentation: 'cars_1', limit: 2000],
    [model: 'xt', presentation: 'cats_1', limit: 2500],
    [model: 'xs', presentation: 'cats_2', limit: 1000],
    [model: 'xd', presentation: 'sport_1', limit: 500]
];

def exampleMap5 = [3: 2000, 2: 1000, 4: 500, 1: 2000];

print 'exampleMap1.car: ';
println exampleMap1.cars;

print 'exampleMap1["boats"]: ';
println exampleMap1["boats"];

println '';

print 'exampleMap2.xt:';
println exampleMap2.xt;

print 'exampleMap2["md"]: '
println exampleMap2["md"];

println '';

print 'exampleMap1.getClass(): ';
println exampleMap1.getClass();  // java.util.LinkedHashMap

print 'exampleMap2: ';
println exampleMap2;

println '';

print 'exampleMap1.minus([boats: 3]): ';
println exampleMap1.minus([boats: 3]);

print 'exampleMap1.removeAll{it -> it.key instanceof String}: ';
exampleMap1.removeAll{it -> it.key instanceof Number};
println exampleMap1;

print 'exampleMap1.retainAll{it -> it.value instanceof String != true}:';
exampleMap1.retainAll{it -> it.value instanceof String != true};
println exampleMap1;

println '';

print 'exampleMap2.each{map -> println "$map.key: $map.value"}: ';
exampleMap2.each{map -> print "$map.key: $map.value "}

print 'exampleMap2.each{entity -> println "$entity.key: $entity.value"}: ';
exampleMap2.each{entity -> print "$entity.key: $entity.value "}
println '';

print 'exampleMap2.eachWithIndex{entity, index -> println "$index-$entity.key: $entity.value"}: ';
exampleMap2.eachWithIndex{entity, index -> print "$index-$entity.key: $entity.value; "};
println '';

print 'exampleMap2.eachWithIndex{key, value, i -> println "$i-$key: $value;"}: ';
exampleMap2.eachWithIndex{key, value, i -> print "$i-$key: $value; "};
println '';

println '';

print 'exampleMap3.find{it.value == "Odessa"}: ';
println exampleMap3.find{it.value == "Odessa"};

print 'exampleMap3.findAll{it.value instanceof Number && it.value < 25}: '; 
println exampleMap3.findAll{it.value instanceof Number && it.value < 25};

print 'exampleMap3.grep{it.value == "Odessa"}.each{entity ->  print "$entity.key: $entity.value; "}: ';
exampleMap3.grep{it.value == "Odessa"}.each{entity ->  print "$entity.key: $entity.value; "};
println '';

println '';

print 'exampleMap4.collect{entity -> entity.value.model}: ';
println exampleMap4.collect{it.model};

print 'exampleMap4.collectEntries{entity -> [entity.model, entity.presentation]}: ';
println exampleMap4.collectEntries{entity -> [entity.model, entity.presentation]};

print 'exampleMap4.findAll{it.limit <= 1000}.collect{it -> it.model}: ';
println exampleMap4.findAll{it.limit <= 1000}.collect{it -> it.model};

println '';

print 'exampleMap5.groupBy{it.value / 2}: ';
println exampleMap5.groupBy{it.value / 2};

print 'exampleMap5.subMap([1,2]): ';
println exampleMap5.subMap([1,2]);

println '';

print 'exampleMap5.sort(): ';
println exampleMap5.sort();

print 'exampleMap5.sort({k1, k2 -> k2 <=> k1} as Comparator): ';
println exampleMap5.sort({k1, k2 -> k2 <=> k1} as Comparator);

print 'exampleMap5.sort({k1, k2 -> exampleMap5[k1] <=> exampleMap5[k2]} as Comparator): ';
println exampleMap5.sort({k1, k2 -> exampleMap5[k1] <=> exampleMap5[k2]} as Comparator);




