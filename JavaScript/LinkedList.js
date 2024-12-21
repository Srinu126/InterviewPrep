class Node {
    constructor(value){
        this.value=value;
        this.next=null;
    }
}

class LinkedList {
    constructor(){
        this.head=null;
        this.size=0;
    }
    getSize(){
        return this.size;
    }
    isEmpty(){
        return this.size===0;
    }
    prepend(value){
        const node = new Node(value);
        if(this.isEmpty()){
            this.head=node;
        } else {
            node.next=this.head;
            this.head = node;
        }
        this.size++;
    }
    print(){
        if(this.isEmpty()){
            console.log("List is empty");
            return;
        } else {
            let listValues='';
            let curr=this.head;
            while(curr){
                listValues+=`${curr.value}->`;
                curr=curr.next;
            }
            console.log(listValues);
        }
    }
    append(value){
        const node = new Node(value);
        if(this.isEmpty()){
            this.head=node;
        } else {
            let prev = this.head;
            while(prev.next){
                prev=prev.next;
            }
            prev.next=node;
        }
        this.size++;
    }
    insert(index, value){
        const node = new Node(value);
        if(index<0 || index>this.getSize()){
            return;
        }
        if(index===0){
            this.prepend(value);
        } else {
            let prev=this.head;
            for(let i=0;i<index-1;i++){
                prev=prev.next;
            }
            node.next=prev.next;
            prev.next=node;
            this.size++;
        }
    }
    removeFrom(index){
        if(index<0 || index>=this.getSize()){
            return null;
        }
        let removedNode;
        if(index===0){
            removedNode = this.head;
            this.head=this.head.next;
        } else {
            let prev=this.head;
            for(let i=0;i<index-1;i++){
                prev=prev.next;
            }
            removedNode = prev.next;
            prev.next=removedNode.next;
            
        }
        this.size--;
        return removedNode.value;
    }
    removeValue(value){
        let removedNode;
        if(this.isEmpty()){
            return "list is empty";
        }
        if(this.head.value===value){
            this.head=this.head.next;
            this.size--;
            return value;
        }
        else{
            let prev=this.head;
            while(prev.next && prev.next.value!==value){
                prev=prev.next;
            }
            if(prev.next){
                removedNode = prev.next;
                prev.next = removedNode.next;
                this.size--;
                return value;
            }
            return null;
        }
        
    }
    reverse(){
        let prev=null;
        let curr=this.head;
        while(curr){
            let next=curr.next;
            curr.next=prev;
            prev=curr;
            curr=next;
        }
        this.head=prev;
    }
    search(value){
        if(this.isEmpty()){
            return -1;
        }
        let curr=this.head;
        let index=0;
        while(curr){
            if(curr.value===value){
                return index;
            }
            curr=curr.next;
            ++index;
        }
        return -1;
        
    }
}


const list = new LinkedList();
list.prepend(20);
list.prepend(30);
list.prepend(40);
list.append(50);
list.append(60);
list.insert(0,10);
list.insert(5,70);
list.insert(7,80);
console.log(list.getSize());
list.print();
console.log(list.removeFrom(0));
console.log(list.getSize());
list.print();
console.log(list.removeFrom(4));
console.log(list.getSize());
list.print();
console.log(list.search(80));
list.reverse();
list.print();
list.removeValue(30);
list.print();

