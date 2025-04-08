import todos from "../Kambaz/Database/todos.js";


    export default function WorkingWithArrays(app) {
      app.put("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }

        todos = todos.map((t) => {
          if (t.id === parseInt(id)) {
            return { ...t, ...req.body };
          }
          return t;
        });
        res.sendStatus(200);
      });
    
        

          app.get("/lab5/todos/create", (req, res) => {
            const newTodo = { id: new Date().getTime(), title: "New Task", completed: false };
            todos.push(newTodo);
            res.json(todos);
          });
          app.post("/lab5/todos", (req, res) => {
            const newTodo = { ...req.body,  id: new Date().getTime() };
            todos.push(newTodo);
            res.json(newTodo);
          });
        

              app.get("/lab5/todos/:id/delete", (req, res) => {
                const { id } = req.params;
                const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
                todos.splice(todoIndex, 1);
                res.json(todos);
              });
             app.get("/lab5/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.title = title;
    res.json(todos);
  });
  app.delete("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }

  
    todos.splice(todoIndex, 1);
    res.sendStatus(200);
  });

  app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = completed === "true";
      res.json(todos);
    } else {
      res.status(404).send("Todo not found");
    }
  });
  
  app.get("/lab5/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      todo.description = decodeURIComponent(description);
      res.json(todos);
    } else {
      res.status(404).send("Todo not found");
    }
  });

    
      };
      
