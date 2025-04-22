import { IncomingMessage, ServerResponse } from "http";
import { UrlWithParsedQuery } from "url";
import { addTask, deleteById, getAll, getById, Tasks } from "./tasks.service";

function getBody(req: IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {

        let body = '';
    
        req.on('data', chunk => body += chunk);

        req.on('end', () => {
            try {
                const parsed = JSON.parse(body);
                console.log(parsed);
                resolve(parsed);
            } catch (error){
                reject(error)
            }
        })

        req.on('error', (error) => reject(error))
    })
}

export async function handleReq(
    req: IncomingMessage,
    res: ServerResponse,
    parsedUrl: UrlWithParsedQuery
): Promise<Boolean> {
    const method = req.method;
    const pathName = parsedUrl.pathname;
    const query = parsedUrl.query;

    console.log(method, pathName, query); // testing

    if(method === 'GET' && pathName === '/tasks'){

        const response = await getAll(query['skip'] ? parseInt(query['skip'] as string) : undefined, query['take'] ? parseInt(query['take'] as string) : undefined);

        if(!response){
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: 'bad request'}));

            return true;
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({tasks: response.tasks, totalCount: response.totalCount} as Tasks));
    
        return true;
    }

    else if(method === 'GET' && pathName === '/task'){

        const id = query['id']?.toString();

        if(!id){
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: 'bad request'}));
            return true;
        }

        const task = await getById(id);

        if (!task) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({message: 'not found!'}));
        return true;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({task}));
        return true;
    }

    else if(method === 'DELETE' && pathName === '/deleteTask'){

        const id = query['id']?.toString();

        if(!id){
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: 'bad request'}));
            return true;
        }

        const task = await deleteById(id);

        if (!task) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: 'not found!'}));
        return true;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({task}));
        return true;
    }

    else if(method === 'POST' && pathName === '/task'){
        try {
            const { title } = await getBody(req);

            if (!title) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'bad request' }));
                return true;
              }
          
              const task = await addTask(title);
          
              if (!task) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'not found!' }));
                return true;
              }
          
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ task }));
              return true;
        } catch (error) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ message: "error happened" }));
              return true;
        }
    }
    return false
}