package org.threeDPortfolioGallery.resource;

import org.threeDPortfolioGallery.repos.ExhibitRepo;
import org.threeDPortfolioGallery.workloads.Exhibit;
import org.threeDPortfolioGallery.workloads.User;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("api/exhibits")
public class ExhibitResource {
    @Inject
    ExhibitRepo exhibitRepo;

    /**
     * Get one exhibit by id
     * @param id
     * @return
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{exhibit_id}")
    public Exhibit getExhibitById(@PathParam("exhibit_id") long id) {
        return exhibitRepo.findById(id);
    }

    // TODO get exhibits by exhibition repo
}
