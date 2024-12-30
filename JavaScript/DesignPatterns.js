/**
Design Patterns are typical solutions to commonly occurring problems in software design.
They are more like ideas, opinions, and abstractions that can be useful in certain situations to solve a particular kind of problem.
**/

/**
Singleton Design Pattern
Singleton is a design pattern that ensures that a class has only one immutable instance. 
Said simply, the singleton pattern consists of an object that can't be copied or modified. 
It's often useful when we want to have some immutable single point of truth for our application.
**/

class Singleton {
    static instance;
    constructor(value){
        if(Singleton.instance){
              return Singleton.instance
        }
        Singleton.instance = this;
        this.value = value;
    }

    getValue(){
        return this.value;
    }

}

const instance1 = new Singleton("srinu");
const instance2 = new Singleton("john doe");
console.log(instance1===instance2);
