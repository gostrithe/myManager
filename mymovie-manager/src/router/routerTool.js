export const inRoutes = (to, routes) => {
  // console.log("inRoutes", to, routes);
  for (let route of routes) {
    // if (
    //   to.path === route.path ||
    //   to.name === route.name ||
    //   // to.path.startsWith(route.path)
    //   (route.children && inRoutes(to, route.children))
    // ) {
    //   return true;
    // }

    if(to.path === route.path){
      // console.log("to.path === route.path",to.path,route.path);
      return route
    }

    if(to.name && to.name === route.name){
      // console.log("to.name === route.name");
      return route
    }

    if(route.children && inRoutes(to, route.children)){
      // console.log("route.children && inRoutes(to, route.children)");
      return route
    }
  }

  return false;
};
