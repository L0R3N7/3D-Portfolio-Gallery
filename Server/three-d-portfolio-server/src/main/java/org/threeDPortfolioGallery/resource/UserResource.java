package org.threeDPortfolioGallery.resource;

import org.threeDPortfolioGallery.repos.UserRepo;
import org.threeDPortfolioGallery.workloads.User;
import org.threeDPortfolioGallery.workloads.dto.UserLoginDTO;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.net.URI;

@Path("/api/users")
public class UserResource {

    @Inject
    UserRepo userRepo;

    /**
     * GET a User by their id
     * @param id long
     * @return JSON Object of User
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{user_id}")
    public User getUser(@PathParam("user_id") long id) {
        return userRepo.findById(id);
    }
    /**
     *
     * @param new_user JSON object
     * @param uriInfo
     * @return
     */
    @POST
    @Transactional
    @Consumes("application/json")
    @Produces("application/json")
    public Response postCustomer(User new_user, @Context UriInfo uriInfo) {
        new_user.password = hashPassword(new_user.password);
        User new_new_user = User.create(new_user.user_name, new_user.email, new_user.iconUrl, new_user.password,  new_user.exhibitions);
        this.userRepo.persist(new_new_user);
        URI uri = uriInfo.getAbsolutePathBuilder().path(Long.toString(new_new_user.id)).build();
        return Response.created(uri).build();
    }

    private String hashPassword(String password){
        // TODO hash password
        return password.concat("hi");
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/login")
    public Response login(UserLoginDTO loginDTO) {
        loginDTO.setPassword(this.hashPassword(loginDTO.getPassword()));
        System.out.printf("login : \n%s\n%s", loginDTO.getEmailOrUsername(), loginDTO.getPassword());
        return ((this.userRepo.isUser(loginDTO))? Response.ok("{'token':'Test'}") : Response.status(401)).build();
    }
}
