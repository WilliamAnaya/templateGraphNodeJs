import GraphQlServer from "./server";
import schema from "./schema";

const graphQlServer = new GraphQlServer(schema);

graphQlServer.listen((port: number) => {
    console.log('Server corriendo en el puerto ', port)
})
