Nest Js is a progressive Node.js Framework that builds efficient, reliable and scalable server-side applications.
It leverages TypeScript, a superset of JS to enhance code quality and maintainability.
It also adopts modular architecture and adheres to SOLID principles and it also provides a robust foundation for developing complex apps

Features

1. TS first
2. Modular Approach
3. Dependency Injection
4. Flexibility
5. Testing
6. Microservices Ready

-> Package.json file is the heart of any NodeJs project, it contains metadata about the project such as its name, author and dependencies,
-> tsconfig.json file is a configuration file that configures TS compiler, defining how TS code in compiled to Js. It includes settings for target Js version, Module system and other compiler options.
-> nest-cli.json file is specific to NestJs projects and contains configuration options for the Nest CLI, such as default application path and generator options.

-> *NestFactory*: used to create an application instance, and specifying the entry module.

-> *@Module* is a decorator that marks a class as a Module.
Modules are used by Nest to organize the application structure into scopes.
Controllers and Providers are scoped by the module they are declared in.

--> When we start our NestJs app first of all it executes the main.ts file and there we bootsrapps our AppModule

-> Modules are fundamental building blocks of Nest Js fapplication that encapsulates related controllers, services, providers and other components. They promotes organization, reusablity and testability.

*Facts on Modules*

1. We use them to break down the application into smaller, self-contained units making it easier to manage and understand
2. Dependeny injection, Nest Js uses DI to provide modules with the necessary dependecies, promoting loose coupling and testability.
3. Providers: can be services, controllers or other classes that are managed by the module
4. Exports: Modules can export providers and oter components that can be used by other modules.

*Controller* in charge of receiving and handling incoming requests.
*Service* used to handle the business logic and create a proper response for the type of reqest that we have.

**Naming conventions**
1. controllers: users.controller.ts
2. services: user.service.ts
3. Test file: users.controller.spec.ts
4. Model: users.entity.ts

*AppModule* is the main module of a NestJs app and it is used to connect ot other modules of our NestJs application.
(It is the root module)