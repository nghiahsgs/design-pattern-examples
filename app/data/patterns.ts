export const patterns = [
  {
    category: "SOLID Principles",
    patterns: [
      {
        name: "Single Responsibility Principle",
        description: "A class should have only one reason to change, meaning it should have only one job or responsibility.",
        example: {
          before: `class UserManager:
    def __init__(self):
        self.db = Database()
    
    def save_user(self, user):
        # Handles database operations
        self.db.save(user)
        
    def email_user(self, user, message):
        # Handles email operations
        smtp = SMTP()
        smtp.send(user.email, message)
        
    def generate_user_report(self, user):
        # Handles report generation
        report = Report()
        return report.generate(user)`,
          after: `class UserRepository:
    def __init__(self):
        self.db = Database()
    
    def save_user(self, user):
        self.db.save(user)

class EmailService:
    def __init__(self):
        self.smtp = SMTP()
    
    def send_email(self, user, message):
        self.smtp.send(user.email, message)

class ReportGenerator:
    def generate_user_report(self, user):
        report = Report()
        return report.generate(user)`,
          explanation: "The original UserManager class violated SRP by handling multiple responsibilities: database operations, email sending, and report generation. The refactored version splits these responsibilities into separate classes, making the code more maintainable and easier to modify."
        }
      },
      {
        name: "Open/Closed Principle",
        description: "Software entities should be open for extension but closed for modification.",
        example: {
          before: `class DiscountCalculator:
    def calculate_discount(self, product_type, price):
        if product_type == "electronics":
            return price * 0.9
        elif product_type == "clothing":
            return price * 0.8
        elif product_type == "books":
            return price * 0.7`,
          after: `from abc import ABC, abstractmethod

class DiscountStrategy(ABC):
    @abstractmethod
    def calculate_discount(self, price):
        pass

class ElectronicsDiscount(DiscountStrategy):
    def calculate_discount(self, price):
        return price * 0.9

class ClothingDiscount(DiscountStrategy):
    def calculate_discount(self, price):
        return price * 0.8

class BooksDiscount(DiscountStrategy):
    def calculate_discount(self, price):
        return price * 0.7

class DiscountCalculator:
    def calculate_discount(self, discount_strategy, price):
        return discount_strategy.calculate_discount(price)`,
          explanation: "The original code required modification every time a new product type was added. The refactored version uses the Strategy pattern to make it open for extension (new discount strategies) without modifying existing code."
        }
      },
      {
        name: "Liskov Substitution Principle",
        description: "Objects of a superclass should be replaceable with objects of its subclasses without breaking the application.",
        example: {
          before: `class Bird:
    def fly(self):
        pass

class Duck(Bird):
    def fly(self):
        return "Flying like a duck!"

class Penguin(Bird):
    def fly(self):
        raise NotImplementedError("Penguins can't fly!")`,
          after: `class Bird:
    pass

class FlyingBird(Bird):
    def fly(self):
        pass

class SwimmingBird(Bird):
    def swim(self):
        pass

class Duck(FlyingBird, SwimmingBird):
    def fly(self):
        return "Flying like a duck!"
    
    def swim(self):
        return "Swimming like a duck!"

class Penguin(SwimmingBird):
    def swim(self):
        return "Swimming like a penguin!"`,
          explanation: "The original design forced Penguin to implement a fly method it couldn't use. The refactored version creates proper abstractions where each bird type implements only the behaviors it can actually perform."
        }
      },
      {
        name: "Interface Segregation Principle",
        description: "Clients should not be forced to depend on interfaces they do not use.",
        example: {
          before: `class Worker:
    def work(self):
        pass
    
    def eat(self):
        pass
    
    def sleep(self):
        pass

class Robot(Worker):
    def work(self):
        return "Robot working"
    
    def eat(self):
        raise NotImplementedError("Robots don't eat")
    
    def sleep(self):
        raise NotImplementedError("Robots don't sleep")`,
          after: `class Workable:
    def work(self):
        pass

class Eatable:
    def eat(self):
        pass

class Sleepable:
    def sleep(self):
        pass

class Human(Workable, Eatable, Sleepable):
    def work(self):
        return "Human working"
    
    def eat(self):
        return "Human eating"
    
    def sleep(self):
        return "Human sleeping"

class Robot(Workable):
    def work(self):
        return "Robot working"`,
          explanation: "The original Worker interface forced Robot to implement methods it couldn't use. The refactored version splits the interface into smaller, more specific ones, allowing classes to implement only the methods they need."
        }
      },
      {
        name: "Dependency Inversion Principle",
        description: "High-level modules should not depend on low-level modules. Both should depend on abstractions.",
        example: {
          before: `class MySQLDatabase:
    def save(self, data):
        return f"Saving {data} to MySQL"

class UserService:
    def __init__(self):
        self.db = MySQLDatabase()
    
    def save_user(self, user):
        return self.db.save(user)`,
          after: `from abc import ABC, abstractmethod

class Database(ABC):
    @abstractmethod
    def save(self, data):
        pass

class MySQLDatabase(Database):
    def save(self, data):
        return f"Saving {data} to MySQL"

class PostgresDatabase(Database):
    def save(self, data):
        return f"Saving {data} to Postgres"

class UserService:
    def __init__(self, database: Database):
        self.db = database
    
    def save_user(self, user):
        return self.db.save(user)`,
          explanation: "The original UserService was tightly coupled to MySQLDatabase. The refactored version depends on an abstraction (Database interface), allowing different database implementations to be injected without changing the UserService code."
        }
      }
    ]
  }
];