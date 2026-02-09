import random

def random_number():
    number_to_guess = random.randint(1, 100)
    print(f"The number is {number_to_guess}")

if __name__ == "__main__":
    random_number()
