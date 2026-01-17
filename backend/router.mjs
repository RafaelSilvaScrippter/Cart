export class Router{
    routes = {
        GET:{},
        POST:{}
    }

    get(route,handler){
        this.routes['GET'][route] = handler;
    }
    post(route,handler){
        this.routes['GET'][route] = handler;
    }
}
