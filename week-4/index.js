const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

// program
//   .name('counter')
//   .description('CLI to do file based tasks')
//   .version('0.8.0');

// program.command('count')
//   .description('Count the number of lines in a file')
//   .argument('<file>', 'file to count')
//   .action((file) => {
//     fs.readFile(file, 'utf8', (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         const lines = data.split('\n').length;
//         console.log(`There are ${lines} lines in ${file}`);
//       }
//     });
//   });

// program.parse();

todosList = [];
todosList = fs.readFile('./../data/todo.json', (err, data) => {
    if(err) {
        console.log('internal error');
        return;
    } else {
        todosList = JSON.parse(data);
        program.parse();
    }
});

function addTodo(todo) {
    if(todo == null) {
        console.log('empty');
        return;
    }
  todosList.push({
    title: todo,
    isMarked: false
  });
  fs.writeFile('./../data/todo.json', JSON.stringify(todosList), () => {console.log('Added')});
}

function deleteTodo(idx) {
    if(idx == null) {
        console.log('empty');
        return;
    }
    let i = parseInt(idx);
    todosList.splice(i, 1);
    fs.writeFile('./../data/todo.json', JSON.stringify(todosList), () => {console.log('Deleted')});
}

function mark(idx) {
    if(idx == null) {
        console.log('empty');
        return;
    }
    let i = parseInt(idx);
    todosList[i].isMarked = true;
    fs.writeFile('./../data/todo.json', JSON.stringify(todosList), () => {console.log('Marked')});
}

program
  .name('Todo List')
  .description('CLI to manage to do')
  .version('0.8.0');

program
  .command('todo')
  .argument('<string>', 'action you want to do')
  .argument('<string>', 'todo you want')
  .action((option, todo) => {
      if(option == null)
        console.log('Provide action');
      else if(option == 'add')
          addTodo(todo);
      else if(option == 'delete')
          deleteTodo(todo);
      else if(option == 'mark')
          mark(todo);
  }
  )

