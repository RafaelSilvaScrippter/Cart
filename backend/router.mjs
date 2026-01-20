export class Router{
    routes = {
        GET:{},
        POST:{},
        DELETE:{}
    }

    get(route,handler){
        this.routes['GET'][route] = handler;
    }
    post(route,handler){
        this.routes['POST'][route] = handler;
    }
    delete(route,handler){
        this.routes['DELETE'][route] = handler;
    }
}
