from math import *


def strToInt(x):
    result = ""
    for i in x:
        result += str(ord(i))
    print(result)
    return int(result)


def toHash(x):
    x = strToInt(x)
    if x == 0:
        print("ERROR. Input cannot be 0")
        return
    
    length = 0xAAAAAAAAAAAA # Maximum value
    A = 2 / (1 + sqrt(5))
    hash_x = int(length * ((float(x) * A % 1)))

    while hash_x < 0x100000000000: # Minimum value !(values are always 12 hexadecimal digits)
        hash_x = int(length * ((float(hash_x) * A % 1)))

    return hash_x


if __name__ == "__main__":
    userInput = input("Inserire stringa: ")
    hashedStr = toHash(userInput);

    print(hex(hashedStr))
