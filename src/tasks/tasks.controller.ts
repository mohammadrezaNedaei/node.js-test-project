import { Request, Response, Application } from "express";
import { addTask, deleteById, getAll, getById, Tasks } from "./tasks.service";

export async function handleReq(
    app: Application
) {

    app.get('/tasks', async (req: Request, res: Response) => {

        const response = await getAll(req.query.skip ? parseInt(req.query.skip as string) : undefined, req.query.take ? parseInt(req.query.take as string) : undefined);
        
        res.status(200).json({tasks: response.tasks, totalCount: response.totalCount} as Tasks)
    });

    app.get('/task', async (req: Request, res: Response) => {
        
        const id = req.query.id?.toString();
        var task;
        if(!id)
            res.status(400).json({message: 'bad request'});
        else
            task = await getById(id);

        if (!task)
            res.status(404).json({message: 'not found'});

        res.status(200).json({task});
    })

    app.delete('/deleteTask', async (req: Request, res: Response) => {

        const id = req.query.id?.toString();
        var task;
        if(!id)
            res.status(400).json({message: 'bad request'});
        else
            task = await deleteById(id);

        if (!task)
            res.status(404).json({message: 'not found'});

        res.status(200).json({task});
    });

    app.post('/task', async (req: Request, res: Response) => {
        try {
            const { title } = req.body;
            var task;

            if (!title)
                res.status(400).json({message: 'bad request'});
            else
                task = await addTask(title);
          
              if (!task) 
                res.status(404).json({message: 'not found'});
          
              res.status(200).json({task});
        } catch (error) {
            res.status(500).json({message: 'internal server error'});
            console.log('internal error!')
            console.log('error:\n', error);
        }
    })
}