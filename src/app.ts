import { createServer, IncomingMessage, ServerResponse } from "http";
import { parse, UrlWithParsedQuery } from "url";
import { handleReq } from "./tasks/tasks.controller";


const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl: UrlWithParsedQuery = parse(req.url || '',true)

    const handleTasks = handleReq(req, res, parsedUrl);

    if (!handleTasks) {
        res.writeHead(404);
        res.end('Route not found!');
    }
})

server.listen(3000, () => console.log('Server running at http://localhost:3000'));