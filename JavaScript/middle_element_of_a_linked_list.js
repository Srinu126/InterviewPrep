/**
Traversing linked list using a slow pointer and a fast pointer.
We can make use of the size property and return the middle element as well
**/
class Node {
    constructor(value){
        this.value = value;
        this.next = null;
    }
}
class LinkedList {
    constructor(){
        this.head = null;
        this.size = 0;
    }
    isEmpty(){
        return this.size===0;
    }
    getSize(){
        return this.size;
    }
    prepend(value){
        const node = new Node(value);
        if(this.isEmpty()){
            this.head = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
        this.size++;
    }
    append(value){
        const node = new Node(value);
        if(this.isEmpty()){
            this.head = node;
        } else {
            let curr = this.head;
            while(curr.next){
                curr=curr.next;
            }
            curr.next = node;
        }
        this.size++;
    }
    print(){
        if(this.isEmpty()){
            console.log('list is empty');
        } else {
            let curr = this.head;
            let listValues = '';
            while(curr){
                listValues+=`${curr.value}->`;
                curr=curr.next;
            }
            console.log(listValues)
        }
    }
    findMiddle(){
        let slow = this.head;
        let fast = this.head;
        while(fast!==null && fast.next!==null){
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow ? slow.value : null;
    }
}
const list = new LinkedList();
list.prepend(50);
list.prepend(40);
list.prepend(30);
list.prepend(20);
list.prepend(10);
list.print();
console.log(list.findMiddle());
