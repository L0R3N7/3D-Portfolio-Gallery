package org.threeDPortfolioGallery.repos;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import org.threeDPortfolioGallery.workloads.Exhibition;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class ExhibitionRepo implements PanacheRepository<Exhibition> {

    public List<Exhibition> getAllExhibitionsForUser(long userid){
        return list("user.id", userid);
    }
}
