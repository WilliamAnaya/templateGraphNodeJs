import express, {Application} from "express";
import compression from "compression";
import {ApolloServer} from "apollo-server-express";
import {GraphQLSchema} from "graphql";

export default class GraphQlServer {
    private app!: Application;
    private readonly DEFAULT_PORT = 3000;
    private schema!: GraphQLSchema;

    constructor(
        schema: GraphQLSchema
    ) {
        if (!schema) {
            throw new Error("Se requiere un eschema para poder trabajar")
        }
        this.schema = schema;
        this.init();
    }

    private init() {
        this.configExpress();
        this.configApolloServer();
        this.routes();
    }

    private configExpress() {
        this.app = express();
        this.app.use(compression());
    }

    private async configApolloServer() {

        const apolloServer = new ApolloServer({
            schema: this.schema,
            introspection: true
        });

        await apolloServer.start();

        apolloServer.applyMiddleware({
            app: this.app,
            cors: true
        })

    }

    private routes() {
        this.app.get('/hello', (_, res) => {
            res.send('Instalado Express');
        });

        this.app.get('/', (_, res) => {
            res.redirect('/graphql')
        })
    }


    listen(callback: (port: number) => void): void {
        this.app.listen(this.DEFAULT_PORT, () => {
            callback(this.DEFAULT_PORT);
        });
    }
}
