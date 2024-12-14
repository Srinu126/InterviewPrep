var deleteMiddle = function(head) {
    let fast=head;
    let slow=null;
    while(fast!==null && fast.next!==null){
        if(slow){
            slow=slow.next;
        } else {
            slow=head;
        }
        fast=fast.next.next;
    }
    if(!slow){
        head=head.next;
        return head;
    }

   let removedNode = slow.next;
    slow.next=removedNode.next;
    return head;
    
};
