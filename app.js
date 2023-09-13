// Import the readline module for handling user input in the console
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin, // Read from standard input (keyboard)
  output: process.stdout // Write to standard output (console)
});

const groceryList = [];

function groceryItem(name,quantity,price) {
    this.name = name;
    this.quantity = parseInt(quantity);
    this.price = parseFloat(price);
    this.bought = false;
}
 //let testItem = new groceryItem("Apple",2,0.99);
 //groceryList.push(testItem);

function displayList() {
    console.log('Your current grocery list:');
    if(groceryList.length == 0) {
        console.log('List is currently empty');
    } else {
        for(let i =0;i<groceryList.length;i++) {
            /*console.log('${i + 1}. ${groceryList[i].name}, \
            Quantity: ${groceryList[i].quantity}, \
            Price: ${groceryList[i].price}, \
            Bought: ${groceryList[i].bought}');
            */
            let item = groceryList[i];
            console.log((i+1) + ': ' +  item.name + ', Quantity: ' + item.quantity + 
            ', Price: $' + item.price.toFixed(2) + ', Bought: ' + item.bought);
        }
    }
    console.log('\n');
}

function addItem() {
    rl.question('Enter the name of the item: ', (name) => {
      rl.question('Enter the quantity: ', (quantity) => {
        rl.question('Enter the price: ', (price) => {
          let newItem = new groceryItem(name,quantity,price)
          groceryList.push(newItem);
          console.log('Item added to the grocery list.\n');
          displayList();
          menu();
        });
      });
    });
  }

function removeItem() {
    displayList();
    rl.question('Enter the number of the item you want to remove: ', (input) => {
      const itemIndex = parseInt(input) - 1;
      if (itemIndex >= 0 && itemIndex < groceryList.length) {
        groceryList.splice(itemIndex, 1);
        console.log('Item removed\n');
      } else {
        console.log('Invalid item number\n');
      }
      displayList();
      menu();
    });
}

function setBought() {
    displayList();
    rl.question('Enter the number of the item you want to update: ', (input) => {
      const itemIndex = parseInt(input) - 1;
      if (itemIndex >= 0 && itemIndex < groceryList.length) {
        const item = groceryList[itemIndex];
        const newStatus = !item.bought;
        item.bought = newStatus;
      } else {
        console.log('Invalid item number\n');
      }
      displayList();
      menu();
    });
  }

function menu() {
    console.log('Please select one of the following options by entering the number:');
    console.log('1. Display grocery list');
    console.log('2. Add item to grocery list');
    console.log('3. Remove item from grocery list');
    console.log('4. Set whether an item has been bought or not');
    console.log('5. Exit');

    rl.question('\nEnter a number \n',(option)=> {

        switch (option) {
            case '1':
                displayList();
                menu();
                break;
            case '2':
                addItem();
                //menu();
                break;
            case '3':
                removeItem();
                //menu();
                break;
            case '4':
                setBought();
                //menu;
                break;
            case '5':
                console.log('Exiting');
                rl.close();
                break;
            default:
                console.log('Invalid option\n');
                menu();
                break;
        }

    });
}
menu();