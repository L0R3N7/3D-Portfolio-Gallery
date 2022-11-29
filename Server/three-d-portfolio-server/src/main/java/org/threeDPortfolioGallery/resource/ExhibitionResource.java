package org.threeDPortfolioGallery.resource;

import org.threeDPortfolioGallery.repos.ExhibitionRepo;
import org.threeDPortfolioGallery.workloads.Exhibition;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("api/exhibitions")
public class ExhibitionResource {

    @Inject
    ExhibitionRepo exhibitionRepo;

    // get exhibitions of one user
    @GET
    @Path("/{userid}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Exhibition> getExhibitionsOfUser(@PathParam("userid") long id){

        return exhibitionRepo.getAllExhibitionsForUser(id);
    }
}
