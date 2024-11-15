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

-> NestFactory: used to create an application instance, and specifying the entry module.

-> @Module is a decorator that marks a class as a Module.
Modules are used by Nest to organize the application structure into scopes.
Controllers and Providers are scoped by the module they are declared in. 


--> When we start our NestJs app first of all it executes the main.ts file and there we bootsrapps our AppModule