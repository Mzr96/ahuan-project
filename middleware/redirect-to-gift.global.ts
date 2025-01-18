// This middleware should be ommited in future
// There is no other page except gift-code implemented yet 

export default defineNuxtRouteMiddleware((from, to)=>{
    if(to.path !== "/redeem-gift-card" && from.path !== "/redeem-gift-card") 
        return navigateTo("/redeem-gift-card")
})