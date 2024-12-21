class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    isEmpty() {
        return this.length === 0;
    }

    getLength() {
        return this.length;
    }

    push(ele) {
        const node = new Node(ele);
        if (this.isEmpty()) {
            this.head = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
        this.length++;
    }

    pop() {
        if (this.isEmpty()) {
            return null;
        }
        const removedNode = this.head;
        this.head = this.head.next;
        this.length--;
        return removedNode.value;
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.head.value;
    }

    print() {
        if (this.isEmpty()) {
            console.log("Stack is empty");
            return;
        }
        let curr = this.head;
        let listValues = '';
        while (curr) {
            listValues += `${curr.value} -> `;
            curr = curr.next;
        }
        console.log(listValues);
    }
}

const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
stack.push(40);
console.log(stack.pop());  // 40
stack.print();             // 30 -> 20 -> 10
console.log(stack.getLength()); // 3
console.log(stack.peek());   // 30
