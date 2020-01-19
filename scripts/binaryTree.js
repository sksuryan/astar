class binaryTree{
    constructor(){
        this.node = undefined;
        this.left = undefined;
        this.right = undefined;
    }

    addToTree(node){
        if(this.node === undefined) {
            this.node = node;
            this.left = new binaryTree();
            this.right = new binaryTree();
            return;
        }
        if(node.f < this.node.f){
            this.left.addToTree(node);
            return;
        }
        else
        if(node.f >= this.node.f){
            this.right.addToTree(node);
            return;
        }
    }

    // logNodes(){
    //     if(this.node === undefined)
    //         return;
    //     this.left.logNodes();
    //     console.log(this.node);
    //     this.right.logNodes();
    // }

    search(node){
        if(this.node === undefined)
            return false;
        if(this.node === node)
            return true;
        if(node.f < this.node.f)
            return this.left.search(node);
        else
        if(node.f >= this.node.f)
            return this.right.search(node);
    }

    smallest(){
        if(this.left.node === undefined)
            return(this);
        else
            return(this.left.smallest());
    }

    delete(node){
        if(this.node === undefined)
            return this;
        if(this.node === node){
            //for deletion of node with one or no childs
            if(this.left.node === undefined){
                this.node = undefined;
                return this.right;
            } 
            else
            if(this.right.node === undefined){
                this.node = undefined;
                return this.left;
            }
            //for deletion of node with 2 children
            else {
                var succNode = this.right.smallest();
                this.node = succNode.node;
                this.right = this.right.delete(succNode.node);
            }
        }
        if(node.f < this.node.f){
            this.left = this.left.delete(node);
        }
        else
        if(node.f >= this.node.f){
            this.right = this.right.delete(node);
        }
        return this;
    }

    show(){
        if(this.node === undefined)
            return;
        this.left.show();
        fill(color(0,255,0));
        rect(canvasLength/rows*this.node.x,canvasBreadth/columns*this.node.y,canvasLength/rows,canvasBreadth/columns);
        this.right.show();  
        return; 
    }

}
// class binaryTree{
//     binaryTree(){
//         this.node = undefined;
//         this.left = undefined;
//         this.right = undefined;
//         this.parent = undefined;
//     }

//     smallest(branch){
//         if(branch.left.node === undefined){
//             return(this.node);            
//         }
//         else
//             return branch.left.smallest();
//     }

//     nextElement(node){
//         if(node.left.node === undefined)
//             return(node);
//         else
//             return(node.left.nextElement());
//     }

//     traverse(){
//         if(this.node === undefined)
//             return;
//         this.left.traverse();
//         fill(color(0,255,0));
//         rect(canvasLength/rows*this.node.x,canvasBreadth/columns*this.node.y,canvasLength/rows,canvasBreadth/columns);
//         this.right.traverse();  
//         return; 
//     }

//     addToTree(node){
//         if(this.node === undefined){
//             this.node = node;
//             this.left = new binaryTree();
//             this.right = new binaryTree();
//             this.left.parent = this;
//             this.right.parent = this;
//             return;
//         }
//         if(this.node.f > node.f)
//             this.left.addToTree(node);
//         else
//             this.right.addToTree(node);
//     }

//     logTree(){
//         if(this.node === undefined)
//             return;
//         this.left.logTree();
//         this.right.logTree();  
//         return;          
//     }

//     search(node){
//         if(this.node === undefined)
//             return false;
//         if(this.node === node){
//             return true;
//         }

//         if(node.f < this.node.f){
//             return(this.left.search(node));            
//         }
//         if(node.f > this.node.f)
//             return(this.right.search(node));
//     }

//     // pop(){
//     //     if(this.left.node === undefined){
//     //         if(this.right.node === undefined){
//     //             this.node = undefined;
//     //             this.left = undefined;
//     //             this.right = undefined;
//     //         } 
//     //         else {
//     //             this.node = this.right.node;
//     //             this.left = this.right.left;
//     //             this.right = this.right.right;
//     //             this.parent = undefined;
//     //         }
//     //     } 
//     //     else
//     //         this.left.pop();
//     // }

//     delete(node){
//         if(this.node === undefined)
//             return this;
//         if(node.f < this.node.f){
//             this.left = this.left.delete(node);
//         }
//         else
//         if(node.f > this.node.f)
//             this.right = this.right.delete();
//         else{
//             //for deletion of node with one or no childs
//             if(this.left.node === undefined){
//                 this.node = undefined;
//                 return this.right;
//             } 
//             else
//             if(this.right.node === undefined){
//                 this.node = undefined;
//                 return this.left;
//             }
//             //for deletion of node with 2 children
//             else {
//                 var succNode = this.smallest(this.right);
//                 this.node = succNode.node;
//                 this.right = this.right.delete(succNode.node);
//             }
//         }
//         return this;
//     }
// }