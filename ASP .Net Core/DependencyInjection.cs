/**
 * Dependency Injection:Dependency Injection is a programming technique that makes a class independent of its dependencies.Used to achieve inversion of control between classes and their dependencies. Instead of classes creating their own dependencies, they are provided from the outside.
 * Constructor Dependency Injection: Dependencies are provided through a class constructor, ensuring that the class receives all it's dependencies at the time of instantiation
 * Setter Dependency Injection: Dependencies are assigned to public setter methods, allowing for the injection of dependencies after the object is created.
 * A property is a member that provides a flexible mechanism to read, write or compute the value of a data field.
 * Interface Dependency Injection: Dependencies are provided through an interface, requiring the class to implement an interface that exposes a method for injecting the dependency.
 */
 
 using System;
 
 public interface IToolUser {
     void SetHammer(Hammer hammer);
     void SetSaw(Saw saw);
 }
 
 public class Hammer {
     public void Use(){
         Console.WriteLine("Hammering nails");
     }
 }
 
 public class Saw {
     public void Use(){
         Console.WriteLine("Sawing wood");
     }
 }
 
 public class Builder: IToolUser {
     
     //Interface DI
     private Hammer _hammer;
     private Saw _saw;
     public void BuildHouse(){
         _hammer.Use();
         _saw.Use();
         Console.WriteLine("House Built");
     }
     public void SetHammer(Hammer hammer){
         _hammer = hammer;
     }
     public void SetSaw(Saw saw){
         _saw = saw;
     }
     //Setter DI
    //  public Hammer Hammer {get; set;}
    //  public Saw Saw {get; set;}
    //  public void BuildHouse(){
    //      Hammer.Use();
    //      Saw.Use();
    //      Console.WriteLine("Built");
    //  }
    //Constructor DI
    //  private Hammer _hammer;
    //  private Saw _saw;
    //  public Builder(Hammer hammer, Saw saw){
    //      _hammer = hammer;
    //      _saw = saw;
    //  }
    //  public void BuildHouse(){
    //      _hammer.Use();
    //      _saw.Use();
    //      Console.WriteLine("Built");
    //  }
    //
 }

class HelloWorld
{
    static void Main()
    {
        Hammer hammer = new Hammer();
        Saw saw = new Saw();
        //Constructor DI
        //Builder builder = new Builder(hammer, saw);
        //Setter DI
        // Builder builder = new Builder();
        // builder.Hammer = hammer;
        // builder.Saw = saw;
        //Interface DI
        Builder builder = new Builder();
        builder.SetHammer(hammer);
        builder.SetSaw(saw);
        builder.BuildHouse();
    }
}
