# weather_and_prime.py

# Task 1: Aggregating Weather Data
def aggregate_weather_data(records):
    city_data = {}

    # Step 1: Collect data for each city
    for record in records:
        city = record.get("city")
        if city not in city_data:
            city_data[city] = {"temperature": [], "humidity": []}
        
        # Add temperature if present
        if "temperature" in record:
            city_data[city]["temperature"].append(record["temperature"])
        
        # Add humidity if present
        if "humidity" in record:
            city_data[city]["humidity"].append(record["humidity"])
    
    # Step 2: Calculate the average temperature and humidity
    result = {}
    for city, data in city_data.items():
        avg_temp = sum(data["temperature"]) / len(data["temperature"]) if data["temperature"] else None
        avg_humidity = sum(data["humidity"]) / len(data["humidity"]) if data["humidity"] else None
        result[city] = {"average_temperature": avg_temp, "average_humidity": avg_humidity}
    
    return result

# Task 2: Prime Factorization
def prime_factorization(n):
    i = 2
    factors = []
    
    # Step 1: Find prime factors
    while i * i <= n:
        count = 0
        while (n % i) == 0:
            n //= i
            count += 1
        if count > 0:
            factors.append((i, count))
        i += 1

    # Step 2: If there is a remaining prime factor
    if n > 1:
        factors.append((n, 1))
    
    return factors

# Example usage for Task 1
weather_records = [
    {"city": "CityA", "temperature": 20, "humidity": 30},
    {"city": "CityA", "temperature": 25},  # Missing humidity
    {"city": "CityB", "humidity": 50},  # Missing temperature
    {"city": "CityB", "temperature": 22, "humidity": 55}
]

print("Aggregated Weather Data:", aggregate_weather_data(weather_records))

# Example usage for Task 2
n = 60
print("Prime Factorization of 60:", prime_factorization(n))
