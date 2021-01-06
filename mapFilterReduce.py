from functools import reduce

lista=[1,2,3,4,5]

def esPar(x):
    return x% 2== 0


listaPares=filter(lambda x :x % 2== 0,lista)
listaPares1=filter(esPar,lista)

sumatorio= reduce(lambda x,y: x+y, lista)
sumatorio1=reduce(lambda x,y: x+y*2, lista)

suma100 = reduce(lambda x,y: x+y, range(101))

print(list(listaPares))
print(list(listaPares1))

print(sumatorio)
print(sumatorio1)

print(suma100)