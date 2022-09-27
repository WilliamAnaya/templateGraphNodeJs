import { IResolvers } from "@graphql-tools/utils"

export const queryResolvers: IResolvers = {
    Query: {
        hello: (): string => 'Hola mundo',
        helloWithName: (_: void, args: { name: string }, context: any, info: object): string => {
            /return `Hello ${args.name}`;
        },
        peopleNumber: (): number => 1458
    }
}
