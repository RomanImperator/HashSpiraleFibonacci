from math import sqrt
from decimal import Decimal

class Hash:
    __MAX_BYTES = 64
    __GOLDEN_RATIO = Decimal('0.61803398874989484820458683436564')

    @staticmethod
    def __pad(x: str):
        x_byte_len = len(x.encode("utf-8"))
        x_bytes = []

        if x_byte_len > Hash.__MAX_BYTES:
                print(f"ERRORE. Il massimo di byte inseribili è {Hash.__MAX_BYTES}")
                return None
        else:
            for i in x:
                x_bytes += i.encode("utf-8")

            if x_byte_len < 64:
                by_to_add = 64 - len(x_bytes)
                for i in range(by_to_add): x_bytes.append(x_byte_len)

        return x_bytes
    # i = 10465407871100252160

    @staticmethod
    def make_hash(x: str):
        __padded_str = Hash.__pad(x)
        if __padded_str is None:
            print("ERRORE. Input non può essere 0")
            return None
        
        hash_x = 0x1111111111111111 # initial state
        for i in __padded_str:
            i = int(0x10000000000000000 * ((i * Hash.__GOLDEN_RATIO % 1))) # è il cuore dell'hash, (fibonacci multipllicative hashing)
            hash_x = hash_x ^ i
        
        hash_x = int(0x10000000000000000 * ((hash_x * Hash.__GOLDEN_RATIO % 1))) # un ciclo finale for good measure

        return hash_x
